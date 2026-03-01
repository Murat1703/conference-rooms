import cls from './Bookings.module.css'
import { useEffect, useState } from 'react';
import { Spinner } from '../../../../components/Spinner/Spinner.jsx';
import { BookingModal } from './BookingModal.jsx';
import { useBookingsHallName } from '../../../../hooks/useBookingsHallName.js';

export const Bookings = () =>{


    const {bookingsHall, loading, deleteItem, page, setPage, limit, setLimit, total, totalPages} = useBookingsHallName();

    

    console.log('BOOKINGWITHHALL: ',bookingsHall)

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
                            <div className={cls.bookingItem} key={booking.id}>
                                <p>{booking.hall_name}</p>
                                <p>{booking.name}</p>
                                <p>{booking.phone}</p>
                                <p>{booking.count}</p>
                                <p>{booking.seating_type}</p>
                                <p>{new Date(booking.start_date).toLocaleDateString('ru-RU')}</p>
                                <p>{booking.status}</p>
                                <div className={cls.itemButtons}>
                                    <button>Edit</button>
                                    <button onClick={()=>deleteItem(booking.id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={cls.bookingTablePagination}>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
                .map((p) => (
                    <button
                        key={p}
                        className={p === page ? cls.activePage : ""}
                        disabled={loading}
                        onClick={() => setPage(p)}
                    >
                        {p}
                    </button>
                ))}
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