import cls from './BookingForm.module.css'
import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';

export const BookingForm = ({sendBooking, date, setDate, setBookingData, setErrForm, errForm, handleSetDuration, duration, bookingData, setShowArrangementTypes, showArrangementTypes, type, bookingLoading , hall, }) =>{
    return(
        <div cladivssName={cls.hallsPagePrice}>
                            {!sendBooking &&
                            <>
                            <div className={`${cls.hallsPageDate}  ${cls.hallsPageValuesItem}`}>
                                <DatePicker
                                    selected={date}
                                    onChange={(d) => {
                                        setDate(d); 
                                        const y = d.getFullYear();
                                        const m = String(d.getMonth() + 1).padStart(2, "0");
                                        const day = String(d.getDate()).padStart(2, "0");
                                        const formatted = `${y}-${m}-${day}`
                                        setBookingData((prev)=>({...prev, start_date: formatted}));
                                        if (!d ){
                                        setErrForm((prev)=>({...prev, start_date: "Ошибка даты"}))}
                                    }}
                                    minDate={new Date()}
                                    placeholderText="Выберите дату"
                                    dateFormat="dd.MM.yyyy"
                                    className="dateInput"
                                    popperPlacement="top-start"
                                    locale={ru}
                                />
                                <span>Дата</span>
                                {/* {console.log(errForm)} */}
                                {errForm.start_date !=="" && <span className={cls.errText}>{errForm.start_date}</span>}
                            </div>
                            <div className={cls.hallsPageValuesItem}>
                                <span>Ваше имя</span>
                                <input 
                                    type="text" 
                                    value={bookingData.name}
                                    onChange={(e)=>{setBookingData(prev=>({...prev, name: e.target.value}));
                                    if (e.target.value == "") setErrForm(prev=>({...prev, name: "Ошибка ввода имени"}));
                                    }}
                                />
                                {errForm.name !== "" && <span className={cls.errText}>{errForm.name}</span>}
                            </div>
                            <div className={cls.hallsPageValuesItem}>
                                <span>Контактный номер</span>
                                <input 
                                    type="text" 
                                    name='phone'
                                    ref={phoneMask}
                                    value={bookingData.phone}
                                    onChange={(e)=>{setBookingData(prev=>({...prev, phone: e.target.value}));
                                    
                                    }}
                                />
                                {errForm.phone !== "" && <span className={cls.errText}>{errForm.phone}</span>}
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
                                    onChange={(e)=>{setBookingData((prev)=>({...prev, count: e.target.value}));
                                    }}
                                />
                                {/* {errForm.count !=='' && <span className={cls.errText}>Введите количество гостей</span>} */}
                            </div>
                            <div className={cls.hallsPageValuesItem}>
                                <span>Тип рассадки</span>
                                <div className={cls.hallsSitType} onClick={()=>setShowArrangementTypes(!showArrangementTypes)}>
                                    <div className={cls.hallsSeatingArrangement}>
                                        <p>{!type ? `Выберите тип рассадки`: type}</p>
                                        {/* {!type && setErrForm(prev=>({...prev, seating_type: "Выберите тип рассадки"}))}
                                        {errForm.seating_type.length ==0 && <span className={cls.errText}>Выберите рассадку</span>} */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{
                                            rotate: showArrangementTypes && "180deg"
                                        }}>
                                        <path d="M6 9l6 6 6-6" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>

                                    </div>
                                    {showArrangementTypes &&
                                    <ul className={cls.arrangementTypesList}>
                                        <li onClick={()=>{setType('Театральная'); setBookingData((prev)=>({...prev, seating_type: "Театральная"}));
                                        setErrForm((prev)=>({...prev, seating_type: "Театральная"}))
                                        }}>Театральная</li>
                                        <li onClick={()=>{setType('С Партами');setBookingData((prev)=>({...prev, seating_type: "С Партами"}));
                                        setErrForm((prev)=>({...prev, seating_type: "С Партами"}))
                                        }}>С Партами</li>
                                        <li onClick={()=>{setType('Островками');setBookingData((prev)=>({...prev, seating_type: "Островками"}));
                                        setErrForm((prev)=>({...prev, seating_type: "Островками"}))}}>Островками</li>
                                        <li onClick={()=>{setType('П-образная'); setBookingData((prev)=>({...prev, seating_type: "П-образная"}));
                                        setErrForm((prev)=>({...prev, seating_type: "П-образная"}))
                                        }}>П-образная</li>
                                    </ul>}
                                </div>
                            </div>
                            <div className={cls.priceInfo}>
                                <p>Стоимость аренды</p>
                                <p>{hall.price} тг</p>
                            </div>
                            <Button action={()=>{
                                console.log(checkForm())
                                console.log(err)
                                if (err==true) {console.log('Заполните все поля');return} else if (isBooked.length > 0) window.alert('Бронь уже есть'); else createBooking(bookingData)
                            }}>
                                <p>Отправить заявку </p>
                            </Button>
                            </>
                            }
                            {sendBooking && <div>Cпасибо, бронь поставлена</div>}
                            {bookingLoading && `....Loading ...`}
        </div>
    )
}