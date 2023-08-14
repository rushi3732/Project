// api.js
import axios from 'axios';

const API_URL = 'http://localhost:8081'; // Update with your API server URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
