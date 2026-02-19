import cls from './HallPage.module.css'
import { useState, useEffect } from 'react';
import { getHall } from '../../api/halls.api.js';
import { getHalsGallery } from '../../api/halls.gallery.api.js';
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";
import { Button } from '../../components/Button/Button.jsx';
import { ConsultationSection } from '../../components/ConsultationSection/ConsultationSection.jsx';
import { useMediaQuery } from 'react-responsive';
import './slider-styles.css'
import { BookingModal } from '../../components/BookingModal/BookingModal.jsx';
import img1 from '../HomePage/images/conference/1.avif'
import img2 from '../HomePage/images/conference/2.avif'
import img3 from '../HomePage/images/conference/3.avif'
import img4 from '../HomePage/images/conference/4.webp'
import img5 from '../HomePage/images/conference/5.webp'
import { useMask } from '@react-input/mask';
import { Modal } from '../../components/Modal';
import { addBooking, getBookings,  getBookingByDate } from '../../api/booking.api.js';



export const HallPage = () =>{

    const { id } = useParams();

    const [hall, setHall] = useState([]);
    const [loading, setLoading] = useState(true);

    const [galleryFromServer, setGalleryFromServer] = useState([]);

    const loadHall = async (id) =>{
        try{
            const res = await getHall(id);
            const imageURLS  = await getHalsGallery(id);
            setHall(res.data);
            console.log(res.data)
            setGalleryFromServer(imageURLS.data.items)
        }
        catch(err){
            console.error("Ошибка загрузки событий", err);
        }
        finally {
            setLoading(false)
        }
    }


    useEffect(()=>{
        loadHall(id);        
        const todayIs = new Date();
        const y = todayIs.getFullYear();
        const m = String(todayIs.getMonth() + 1).padStart(2, "0");
        const day = String(todayIs.getDate()).padStart(2, "0");
        const formatted = `${y}-${m}-${day}`;

        setToday(formatted);
        setBookingData((prev) => ({ ...prev, start_date: formatted }));

        getBookingsDate(formatted);

    }, [])

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [date, setDate] = useState(null);

    const [duration, setDuration] = useState(1);

    const handleSetDuration = (e) =>{
        setDuration(e)
    }

    const [showArrangementTypes, setShowArrangementTypes] = useState(false);

    const [type, setType] = useState(null)

    const isMobile = useMediaQuery({ maxWidth: 768 });

    const [showModal, setShowModal] = useState(null)

    const phoneMask = useMask({
        mask: '+7-___-___-__-__',
        replacement: { _: /\d/ },
    });

    const [bookingData, setBookingData]= useState({
        name: "", 
        phone: "", 
        start_date: "", 
        count: "",
        seating_type: "", 
        hall_id: id
    });

    const createBooking = async (data) =>{
        try{
            console.log('HALLDATA-',data)
            const fd = new FormData();
            fd.append("name", data.name);
            fd.append("phone", data.phone); // строка
            fd.append("start_date", String(data.start_date))
            fd.append("count", String(Number(data.count)));
            fd.append("seating_type", data.seating_type);
            fd.append("hall_id", data.hall_id);
            const res = await addBooking(fd); 
            const bookingID = res.data?.id; // <-- важно
            console.log('АЙДИ КОМНАТЫ. = ',bookingID);
            await getBookings();
        } catch (err){
            console.log(err)
        }
    }

    const [bookingsByDate, setBookingsByDate] =useState([]);

    const [loadingAvailibility, setLoadingAvailibility]= useState(true)

    const getBookingsDate = async (date) => {
        try{
            const res = await  getBookingByDate(date);
            setBookingsByDate(res.data);
            setLoadingAvailibility(false)
        }catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        if (!bookingData.start_date) return;
        getBookingsDate(bookingData.start_date);
    }, [bookingData.start_date]);
    console.log('bookingsByDate = ',bookingsByDate)


    const [isBooked, setIsBooked] = useState(false);

    // const checkavailability = () =>{
        
    //     const b = bookingsByDate?.filter(b => b.hall_name === hall?.name);
    //     console.log('b = = = =',b)
    //     b.length > 0? setIsBooked(true) : setIsBooked(false) 
    // }

    useEffect(()=>{
        if (!hall?.name) return;

        const booked = bookingsByDate.filter((b) => b.hall_name == hall?.name); 
        console.log(booked)
        // лучше по hall_id, а не по hall_name

        setIsBooked(booked);

    }, [bookingsByDate, hall?.name])

    const [today, setToday] = useState(null);



    return(
        <>
        <section>
            <div className={cls.hallsPageContent}>
                <div className={cls.hallsPageGallery}>
                    {galleryFromServer.length == 0 ?
                    <>
                        <Swiper
                            style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                            }}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Thumbs]}
                            className="mySwiper2"
                        >
                            <SwiperSlide>
                            <img src={img1} alt='galleryImg' />
                            </SwiperSlide>
                            <SwiperSlide>
                            <img src={img2} alt='galleryImg'  />
                            </SwiperSlide>
                            <SwiperSlide>
                            <img src={img3} alt='galleryImg'  />
                            </SwiperSlide>
                            <SwiperSlide>
                            <img src={img4} alt='galleryImg'  />
                            </SwiperSlide>
                            <SwiperSlide>
                            <img src={img5} alt='galleryImg'  />
                            </SwiperSlide>
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                            <img src={img1} alt='thumbImg' />
                            </SwiperSlide>
                            <SwiperSlide>
                            <img src={img2} alt='thumbImg'/>
                            </SwiperSlide>
                            <SwiperSlide>
                            <img src={img3} alt='thumbImg'/>
                            </SwiperSlide>
                            <SwiperSlide>
                            <img src={img4} alt='thumbImg' />
                            </SwiperSlide>
                            <SwiperSlide>
                            <img src={img5} alt='thumbImg' />
                            </SwiperSlide>
                        </Swiper>
                    </> :
                    <>
                    
                        <Swiper
                            style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                            }}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Thumbs]}
                            className="mySwiper2"
                        >
                            {galleryFromServer.map((img, index)=>{
                                return(
                                <SwiperSlide key={index}>
                                    <img src={img.image_url} alt='galleryImg' />
                                </SwiperSlide>
                                )
                            })}
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                        >

                            {galleryFromServer.map((img, index)=>{
                                return(
                                <SwiperSlide key={index}>
                                    <img src={img.image_url} alt='thumbImg' />
                                </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </>
                    
                    }

                </div>
                <div className={cls.hallsPageInfo}>
                    <div className={cls.hallsPageInfoTop}>
                        <div className={cls.hallsPageTopBlock}>
                            <div className={cls.hallsPageInfoTitleBlock}>
                                <p>Конференц-зал</p>
                                <h3>{hall?.name}</h3>
                            </div>
                            <div className={cls.availibilityBlock}>
                                <span>{bookingData?.start_date || today}</span>
                                <span className={loadingAvailibility?"" :isBooked.length > 0? cls.hallIsBooked: cls.hallIsfree}>
                                    {loadingAvailibility ? `Проверяем доступность` : isBooked.length > 0?`Занято`:`Свободно`}
                                </span>
                            </div>
                        </div>
                        <div className={cls.hallsPageInfoFlex}>
                            <div className={cls.hallsSpecifications}>
                                <div className={cls.hallsSpecificationItem}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">

                                        <rect x="4" y="4" width="16" height="16" rx="2" stroke="#1D1D1B" strokeWidth="1.8"/>

                                        <path d="M7 10V7H10" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

                                        <path d="M14 7H17V10" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

                                        <path d="M17 14V17H14" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

                                        <path d="M10 17H7V14" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

                                        </svg>
                                    </div>
                                    <div className={cls.hallsSpecificationText}>
                                        <p>Площадь</p>
                                        <p>{hall?.area_m2} м²</p>
                                    </div>
                                </div>
                                <div className={cls.hallsSpecificationItem}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="7" r="3" stroke="#1D1D1B" strokeWidth="1.8"/>

                                        <path d="M6 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

                                        </svg>
                                    </div>
                                    <div className={cls.hallsSpecificationText}>
                                        <p>Вместимость</p>
                                        <p>До {hall?.capacity} человек</p>
                                    </div>
                                </div>
                                <div className={cls.hallsSpecificationItem}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">

                                        <path d="M11 23c8.5-8.5 19.5-8.5 28 0" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

                                        <path d="M16 28c5.8-5.8 12.2-5.8 18 0" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

                                        <path d="M21 33c2.8-2.8 5.2-2.8 8 0" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

                                        <circle cx="25" cy="38" r="2.2" fill="#1D1D1B"/>

                                        </svg>                                
                                    </div>
                                    <div className={cls.hallsSpecificationText}>
                                        <p>Гоствевая сеть</p>
                                        <p>Да</p>
                                    </div>
                                </div>
                                <div className={cls.hallsSpecificationItem}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">

                                        <rect x="8" y="10" width="34" height="22" rx="2.5" stroke="#1D1D1B" strokeWidth="1.8"/>

                                        <path d="M22 32v5" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round"/>

                                        <path d="M28 32v5" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round"/>

                                        <path d="M18 37h14" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round"/>

                                        </svg>                               
                                    </div>
                                    <div className={cls.hallsSpecificationText}>
                                        <p>Наличие экрана</p>
                                        <p>Да</p>
                                    </div>
                                </div>
                                <div className={cls.hallsSpecificationItem}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">

                                        <rect x="13" y="10" width="24" height="18" rx="2.5" stroke="#1D1D1B" strokeWidth="1.8"/>
                                        <path d="M18 10v-3h14v3" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

                                        <path d="M18 28l-6 15" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M32 28l6 15" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

                                        <path d="M18 16h14" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round"/>
                                        <path d="M18 21h10" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round"/>

                                        </svg>                           
                                    </div>
                                    <div className={cls.hallsSpecificationText}>
                                        <p>Наличие флипчарта</p>
                                        <p>Да</p>
                                    </div>
                                </div>
                                <div className={cls.hallsSpecificationItem}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">

                                        <rect x="9" y="12" width="32" height="12" rx="2.5" stroke="#1D1D1B" strokeWidth="1.8"/>

                                        <path d="M13 20h24" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round"/>

                                        <path d="M16 28c2.5 1.5 5.5 1.5 8 0" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M26 28c2.5 1.5 5.5 1.5 8 0" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                        <circle cx="13" cy="16" r="1.2" fill="#1D1D1B"/>

                                        </svg>                                </div>
                                    <div className={cls.hallsSpecificationText}>
                                        <p>Наличие кондиционера</p>
                                        <p>Да</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={cls.hallsPageInfoBottom}>
                        <div className={cls.hallsPageInfoBottomLeft}>
                            <h3>Описание</h3>
                            <div>
                                <p>
                                    Наши конференц-залы — это современное пространство для деловых встреч, переговоров, тренингов и корпоративных мероприятий. Продуманный интерьер, комфортная мебель и профессиональное оборудование создают атмосферу, в которой удобно работать, обсуждать идеи и принимать решения. Залы подходят как для небольших встреч, так и для масштабных мероприятий. <br/><br/>  Каждый зал оснащён всем необходимым для эффективной работы: высокоскоростной Wi-Fi, телевизоры или экраны для презентаций, флипчарты и система кондиционирования. Техническое оснащение позволяет без лишних задержек проводить презентации, видеоконференции и обучающие сессии, обеспечивая стабильную связь и качественное изображение.<br/><br/> Гибкая планировка залов даёт возможность адаптировать пространство под формат вашего мероприятия. В зависимости от задачи залы могут использоваться по отдельности или объединяться, увеличивая общую площадь и вместимость. Это удобно как для камерных встреч, так и для крупных конференций или семинаров. <br/><br/> Мы предлагаем комфорт, функциональность и профессиональный сервис в одном пространстве. Наши конференц-залы помогут вам сосредоточиться на главном — результатах встречи и успехе вашего мероприятия, не отвлекаясь на организационные мелочи. <br/><br/>Дополнительно мы предоставляем помощь в организации мероприятий: по запросу можно заказать кофе-брейки, фуршетное обслуживание и техническое сопровождение. Наша команда поможет подготовить пространство, настроить оборудование и обеспечить комфортное проведение встречи, чтобы вы могли полностью сосредоточиться на содержании мероприятия и взаимодействии с участниками.<br/><br/>Удобное расположение и развитая инфраструктура позволяют гостям без труда добраться до площадки. Для участников доступны парковка, зоны отдыха и возможность размещения в отеле. Мы стремимся создать максимально комфортные условия как для организаторов, так и для гостей, чтобы каждое мероприятие проходило на высоком уровне и оставляло только положительные впечатления.
                                </p>     
                            </div>
                        </div>
                        {!isMobile && 
                        <div className={cls.hallsPagePrice}>
                            <div className={`${cls.hallsPageDate}  ${cls.hallsPageValuesItem}`}>
                                <DatePicker
                                    selected={date}
                                    onChange={(d) => {
                                        setDate(d); 
                                        const y = d.getFullYear();
                                        const m = String(d.getMonth() + 1).padStart(2, "0");
                                        const day = String(d.getDate()).padStart(2, "0");

                                        const formatted = `${y}-${m}-${day}`

                                        setBookingData((prev)=>({...prev, start_date: formatted}))
                                    }}
                                    minDate={new Date()}
                                    placeholderText="Выберите дату"
                                    dateFormat="dd.MM.yyyy"
                                    className="dateInput"
                                    popperPlacement="top-start"
                                    locale={ru}
                                />
                                <span>Дата</span>

                            </div>
                            <div className={cls.hallsPageValuesItem}>
                                <span>Ваше имя</span>
                                <input 
                                    type="text" 
                                    value={bookingData.name}
                                    onChange={(e)=>setBookingData(prev=>({...prev, name: e.target.value}))}
                                />
                            </div>
                            <div className={cls.hallsPageValuesItem}>
                                <span>Контактный номер</span>
                                <input 
                                    type="text" 
                                    name='phone'
                                    ref={phoneMask}
                                    value={bookingData.phone}
                                    onChange={(e)=>setBookingData(prev=>({...prev, phone: e.target.value}))}
                                />
                            </div>
                            <div className={`${cls.hallsPagePriceDuration} ${cls.hallsPageValuesItem}`}>
                                <span>Продолжительность</span>
                                <div className={cls.durationItem} onClick={()=>handleSetDuration(0.5)}>
                                    <div>
                                        {duration === 0.5 && <span></span>}
                                    </div>
                                    <p>Пол дня</p>
                                </div>
                                <div className={cls.durationItem} onClick={()=>handleSetDuration(1)}>
                                    <div>
                                        {duration === 1 && <span></span>}
                                    </div>
                                    <p>Целый день</p>
                                </div>
                            </div>
                            <div className={cls.hallsPageValuesItem}>
                                <span>Количество гостей</span>
                                <input 
                                    type="number" 
                                    value={bookingData.count}
                                    onChange={(e)=>setBookingData((prev)=>({...prev, count: e.target.value}))}
                                />
                            </div>
                            <div className={cls.hallsPageValuesItem}>
                                <span>Тип рассадки</span>
                                <div className={cls.hallsSitType} onClick={()=>setShowArrangementTypes(!showArrangementTypes)}>
                                    <div className={cls.hallsSeatingArrangement}>
                                        <p>{!type ? `Выберите тип рассадки`: type}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{
                                            rotate: showArrangementTypes && "180deg"
                                        }}>
                                        <path d="M6 9l6 6 6-6" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>

                                    </div>
                                    {showArrangementTypes &&
                                    <ul className={cls.arrangementTypesList}>
                                        <li onClick={()=>{setType('Театральная'); setBookingData((prev)=>({...prev, seating_type: "Театральная"}))}}>Театральная</li>
                                        <li onClick={()=>{setType('С Партами');setBookingData((prev)=>({...prev, seating_type: "С Партами"}))}}>С Партами</li>
                                        <li onClick={()=>{setType('Островками');setBookingData((prev)=>({...prev, seating_type: "Островками"}))}}>Островками</li>
                                        <li onClick={()=>{setType('П-образная'); setBookingData((prev)=>({...prev, seating_type: "П-образная"}))}}>П-образная</li>
                                    </ul>}
                                </div>
                            </div>
                            <div className={cls.priceInfo}>
                                <p>Стоимость аренды</p>
                                <p>{hall.price} тг</p>
                            </div>
                            <Button action={()=>createBooking(bookingData)}>
                                <p>Отправить заявку </p>
                            </Button>
                        </div>}

                    </div>
                </div>
            </div>
        </section>
        <ConsultationSection />
        {isMobile && 
        <div className={cls.spaceInfoBottom}>
            <button onClick={()=>setShowModal(true)}>
                <p>Забронировать</p>
            </button>
        </div>}
        {isMobile && showModal && <BookingModal 
            onClose={()=>setShowModal(false)}
            hall={hall}
            createBooking={createBooking}
            bookingData={bookingData}
            setBookingData={setBookingData}
        />}
        </>
    )
}