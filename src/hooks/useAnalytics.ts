import { useQuery } from '@tanstack/react-query';
import { analyticsAPI } from '@/services/api';

export const useAnalytics = () => {
  const statsQuery = useQuery({
    queryKey: ['analytics', 'stats'],
    queryFn: () => analyticsAPI.getStats().then(res => res.data),
  });

  const trendsQuery = useQuery({
    queryKey: ['analytics', 'trends'],
    queryFn: () => analyticsAPI.getVerificationTrends().then(res => res.data),
  });

  const demographicsQuery = useQuery({
    queryKey: ['analytics', 'demographics'],
    queryFn: () => analyticsAPI.getDemographics().then(res => res.data),
  });

  return {
    stats: statsQuery.data,
    trends: trendsQuery.data,
    demographics: demographicsQuery.data,
    isLoading: statsQuery.isLoading || trendsQuery.isLoading || demographicsQuery.isLoading,
  };
};