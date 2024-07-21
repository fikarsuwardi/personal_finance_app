import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Pastikan ini sesuai dengan URL backend
});

export default instance;
