// services/api.ts
import axios from 'axios';
import type { User, Citizen, AuthResponse } from '@/types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');    
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) => 
    api.post<AuthResponse>('/login', { email, password }),
  register: (data: any) => 
    api.post<AuthResponse>('/register', data),
  logout: () => api.post('/logout'),
  getCurrentUser: () => api.get<User>('/user'),
};

export const citizensAPI = {
  getAll: () => api.get<{ citizens: Citizen[] }>('/citizens'),
  create: (data: Partial<Citizen>) => api.post<Citizen>('/citizens', data),
  verify: (id: number, data: any) => api.patch<Citizen>(`/citizens/${id}/verify`, data),
};

export default api;