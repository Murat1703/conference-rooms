import { http } from "./http.js";

export const getBookings = () => http.get("/booking");
export const getBookingsWithHall = () => http.get("/booking/hall");
export const getBookingByDate = (date) => http.get(`/booking/availibility?date=${date}`);
export const addBooking = (data) => http.post("/booking", data)
export const deleteBooking = (id) => http.delete(`/booking/${id}`)
// export const updateHall = (id, data) => http.put(`/halls/${id}`, data)