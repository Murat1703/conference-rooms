import cls from './Bookings.module.css'
import { useEffect, useState } from 'react';
import { getBookings, getBookingsWithHall, deleteBooking } from '../../../../api/booking.api.js';
import { getHalls } from '../../../../api/halls.api.js';
import { Spinner } from '../../../../components/Spinner/Spinner.jsx';
import { BookingModal } from './BookingModal.jsx';

export const Bookings = () =>{

    const [loading, setLoading] = useState(true);


    const [bookingsHall, setBookingsHall] = useState(null);

    const getBookingsHallName = async () =>{
        try{
            const res = await getBookingsWithHall();
            setBookingsHall(res.data);
        }
        catch(err){
            console.error("Ошибка загрузки броней", err);
        }
        finally {
            setLoading(false)
        }
    }

    console.log('BOOKINGWITHHALL: ',bookingsHall)

    
    useEffect(()=>{
        getBookingsHallName();
    }, [])


    const handleDeleteItem = async (id) => {
        try {
            await deleteBooking(id); // твой API вызов
            setBookingsHall(bookingsHall => bookingsHall.filter(item => item.id !== id)); 
        } catch (err) {
            console.error("Ошибка удаления", err);
        }
    };

    const [showModal, setShowModal] = useState(false);

    const handleModal = () =>{
        setShowModal(!showModal)
    }


    return(
        <>
        <div className={cls.bookingsInner}>
            <button 
                className={cls.bookingBtn} 
                onClick={handleModal}
            >
                <p>Добавить бронь</p>
            </button>
            <div className={cls.bookingTable}>
                <div className={cls.bookingTableTop}>
                    <p>Название зала</p>
                    <p>Контактное имя</p>
                    <p>Контактный номер</p>
                    <p>Кол-во</p>
                    <p>Рассадка</p>
                    <p>Дата брони</p>
                    <p>Статус брони</p>
                </div>
                <div className={cls.bookingTableBottom}>
                    {loading && <div className={cls.spinnerWrapper}><Spinner /></div>}
                    {bookingsHall?.map((booking, index)=>{

                        // loadHallName(booking.hall_id);
                        // console.log(booking.hall_id, 'ROOM : ', activeHall)
                        return (
                            <div className={cls.bookingItem} key={index}>
                                <p>{booking.hall_name}</p>
                                <p>{booking.name}</p>
                                <p>{booking.phone}</p>
                                <p>{booking.count}</p>
                                <p>{booking.seating_type}</p>
                                <p>{new Date(booking.start_date).toLocaleDateString('ru-RU')}</p>
                                <p>{booking.status}</p>
                                <div className={cls.itemButtons}>
                                    <button>Edit</button>
                                    <button onClick={()=>handleDeleteItem(booking.id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* <table>
                <thead>
                    <tr>Номер зала</tr>
                    <tr>Контактное имя</tr>
                    <tr>Контактный номер</tr>
                    <tr>Кол-во</tr>
                    <tr>Рассадка</tr>
                    <tr>Дата брони</tr>
                    <tr>Статус брони</tr>
                </thead>
                <tbody>
                {bookings?.map((booking, index)=>{
                        return (
                            <tr className={cls.bookingItem}>
                                <p>{booking.hall_id}</p>
                                <p>{booking.name}</p>
                                <p>{booking.phone}</p>
                                <p>{booking.count}</p>
                                <p>{booking.seating_type}</p>
                                <p>{booking.start_date}</p>
                                <p>{booking.status}</p>
                            </tr>
                        )
                })}

                </tbody>
            </table> */}

        </div>
        {showModal && <BookingModal  close={()=>setShowModal(false)}/>}
        </>
    )
}