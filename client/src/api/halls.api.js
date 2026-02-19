import { http } from "./http.js";

export const getHalls = () => http.get("/halls");
export const getHall = (id) => http.get(`/halls/${id}`);
export const addHall = (data) => http.post("/halls", data)
export const deleteHall = (id) => http.delete(`/halls/${id}`)
export const updateHall = (id, data) => http.put(`/halls/${id}`, data)