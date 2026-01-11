import {api} from "../lib/api.js";



export const authService = {
    signUp: async (userData) => {
        const response = await api.post("/auth/sign-up", userData);
        return response.data.data;
    },

    login: async (credentials) => {
        const response = await api.post('/auth/sign-in', credentials);
        return response.data.data;
    },

    logout: async () => {
        await api.post('/auth/sign-out');
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/user');
        return response.data.data.data;
    }
};