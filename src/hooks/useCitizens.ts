import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { citizensAPI } from '@/services/api';
// import { Citizen } from '@/types';

export const useCitizens = () => {
  const queryClient = useQueryClient();

  const citizensQuery = useQuery({
    queryKey: ['citizens'],
    queryFn: () => citizensAPI.getAll().then(res => res.data.citizens),
  });

  const createMutation = useMutation({
    mutationFn: citizensAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['citizens'] });
    },
  });

  const verifyMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: number } & any) => 
      citizensAPI.verify(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['citizens'] });
    },
  });

  return {
    citizens: citizensQuery.data || [],
    isLoading: citizensQuery.isLoading,
    createCitizen: createMutation.mutate,
    verifyCitizen: verifyMutation.mutate,
  };
};