import axios from 'axios';

const API = axios.create({ baseURL: process.env.NEXT_APP_API_BASE_URL || 'http://localhost:8081' });

export default API;