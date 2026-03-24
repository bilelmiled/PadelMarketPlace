import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // L'adresse de ton backend
});

// Plus tard, on ajoutera ici les intercepteurs pour le token
export default api;