import { http } from "./http.js";

export const getBookings = () => http.get("/booking");
export const getBookingsWithHall = ({ page = 1, limit = 10 } = {}) => http.get(`/booking/hall?page=${page}&limit=${limit}`);
export const getBookingByDate = (date) => http.get(`/booking/availibility?date=${date}`);
export const addBooking = (data) => http.post("/booking", data)
export const deleteBooking = (id) => http.delete(`/booking/${id}`)
// export const updateHall = (id, data) => http.put(`/halls/${id}`, data)