import { http } from "./http.js";

export const deleteGalleryItem = (id) => http.delete(`/halls/gallery/${id}`)
export const getHalsGallery = (hallID) => http.get(`/halls/${hallID}/gallery`);
export const editGalleryItem = (hallID, id, data) => http.patch(`/news/${hallID}/gallery/${id}`, data);
export const addGallery = (hallID, data) => http.post(`/halls/${hallID}/gallery`, data)