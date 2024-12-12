import axios from 'axios';

export const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

export const api = axios.create({
  baseURL,
});
