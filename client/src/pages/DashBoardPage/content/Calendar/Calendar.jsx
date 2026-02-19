import { weeksToDays } from 'date-fns';
import cls from './Calendar.module.css'
import { MonthGrid } from './MonthGrid'
import { useState, useEffect } from 'react';
import { getBookings, getBookingsWithHall } from '../../../../api/booking.api.js';

export const Calendar = () =>{


    const dateNew = new Date();
    const activeMonth = dateNew.getMonth();

    const [changeMonth, setChangeMonth] = useState(activeMonth);

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

    // console.log(bookingsHall)

    
    useEffect(()=>{
        getBookingsHallName();
    }, [])

    return(
        <div>
            <MonthGrid 
                value={new Date(2026, changeMonth, 1)} // февраль 2026
                bookings={bookingsHall || []}
                setChangeMonth={setChangeMonth}
                changeMonth={changeMonth}
            />
        </div>
    )
}