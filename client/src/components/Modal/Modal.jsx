import cls from './Modal.module.css'
import {motion} from "motion/react"
import { useMask } from '@react-input/mask'
import { useState, useEffect } from 'react'
import { Spinner } from '../Spinner'


export const Modal = ({onClose}) =>{

    const phoneMask = useMask({
        mask: '+7-___-___-__-__',
        replacement: { _: /\d/ },
    });

    const [data, setData] = useState({
        name: "",
        phone: ""
    });

    const [error, setError] = useState(
        {name: "", phone: ""}
    )


    const [mailErr, setMailErr] = useState(null);
    const [status, setStatus]= useState(null);
    const [loading, setLoading] = useState(false);

    const handleSendEmail = async (e)=>{
        e.preventDefault();
        if ((data.name.length ===0 )){
            setError({...error, name: "Не заполнено имя"})
            setMailErr(true);
            return;
        }
        if ((data.phone.length ===0)||(data.phone.length<16)){
            setError({...error, phone: "Проверьте введенные данные"})
            setMailErr(true);
            return;
        }
        setLoading(true);
        try {
        const r = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });
        const dataSend = await r.json();
        if (!r.ok || !dataSend.ok) throw new Error(dataSend.error || "Send failed");
        console.log(dataSend)
        setLoading(false);
        if (dataSend.ok == true) {setStatus("ok")}
        setData({ name: "", phone: "" });
        } catch (err) {
        setStatus(err.message);
        }
        finally{
            setError({name: "", phone: ""})
        }

    }


    return(
        <div className={cls.modalWrapper} onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}   // ← анимация закрытия
            transition={{ duration: 0.25 }}
        >
            <motion.div 
                className={cls.modalContent}
                initial={{ scale: 0 }}
                animate={{ scale: 1}}
                exit={{ scale: 0.9}} 
                transition={{ duration: 0.25, ease: "linear" }}
                onClick={(e)=>e.stopPropagation()}
            >
                <div className={cls.modalTitleBlock}>
                    <div >
                        <button onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M24 8L8 24M8 8L24 24" stroke="#1D1D1B" strokeLinecap="round" strokeLinejoin="round" ></path></svg>
                        </button>
                    </div>
                    <div>
                        <h3>{!status ? `Обратный звонок`: `Спасибо!`}</h3>
                        <p>{!status ? `Оставьте заявку — персональный менеджер свяжется с вами, расскажет об условиях и зал для проведения вашего ивента.`: `Персональный менеджер свяжется с вами, расскажет об условиях и зал для проведения вашего ивента в ближайшее время.`}</p>
                    </div>
                </div>
                {!status && 
                <form className={cls.inputsValues}>
                    <div>
                        <div className={error.name.length >0 ? cls.errorName: ``}>
                            <input 
                                type="text" 
                                name='name' 
                                placeholder='Ваше имя'
                                value={data.name}
                                onChange={(e)=>{setData(prev=>({...prev, name: e.target.value})); setError(prev => ({...prev, name: ""}))}}
                            />
                            {error.name && 
                            <span>{error.name}</span>}
                        </div>
                        <div>
                            <input 
                                type="text" 
                                name='phone' 
                                placeholder='+7'
                                ref={phoneMask}
                                value={data.phone}
                                onChange={(e)=>setData(prev=>({...prev, phone: e.target.value}))}
                            />
                            {error.phone && 
                            <span>{error.phone}</span>}

                        </div>
                    </div>
                    <div>
                        <button onClick={(e)=>handleSendEmail(e)}>
                            <p>Оставить заявку</p>
                        </button>
                        <p>Нажимая кнопку «Заказать звонок» вы соглашаетесь <br/>с Политикой обработки персональных данных</p>
                    </div>
                </form>}
                {loading && <div className={cls.spinnerWrapper}>
                    <Spinner />
                </div>}
            </motion.div>
        </div>
    )
}