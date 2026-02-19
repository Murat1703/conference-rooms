import cls from './ConsultationSection.module.css'
import { Button } from '../Button'
import { useMask } from '@react-input/mask'
import { useState, useEffect } from 'react'
import { Spinner } from '../Spinner'


export const ConsultationSection = () =>{

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
        <section className={cls.consultationSectionWrapper}>
            <div className={cls.consultationSectionInner}>
                <div className={cls.left}>
                    <div className={cls.consultationSectionTitleBlock}>
                        <h2>{!status ?`Получить` : `Спасибо!`}</h2>
                        {!status &&
                        <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" viewBox="0 0 28 27" fill="none">
                        <path d="M16.1587 1.4976L26.196 8.02189C26.5507 8.25243 26.728 8.36769 26.8565 8.52145C26.9703 8.65756 27.0557 8.81499 27.1078 8.98452C27.1667 9.17605 27.1667 9.38755 27.1667 9.81057V19.5862C27.1667 21.8264 27.1667 22.9465 26.7308 23.8021C26.3473 24.5548 25.7353 25.1667 24.9827 25.5502C24.127 25.9862 23.0069 25.9862 20.7667 25.9862H6.90006C4.65985 25.9862 3.53975 25.9862 2.6841 25.5502C1.93145 25.1667 1.31953 24.5548 0.936035 23.8021C0.500061 22.9465 0.500061 21.8264 0.500061 19.5862V9.81057C0.500061 9.38755 0.500061 9.17605 0.558955 8.98452C0.611088 8.81499 0.696523 8.65756 0.810258 8.52145C0.938742 8.36769 1.11608 8.25243 1.47075 8.02189L11.5081 1.49761M16.1587 1.4976C15.317 0.950527 14.8962 0.676988 14.4428 0.570558C14.042 0.476481 13.6248 0.476481 13.224 0.570558C12.7706 0.676988 12.3498 0.950528 11.5081 1.49761M16.1587 1.4976L24.4149 6.86416C25.332 7.46029 25.7906 7.75836 25.9494 8.13635C26.0882 8.46669 26.0882 8.83899 25.9494 9.16932C25.7906 9.54731 25.332 9.84538 24.4149 10.4415L16.1587 15.8081C15.317 16.3551 14.8962 16.6287 14.4428 16.7351C14.042 16.8292 13.6248 16.8292 13.224 16.7351C12.7706 16.6287 12.3498 16.3551 11.5081 15.8081L3.25188 10.4415C2.33475 9.84538 1.87618 9.54731 1.71736 9.16932C1.57856 8.83899 1.57856 8.46669 1.71736 8.13635C1.87618 7.75836 2.33475 7.46029 3.25188 6.86416L11.5081 1.49761M26.5001 23.3195L17.643 15.3195M10.0238 15.3195L1.16673 23.3195" stroke="#1D1D1B" strokeMiterlimit="10" strokeLinecap="round"/>
                        </svg>
                        <h2>консультацию</h2>
                        </>}
                    </div>
                    {!status ? 
                    <p>Хотите провести свое мероприятие у нас? <br/>
                    Оставьте заявку — персональный менеджер свяжется с вами, расскажет об условиях и подберёт конференц зал,в соответствии с вашими запросами.</p>
                    : <p>Наш менеджер свяжется с вами в ближайшее время и расскажет об условиях и подберёт конференц зал,в соответствии с вашими запросами.</p>}
                </div>
                {!status && 
                <form className={cls.right}>
                    <div className={cls.inputValues}>
                        <div>
                            <input 
                                type="text" 
                                name='name' 
                                placeholder='Как к вам обратиться?'
                                value={data.name}
                                onChange={(e)=>{setData({...data, name: e.target.value}); setError(prev => ({...prev, name: ""})) }}
                            />
                            {
                                error.name && <span>{error.name}</span>
                            }
                        </div>
                        <div>
                            <input 
                                type="text" 
                                name='phone' 
                                placeholder='Номер телефона'
                                ref={phoneMask}
                                value={data.phone}
                                onChange={(e)=>setData({...data, phone: e.target.value})}
                            />
                            {
                                error.phone && <span>{error.phone}</span>
                            }
                        </div>
                    </div>
                    <div className={cls.formBottomText}>
                        <p>Нажимая кнопку «Оставить заявку», вы соглашаетесь с Политикой обработки персональных данных</p>
                        <Button action={(e)=>handleSendEmail(e)}>
                            <p>Заказать обратный звонок</p>
                        </Button>
                    </div>
                </form>}
            </div>
            {loading && <div className={cls.loadingWrapper}><Spinner /></div>}
        </section>
    )
}