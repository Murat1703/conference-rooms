import * as bookingsRepository from "../repositories/booking.repository.js";

export const getBookings = () =>{
    return bookingsRepository.getBookings();
}

export const getBookingsWithHallName = async ({ page, limit }) => {
  const safePage = Number(page) > 0 ? Number(page) : 1;
  const safeLimit = Number(limit) > 0 ? Number(limit) : 10;

  const offset = (safePage - 1) * safeLimit;

  const { items, total } = await bookingsRepository.getBookingWithHallName(
    safeLimit,
    offset
  );

  return {
    items,
    page: safePage,
    limit: safeLimit,
    total,
    totalPages: Math.ceil(total / safeLimit),
  };
};

export const getBookingsById = (id) =>{
    return bookingsRepository.getBookingById(id);
}

export const getBookingsByDate = (date) =>{
    return bookingsRepository.getBookingByDate(date);
}

export const createBookings = (data) =>{
    return bookingsRepository.addBooking(data)
}

export const deleteBookings = (id) =>{
    return bookingsRepository.deleteBooking(id)
}