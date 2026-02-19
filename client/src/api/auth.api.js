import { http } from "./http.js";

export const apiLogin = (data) => http.post("/auth/login", data);
export const apiMe = () => http.get("/auth/me");
export const apiLogout = () => http.post("/auth/logout");
export const apiGetUsers = () => http.get('/auth/users')
