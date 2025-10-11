// hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '@/services/api';
// import type { User } from '@/types';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authAPI.login(email, password),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.data.token);
      queryClient.setQueryData(['user'], data.data.user);
    },
    onError: (error: any) => {
      throw error;
    },
  });

  const registerMutation = useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.data.token);
      queryClient.setQueryData(['user'], data.data.user);
    },
    onError: (error: any) => {
      throw error;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      localStorage.removeItem('auth_token');
      queryClient.setQueryData(['user'], null);
      queryClient.clear();
      navigate('/login');
    },
  });

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => authAPI.getCurrentUser().then(res => res.data),
    enabled: !!localStorage.getItem('auth_token'),
    retry: false,
  });

  return {
    user: userQuery.data || null,
    isLoading: userQuery.isLoading,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
};