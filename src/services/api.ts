// services/api.ts
import axios from 'axios';
import type { User, Citizen, AuthResponse } from '@/types';

const API_BASE_URL = 'http://user-management.zen.rw/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      // window.location.href = '/login';
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
  getMyProfile: () => api.get<{ citizen: Citizen }>('/citizens/my-profile'),
  create: (data: Partial<Citizen>) => api.post<Citizen>('/citizens', data),
  update: (id: number, data: Partial<Citizen>) => api.put<Citizen>(`/citizens/${id}`, data),
  verify: (id: number, data: any) => api.patch<Citizen>(`/citizens/${id}/verify`, data),
  delete: (id: number) => api.delete(`/citizens/${id}`),
};

export const usersAPI = {
  getAll: () => api.get<{ users: User[] }>('/users'),
  create: (data: any) => api.post<User>('/users', data),
  update: (id: number, data: any) => api.put<User>(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
};

export const analyticsAPI = {
  getStats: () => api.get('/analytics/stats'),
  getVerificationTrends: () => api.get('/analytics/verification-trends'),
  getDemographics: () => api.get('/analytics/demographics'),
};

export default api;