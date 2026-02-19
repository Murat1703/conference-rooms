import cls from './DashBoardPage.module.css'
import logo from '../../components/Header/images/logo.png'
import { Rooms } from './content/Rooms'
import { useState, useEffect } from 'react'
import { Bookings } from './content/Bookings'
import { Calendar } from './content/Calendar'

export const DashBoardPage = ({user, logout})=>{


    const dashBoardNavList = [{
        id: 'dashboard',
        value: 'dashboard'
    },
    {
        id: 'rooms',
        value: 'залы'  
    },
    {
        id: 'calendar',
        value: 'календарь'  
    },
    {
        id: 'bookings',
        value: 'бронирования'  
    },
    {
        id: 'clients',
        value: 'клиенты'  
    },  
    {
        id: 'reports',
        value: 'отчеты'  
    },         
    ]

    const [activeItem, setAtiveItem]= useState('dashboard')

    return(
        <section className={cls.dashBoardWrapper}>
            <div className={cls.dashBoardContent}>
                <div className={cls.dashBoardNavigationBlock}>
                    <nav className={cls.dashBoardNavTop}>
                        <div className={cls.dashBoardLogo}>
                            <p>DashBoard</p>
                        </div>
                        <ul className={cls.dashBoardNavList}>
                            <li onClick={()=>setAtiveItem('dashboard')}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                                    <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="#1D1D1B" strokeWidth="1.25"/>
                                    <path d="M8 16V12" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M12 16V9" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M16 16V6.5" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <p>Dashboard</p>
                            </li>

                            <li onClick={()=>setAtiveItem('rooms')}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <rect x="5" y="5" width="20" height="9" rx="2.5" stroke="#1D1D1B" strokeWidth="1.25"/>
                                    <path d="M15 14V18" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M7 22H23" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M10 20V22" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M15 20V22" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M20 20V22" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <p>Залы</p>
                            </li>

                            <li onClick={()=>setAtiveItem('calendar')}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <rect x="4.5" y="6" width="21" height="19" rx="3" stroke="#1D1D1B" strokeWidth="1.25"/>
                                    <path d="M4.5 11H25.5" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M10 4.5V8" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M20 4.5V8" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <circle cx="10" cy="15" r="1.1" fill="#1D1D1B"/>
                                    <circle cx="15" cy="15" r="1.1" fill="#1D1D1B"/>
                                    <circle cx="20" cy="15" r="1.1" fill="#1D1D1B"/>
                                    <circle cx="10" cy="19" r="1.1" fill="#1D1D1B"/>
                                    <circle cx="15" cy="19" r="1.1" fill="#1D1D1B"/>
                                    </svg>
                                </div>
                                <p>Календарь</p>
                            </li>

                            <li onClick={()=>setAtiveItem('bookings')}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <rect x="4.5" y="6" width="21" height="19" rx="3" stroke="#1D1D1B" strokeWidth="1.25"/>
                                    <path d="M4.5 11H25.5" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M10 4.5V8" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M20 4.5V8" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M10.5 18L13.5 21L20.5 14" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <p>Бронирования</p>
                            </li>


                            <li onClick={()=>setAtiveItem('clients')}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <circle cx="15" cy="10" r="3.2" stroke="#1D1D1B" strokeWidth="1.25"/>
                                    <path d="M8 24            C8 20.9 11.1 18.8 15 18.8            C18.9 18.8 22 20.9 22 24" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="8.5" cy="12" r="2.2" stroke="#1D1D1B" strokeWidth="1.25"/>
                                    <circle cx="21.5" cy="12" r="2.2" stroke="#1D1D1B" strokeWidth="1.25"/>
                                    </svg>
                                </div>
                                <p>Клиенты</p>
                            </li>

                            <li onClick={()=>setAtiveItem('reports')}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <rect x="6" y="4.5" width="18" height="21" rx="3" stroke="#1D1D1B" strokeWidth="1.25"/>
                                    <path d="M11 21V15" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M15 21V12" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M19 21V9" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <p>Отчеты</p>
                            </li>


                        </ul>
                    </nav>
                    <ul className={cls.dashBoardNavList}>
                        <li onClick={logout}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <path d="M7.5 6            H14.5            C15.88 6 17 7.12 17 8.5V21.5            C17 22.88 15.88 24 14.5 24H7.5" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 15H24" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round"/>
                                    <path d="M20.5 11.5L24 15L20.5 18.5" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <p>Выйти</p>
                        </li>
                    </ul>
                </div>
                <div className={cls.dashBoardInner}>
                    <div className={cls.dashBoardTop}>
                        <p>Добро пожаловать,</p>
                        <p>{user?.user.login}</p>
                    </div>
                    <div className={cls.dashBoardBottom}>
                        {activeItem == 'rooms' && <Rooms />}
                        {activeItem ==='bookings' && <Bookings />}
                        {activeItem ==='calendar' && <Calendar />}
                    </div>
                </div>
            </div>
        </section>
    )
}