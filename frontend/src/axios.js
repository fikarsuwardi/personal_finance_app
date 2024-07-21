import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Ganti dengan URL backend Anda
});

export default instance;
