import * as bookingsRepository from "../repositories/booking.repository.js";

export const getBookings = () =>{
    return bookingsRepository.getBookings();
}

export const getBookingsWithHallName = () =>{
    return bookingsRepository.getBookingWithHallName();
}

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