  // AuthProvider.tsx
  import React, { createContext } from "react";
  import { useAuth } from "@/hooks/useAuth";
  import type { User } from "@/types";

  // Define a proper type for your auth context
  interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    register?: (data: any) => Promise<void>;
  }

  const AuthContext = createContext<AuthContextType | null>(null);

  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const auth = useAuth();

    const value: AuthContextType = {
      user: auth.user || null,
      isLoading: auth.isLoading,
      login: async (credentials) => {
        await auth.login(credentials);
      },
      logout: async () => {
        await auth.logout();
      },
      register: async (data) => {
        await auth.register(data);
      },
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };

  export { AuthContext };
