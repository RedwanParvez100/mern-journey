import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return config;
});

export const register = (userData) => api.post("/auth/register", userData);
export const login = (credentials) => api.post("/auth/login", credentials);
export const getFeaturedNews = () => api.get("/news/featured");
export const getAllNews = () => api.get("/news");
export const getNewsById = (id) => api.get(`/news/${id}`);
export const createNews = (newsData) => api.post("/news", newsData);
export const updateNews = (id, newsData) => api.put(`/news/${id}`, newsData);
export const deleteNews = (id) => api.delete(`/news/${id}`);
export const getUserProfile = () => api.get("/users/me");
export const updateUserProfile = (userData) => api.put("/users/me", userData);
export const getUserNews = () => api.get("/users/me/news");
export const sendContactMessage = (messageData) =>
    api.post("/contact", messageData);
