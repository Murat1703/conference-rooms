import { useEffect, useState, useCallback } from "react";
import { getBookingsWithHall, deleteBooking } from "../api/booking.api.js";


export const useBookingsHallName = () =>{

    const [loading, setLoading] = useState(true);
    const [bookingsHall, setBookingsHall] = useState(null);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const getBookingsHallName = useCallback( async () =>{
        setLoading(true); 
        try{
            const res = await getBookingsWithHall({ page, limit });
            const data = res.data;
            setBookingsHall(data.items);
            setTotal(data.total);
            setTotalPages(data.totalPages)
        }
        catch(err){
            console.error("Ошибка загрузки броней", err);
        }
        finally {
            setLoading(false)
        }
    }, [page, limit]);

    useEffect(()=>{
        getBookingsHallName();
    }, [getBookingsHallName])

    const deleteItem = useCallback(async (id) => {
        try {
            await deleteBooking(id); // твой API вызов
            setBookingsHall(bookingsHall => bookingsHall.filter(item => item.id !== id)); 
        } catch (err) {
            console.error("Ошибка удаления", err);
        }
    }, []);



    return(
        {bookingsHall, loading, deleteItem, page, setPage, limit, setLimit, total, totalPages}
    )
}