// hooks/useSettings.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsAPI, securityAPI } from '@/services/api';

export const useSettings = () => {
  const queryClient = useQueryClient();

  const systemSettingsQuery = useQuery({
    queryKey: ['settings', 'system'],
    queryFn: () => settingsAPI.getSystemSettings().then(res => res.data),
  });

  const accountSettingsQuery = useQuery({
    queryKey: ['settings', 'account'],
    queryFn: () => settingsAPI.getAccountSettings().then(res => res.data),
  });

  const updateSystemSettingsMutation = useMutation({
    mutationFn: settingsAPI.updateSystemSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'system'] });
    },
  });

  const updateAccountSettingsMutation = useMutation({
    mutationFn: settingsAPI.updateAccountSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'account'] });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: settingsAPI.changePassword,
  });

  return {
    systemSettings: systemSettingsQuery.data,
    accountSettings: accountSettingsQuery.data,
    updateSystemSettings: updateSystemSettingsMutation.mutateAsync,
    updateAccountSettings: updateAccountSettingsMutation.mutateAsync,
    changePassword: changePasswordMutation.mutateAsync,
    isLoading: systemSettingsQuery.isLoading || accountSettingsQuery.isLoading,
  };
};

export const useSecurity = () => {
  const queryClient = useQueryClient();

  const securitySettingsQuery = useQuery({
    queryKey: ['security', 'settings'],
    queryFn: () => securityAPI.getSecuritySettings().then(res => res.data),
  });

  const auditLogsQuery = useQuery({
    queryKey: ['security', 'audit-logs'],
    queryFn: () => securityAPI.getAuditLogs().then(res => res.data),
  });

  const activeSessionsQuery = useQuery({
    queryKey: ['security', 'active-sessions'],
    queryFn: () => securityAPI.getActiveSessions().then(res => res.data),
  });

  const updateSecuritySettingsMutation = useMutation({
    mutationFn: securityAPI.updateSecuritySettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security', 'settings'] });
    },
  });

  return {
    securitySettings: securitySettingsQuery.data,
    auditLogs: auditLogsQuery.data,
    activeSessions: activeSessionsQuery.data,
    updateSecuritySettings: updateSecuritySettingsMutation.mutateAsync,
    isLoading: securitySettingsQuery.isLoading || auditLogsQuery.isLoading || activeSessionsQuery.isLoading,
  };
};