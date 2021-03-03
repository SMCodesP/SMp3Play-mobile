import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sm-p3-play-api.vercel.app',
});

export default api;
