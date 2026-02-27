import { useState, useEffect } from "react";
import { getBookingByDate } from "../api/booking.api";

export const useBookingByDate = (date) => {
  const [bookingsByDate, setBookingsByDate] = useState([]);
  const [loadingAvailibility, setLoadingAvailibility] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!date) return;

    const getBookings = async () => {
      try {
        setLoadingAvailibility(true);
        setError(null);
        const res = await getBookingByDate(date);
        setBookingsByDate(res.data ?? []);
      } catch (err) {
        console.error("Ошибка загрузки броней:", err);
        setError(err);
        setBookingsByDate([]);
      } finally {
        setLoadingAvailibility(false);
      }
    };

    getBookings();
  }, [date]); 

  return {
    bookingsByDate,
    loadingAvailibility,
    error,
  };
};