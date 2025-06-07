import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9000', // your backend
  withCredentials: true            // VERY IMPORTANT for session cookies
});

export default api;
