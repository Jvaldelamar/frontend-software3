import axios from 'axios';

// Configura la URL base de tu back-end en NestJS
const api = axios.create({
  baseURL: 'http://localhost:3000',  // Asegúrate de que la URL sea la correcta
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
