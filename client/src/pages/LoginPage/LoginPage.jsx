import cls from './LoginPage.module.css'
import img from '../HomePage/images/conference/4.webp'
import logo from '../../components/Header/images/logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { apiLogin } from '../../api/auth.api.js';

export const LoginPage = ({setUser})=>{

    const [show, setShow] = useState(false)
    const handleShow = () =>{
        setShow(!show)
    }

    const [error, setError] = useState();
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({
        login: "",
        password: ""
    })


    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{   
            const res = await apiLogin(form)
            setUser(res.data);
            // console.log(res)
            navigate("/dashboard");
        }catch(err){
            setError("Неверные данные");
        }
    }

    return(
        <section className={cls.loginPageWrapper}>
            <div className={cls.loginPageContent}>
                <div className={cls.loginPageWindow}>
                    <div className={cls.left}>
                        <img src={img} alt='img'/>
                    </div>
                    <div className={cls.right}>
                        <div className={cls.loginTitleBlock}>
                            <div className={cls.loginImgWrapper}>
                                <img src={logo} alt='img'/>
                            </div>
                            <div>
                                <h3>Вход</h3>
                                <p>Для входа введите свои учетные данные</p>
                            </div>
                        </div>
                        <form className={cls.loginPageValues}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="7.5" r="3.5" stroke="#1D1D1B" strokeWidth="1.25"/>
                                <path d="M5 19            C5 15.686 8.134 13.5 12 13.5            C15.866 13.5 19 15.686 19 19" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <input type="text" placeholder='Введите свой логин' value={form.login} onChange={(e)=>setForm({...form, login: e.target.value})}/>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7.5 10V7.5            C7.5 5.015 9.515 3 12 3            C14.485 3 16.5 5.015 16.5 7.5V10" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                <rect x="5.5" y="10" width="13" height="10" rx="3" stroke="#1D1D1B" strokeWidth="1.25"/>
                                <path d="M12 14.5V16.8" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                <circle cx="12" cy="13.5" r="0.9" fill="#1D1D1B"/>
                                </svg>
                                <input 
                                type={`${show ? `text`: `password`}`} placeholder='Введите свой пароль' 
                                value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})}
                                autoComplete='true'/>
                                <div className={cls.passShowIcon} onClick={handleShow}>
                                    {show ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M2.5 12            C4.5 7.5 8.1 5 12 5            C15.9 5 19.5 7.5 21.5 12            C19.5 16.5 15.9 19 12 19            C8.1 19 4.5 16.5 2.5 12Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.25"/>
                                    </svg>: 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M2.5 12            C4.5 7.5 8.1 5 12 5            C15.9 5 19.5 7.5 21.5 12            C19.5 16.5 15.9 19 12 19            C8.1 19 4.5 16.5 2.5 12Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.25"/>
                                        <path d="M4 20L20 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                                    </svg>
                                    }
                                </div>
                            </div>
                            <button onClick={handleLogin}>
                                <p>Войти</p>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}