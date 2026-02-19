import cls from './HomePage.module.css'
import img1 from './images/conference/1.avif'
import img2 from './images/conference/2.avif'
import img3 from './images/conference/3.avif'
import { useState, useEffect } from 'react'
import {motion} from "motion/react"
import { Button } from '../../components/Button'
import { Description } from '../../components/Description'
import { TextCard } from './content/TextCard'
import imgWifi from './images/advantages/wifi.png'
import imgCond from './images/advantages/conditioner.png'
import imgCamera from './images/advantages/camera.png'
import imgParking from './images/advantages/parking.png'
import imgCoffee from './images/advantages/coffee.png'
import imgNotes from './images/advantages/notes.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {Navigation} from 'swiper/modules'
import { ConsultationSection } from '../../components/ConsultationSection'
import { useMediaQuery } from 'react-responsive'
import { getHalls } from '../../api/halls.api.js'
import { HallCard } from '../../components/HallCard'
import { Modal } from '../../components/Modal/Modal.jsx'
import { AnimatePresence } from 'motion/react'
import { Spinner } from '../../components/Spinner/Spinner.jsx'

export const HomePage = ()=>{

    const [isActive, setIsActive] = useState(null);
    const [isShow, setIsShow] = useState(null);

    const handleSetActiveBigImg = (id) =>{
        setIsActive(id);
        // setIsShow(!isShow)
    }

    const Advantages = [
        {title: "Удобная локация",
        description: "В пешей доступности крупные торговые центры. Локация расположенная подальше от городской суеты и шума"},
        {title: "3 конференц зала ",
        description: "3 раздельных конференц зала с возможностью обьединения их в один большой зал"},
        {title: "60 — 180 м²",
        description: "Квадратура конференц залов с возможностью  объединения в один большой."},
    ]

    const isMobile = useMediaQuery({ maxWidth: 768 });

    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadHalls = async () =>{
        try{
            const res = await getHalls();
            setHalls(res.data);
        }
        catch(err){
            console.error("Ошибка загрузки событий", err);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        loadHalls();
    }, [])

    // console.log(halls)

    const [showModal, setShowModal] = useState(false);

    return(
        <>
        <section className={cls.homePageWrapper}>
            {/* <img src={ai} alt='img'/> */}
            <div className={cls.homePageContent} onClick={()=>{
                setIsActive(null);
                setIsShow(null)
            }}>
                <div className={cls.homePageTitleBlock}>
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: "linear" }}
                    >

                        <div className={cls.homePageTitleRow}>
                            <p>Пространство</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay:0.5, ease: "linear" }}
                    >
                    <div className={cls.homePageTitleRow}>
                        <p>оборудованное</p>
                        <div 
                            className={`${cls.homePageTitleImg} ${cls.homePageTitleImg1} ${(isShow && isActive === 1) ? `${cls.homePageBigImg} ${cls.homePageBigImg1}` : ""}`}
                            onClick={(e)=>{e.stopPropagation();handleSetActiveBigImg(1); setIsShow(!isShow)}}
                        >
                            <img src={img1} alt='homePageTitleImg'/>
                            <div className={cls.bottom}>

                            </div>
                        </div>
                    </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay:0.8, ease: "linear" }}
                    >
                        <div className={cls.homePageTitleRow}>
                            <p>для</p>
                            <div 
                                className={`${cls.homePageTitleImg} ${cls.homePageTitleImg2}${(isShow && isActive === 2) ? ` ${cls.homePageBigImg} ` : ""}`}
                                onClick={(e)=>{e.stopPropagation();handleSetActiveBigImg(2); setIsShow(!isShow)}}
                            >
                                <img src={img2} alt='homePageTitleImg'/>
                                <div className={cls.bottom}>

                                </div>
                            </div>
                            <p>проведения </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay:1.1, ease: "linear" }}
                    >
                        <div className={cls.homePageTitleRow}>
                            <p>бизнес</p>
                            <p>встреч</p>
                            <div 
                                className={`${cls.homePageTitleImg} ${cls.homePageTitleImg3}${(isShow && isActive === 3) ? ` ${cls.homePageBigImg} ` : ""}`}
                                onClick={(e)=>{e.stopPropagation();handleSetActiveBigImg(3); setIsShow(!isShow)}}
                            >
                                <img src={img3} alt='homePageTitleImg'/>
                                <div className={cls.bottom}>

                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
                <div className={cls.homePageBottom}>
                    <motion.p
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay:1.3, ease: "linear" }}
                    >
                        Аренда помещений конференц залов для проведений различных бизнес мероприятий и корпоративных тренингов. Сервис 5* и современное оборудование.
                    </motion.p>
                </div>
                <div className={cls.homePageButtons}>
                    <Button
                        phone="+77052941444"
                    >
                        <p>Позвонить</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" viewBox="0 0 11 15" fill="none">
                            <path d="M7.16667 0.5V1.43333C7.16667 1.8067 7.16667 1.99339 7.094 2.13599C7.03009 2.26144 6.9281 2.36342 6.80266 2.42734C6.66005 2.5 6.47337 2.5 6.1 2.5H4.23333C3.85997 2.5 3.67328 2.5 3.53067 2.42734C3.40523 2.36342 3.30324 2.26144 3.23933 2.13599C3.16667 1.99339 3.16667 1.8067 3.16667 1.43333V0.5M2.63333 13.8333H7.7C8.44674 13.8333 8.82011 13.8333 9.10532 13.688C9.3562 13.5602 9.56018 13.3562 9.68801 13.1053C9.83333 12.8201 9.83333 12.4467 9.83333 11.7V2.63333C9.83333 1.8866 9.83333 1.51323 9.68801 1.22801C9.56018 0.97713 9.3562 0.773156 9.10532 0.645325C8.82011 0.5 8.44674 0.5 7.7 0.5H2.63333C1.8866 0.5 1.51323 0.5 1.22801 0.645325C0.97713 0.773156 0.773156 0.97713 0.645325 1.22801C0.5 1.51323 0.5 1.8866 0.5 2.63333V11.7C0.5 12.4467 0.5 12.8201 0.645325 13.1053C0.773156 13.3562 0.97713 13.5602 1.22801 13.688C1.51323 13.8333 1.8866 13.8333 2.63333 13.8333Z" stroke="#EBE9E1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Button>
                    <Button action={()=>setShowModal(true)}>
                        <p>Приват-консультация</p>
                    </Button>
                </div>
            </div>
            {isMobile && 
                <motion.div 
                className={cls.mobileHomePageSlider}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay:1.3, ease: "linear" }}
                >
                    <Swiper 
                        slidesPerView={1.3}
                        spaceBetween={32}
                    >
                        {halls.map((hall, index)=>{
                            return(
                                <SwiperSlide>
                                    <a href={`/halls/${hall.id}`} className={cls.slideItem}>
                                        <div className={cls.mobileHomePageImgWrapper}>
                                            <img src={img1} alt='img'/>
                                        </div>
                                        <div className={cls.homePageMobileDescription}>
                                            <p>{hall.name}</p>
                                            <p>Вместимость: {hall.capacity} человек</p>
                                        </div>
                                    </a>
                                </SwiperSlide> 
                            )
                        })}
                    </Swiper>
                </motion.div>
            }
        </section>
        <section>
            <div className={cls.infoContent}>
                <div className={cls.infoContentText}>
                    <Description>
                        §1.Предисловие
                    </Description>
                    <p>Наши залы подходят как для небольших встреч, так и для масштабных мероприятий. Вы можете выбрать один зал или объединить несколько пространств под ваш формат.</p>
                </div>
            </div>
        </section>
        <section>
            <div className={cls.advantagesContent}>
                <div className={cls.advantagesTitle}>
                    <Description>
                        §2. Преимущества
                    </Description>
                    <h3>
                        Комфортные простраства 
                    </h3>
                </div>
                <div className={cls.advatagesListWrapper}>
                    <div className={cls.left}>
                        <TextCard 
                            textCardTitle={Advantages[0].title}
                            textCardDescription={Advantages[0].description}
                        />
                        <div className={cls.imagesRow}>
                            <div className={cls.imageRowItem}>
                                <div className={`${cls.imageRowItemImgWrapper} ${cls.imageRowItemInternet}`}>
                                    <img src={imgWifi} alt='img'/>
                                </div>
                                <p>Доступ к бесплатной гостевой Wi-Fi сети, (выделение отдельной линии по запросу)</p>
                            </div>
                            <div className={cls.imageRowItem}>
                                <div className={`${cls.imageRowItemImgWrapper} ${cls.imageRowItemConditioner}`}>
                                    <img src={imgCond} alt='img'/>
                                </div>
                                <p>Современные инженерные системы: вентиляция, охлаждение, отопление.</p>
                            </div>
                        </div>
                        <TextCard 
                            textCardTitle={Advantages[1].title}
                            textCardDescription={Advantages[1].description}
                        />
                        <div className={cls.imagesRow}>
                            <div className={cls.imageRowItem}>
                                <div className={`${cls.imageRowItemImgWrapper} ${cls.imageRowItemParking}`}>
                                    <img src={imgParking} alt='img'/>
                                </div>
                                <p>Парковочные места могут выделятся по запросу</p>
                            </div>
                            <div className={cls.imageRowItem}>
                                <div className={`${cls.imageRowItemImgWrapper} ${cls.imageRowItemCamera}`}>
                                    <img src={imgCamera} alt='img'/>
                                </div>
                                <p>Круглосуточная охрана видеонаблюдение и контроль доступа.</p>
                            </div>
                        </div>
                        <TextCard 
                            textCardTitle={Advantages[2].title}
                            textCardDescription={Advantages[2].description}
                        />
                        <div className={cls.imagesRow}>
                            <div className={cls.imageRowItem}>
                                <div className={`${cls.imageRowItemImgWrapper} ${cls.imageRowItemCoffee}`}>
                                    <img src={imgCoffee} alt='img'/>
                                </div>
                                <p>Выделенная зона для кофе брейков и расположенный внутри здания ресторан</p>
                            </div>
                            <div className={cls.imageRowItem}>
                                <div className={`${cls.imageRowItemImgWrapper} ${cls.imageRowItemCamera}`}>
                                    <img src={imgNotes} alt='img'/>
                                </div>
                                <p>Предоставление канцтоваров на время проведения мероприятий флипчарты, бумага ручки</p>
                            </div>
                        </div>

                    </div>
                    <div className={cls.right}>
                        <Swiper>
                            <SwiperSlide>
                                <img src={img1} alt='img'/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={img3} alt='img'/>
                            </SwiperSlide>

                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
        <ConsultationSection />
        <section>
            <div className={cls.conferenceHallsContent}>
                <div className={cls.conferenceHallsTitleBlock}>
                    <Description>
                        §3. Конференц залы
                    </Description>
                    <h3>
                        пространства <br/>для любого масштаба
                    </h3>
                </div>
                <div className={cls.conferenceHallList}>
                    {loading ? <Spinner /> : 
                    <>
                    <Swiper
                        slidesPerView={3.4}
                        spaceBetween={32}
                        loop={true}
                        modules={[Navigation]}
                        navigation={{
                            prevEl: ".prevBtn",
                            nextEl: ".nextBtn",
                        }}
                        onBeforeInit={(swiper) => {
                            // Иногда нужно явно назначить элементы до инициализации
                            swiper.params.navigation.prevEl = ".prevBtn";
                            swiper.params.navigation.nextEl = ".nextBtn";
                        }}
                        breakpoints={{
                            0:{
                                slidesPerView:1.2,
                                spaceBetween:24
                            },
                            768:{
                                slidesPerView:3.4,
                                spaceBetween:32
                            }
                        }}

                    >
                        {halls?.map((hall, index)=>{
                            return(
                                <SwiperSlide key={hall.id}>
                                    <HallCard  hall={hall}/>
                                </SwiperSlide>

                            )
                        })}
                    </Swiper> 
                    <button className={`${cls.conferenceHallControlBtn} prevBtn`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
                            <path d="M0.5 4.5L17.1667 4.5M17.1667 4.5L13.1667 0.499999M17.1667 4.5L13.1667 8.5" stroke="#EBE9E1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>    
                    <button className={`${cls.conferenceHallControlBtn} nextBtn`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
                            <path d="M0.5 4.5L17.1667 4.5M17.1667 4.5L13.1667 0.499999M17.1667 4.5L13.1667 8.5" stroke="#EBE9E1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>    
                    </>
                    }  
                </div>
            </div>
        </section>
        <section>
            <div className={cls.supportSectionContent}>
                <div className={cls.supportSectionTop}>
                    <div className={cls.supportSectionTitle}>
                        <Description>
                            §4. Службы поддержки
                        </Description>
                        <h3>задайте вопрос</h3>
                    </div>
                    <p>Отправьте  запрос удобным для вас способом – мы оперативно обработаем его и ответим на все ваши вопросы.</p>
                </div>
                <div className={cls.supportSectionBottom}>
                    <div className={cls.supportSectionItem}>
                        <p>Конференц залы</p>
                        <a href="">
                            <p>Узнать больше</p>
                        </a>
                    </div>
                    <div className={cls.supportSectionItem}>
                        <p>+7 727 320 5136</p>
                        <a onClick={()=>setShowModal(true)}>
                            <p>Перезвонить мне</p>
                        </a>
                    </div>
                    <div className={cls.supportSectionItem}>
                        <p>Есть жалобы или предложения?</p>
                        <a href="mailto:it@saduhotel.kz" target='_blank'>
                            <p>Написать на почту</p>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <AnimatePresence>
            {showModal && <Modal onClose={()=>setShowModal(false)}/>}
        </AnimatePresence>
        </>         
    )
}