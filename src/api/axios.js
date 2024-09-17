// src/api/axios.js
import axios from 'axios';
import config from '../config.json'

const instance = axios.create({
  baseURL: config.baseURL, // Cambia esta URL según tu configuración
});

export default instance;