import { Menu } from '../Menu'
import cls from './Header.module.css'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import logo from './images/logo.png'
import logoVert from './images/logo_vert.png'

export const Header = ({isScroll, setIsMenuOpen}) =>{

    const [isMenu, setIsMenu] = useState(false);

    useEffect(()=>{
        setIsMenuOpen(isMenu);
    }, [isMenu])
    
    
    const handleShowMenu = () =>{
        setIsMenu(!isMenu);
        setIsMenuOpen(isMenu);
        // console.log('isMenu = ', isMenu)
    }

    const isMobile = useMediaQuery({ maxWidth: 768 });

    return(
        <>
            <header 
                className={`${cls.headerWrapper} ${ isScroll && cls.headerWrapperScrolled} ${isMenu && cls.headerOpenedMenu}`}
                style={{borderBottom: isScroll && "0.6px solid rgba(229, 227, 218, .7)",
                    transition: "none"
                }}
            >
                <div className={cls.headerContent}>
                    <div className={cls.left}>
                        <button className={cls.menuBtn} onClick={()=>handleShowMenu()}>
                            <div className={cls.menuBtnIcon}>
                                <span 
                                    style={{
                                        transform: isMenu && "rotate(45deg)",
                                        top: isMenu && "5px"
                                    }}
                                ></span>
                                <span
                                    style={{
                                        transform: isMenu && "rotate(-45deg)"
                                    }}
                                ></span>
                            </div>
                            {!isMobile && <p>Меню</p>}
                        </button>
                        {!isMobile && <a href="/halls">Конференц-залы</a>}
                        {isMobile && <a href="/" className={cls.mobileLogo}><img src={logo} alt='mobileLogos' /></a>}
                    </div>
                    {!isMobile && <a className={cls.logoWrapper} href='/'>
                        <img src={logo} alt='logo'/>
                    </a>}
                    <div className={cls.right}>
                        {!isMobile && <>
                        <a href="/contacts">Контакты</a>
                        <button className={cls.langBtn}>
                            <p>На русском</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M9.83333 7.16667L10.3332 7.17708C10.3334 7.17014 10.3334 7.16319 10.3332 7.15625L9.83333 7.16667ZM4.5 7.16667L4.00011 7.15625C3.99996 7.16319 3.99996 7.17014 4.00011 7.17708L4.5 7.16667ZM13.8333 7.16667H13.3333C13.3333 10.5724 10.5724 13.3333 7.16667 13.3333V13.8333V14.3333C11.1247 14.3333 14.3333 11.1247 14.3333 7.16667H13.8333ZM7.16667 13.8333V13.3333C3.76091 13.3333 1 10.5724 1 7.16667H0.5H0C0 11.1247 3.20863 14.3333 7.16667 14.3333V13.8333ZM0.5 7.16667H1C1 3.76091 3.76091 1 7.16667 1V0.5V0C3.20863 0 0 3.20863 0 7.16667H0.5ZM7.16667 0.5V1C10.5724 1 13.3333 3.76091 13.3333 7.16667H13.8333H14.3333C14.3333 3.20863 11.1247 0 7.16667 0V0.5ZM0.5 7.16667V7.66667H13.8333V7.16667V6.66667H0.5V7.16667ZM7.16667 0.5L6.79749 0.837212C8.38327 2.57329 9.28447 4.82628 9.33344 7.17708L9.83333 7.16667L10.3332 7.15625C10.2792 4.5631 9.2851 2.07785 7.53584 0.162788L7.16667 0.5ZM9.83333 7.16667L9.33344 7.15625C9.28447 9.50706 8.38327 11.76 6.79749 13.4961L7.16667 13.8333L7.53584 14.1705C9.2851 12.2555 10.2792 9.77023 10.3332 7.17708L9.83333 7.16667ZM7.16667 13.8333L7.53584 13.4961C5.95006 11.76 5.04887 9.50706 4.99989 7.15625L4.5 7.16667L4.00011 7.17708C4.05413 9.77023 5.04823 12.2555 6.79749 14.1705L7.16667 13.8333ZM4.5 7.16667L4.99989 7.17708C5.04887 4.82628 5.95006 2.57329 7.53584 0.837212L7.16667 0.5L6.79749 0.162788C5.04823 2.07785 4.05413 4.5631 4.00011 7.15625L4.5 7.16667Z" fill="#1D1D1B"/>
                            </svg>
                        </button></>}
                        {isMobile && <a className={cls.mobilePhoneLink}>
                            <p>+7 705 123 45 67</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" viewBox="0 0 11 15" fill="none">
                            <path d="M7.16667 0.5V1.43333C7.16667 1.8067 7.16667 1.99339 7.094 2.13599C7.03009 2.26144 6.9281 2.36342 6.80266 2.42734C6.66005 2.5 6.47337 2.5 6.1 2.5H4.23333C3.85997 2.5 3.67328 2.5 3.53067 2.42734C3.40523 2.36342 3.30324 2.26144 3.23933 2.13599C3.16667 1.99339 3.16667 1.8067 3.16667 1.43333V0.5M2.63333 13.8333H7.7C8.44674 13.8333 8.82011 13.8333 9.10532 13.688C9.3562 13.5602 9.56018 13.3562 9.68801 13.1053C9.83333 12.8201 9.83333 12.4467 9.83333 11.7V2.63333C9.83333 1.8866 9.83333 1.51323 9.68801 1.22801C9.56018 0.97713 9.3562 0.773156 9.10532 0.645325C8.82011 0.5 8.44674 0.5 7.7 0.5H2.63333C1.8866 0.5 1.51323 0.5 1.22801 0.645325C0.97713 0.773156 0.773156 0.97713 0.645325 1.22801C0.5 1.51323 0.5 1.8866 0.5 2.63333V11.7C0.5 12.4467 0.5 12.8201 0.645325 13.1053C0.773156 13.3562 0.97713 13.5602 1.22801 13.688C1.51323 13.8333 1.8866 13.8333 2.63333 13.8333Z" stroke="#1D1D1B" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>}
                    </div>
                </div>
            </header>
            {isMenu && 
                <Menu />
            }
        </>
    )
}