
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Login from "@/pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

// Role-specific pages
import UserManagement from "@/pages/system-admin/UserManagement";
import SystemSettings from "@/pages/system-admin/SystemSettings";
import CitizenVerification from "@/pages/local-leader/CitizenVerification";
import Analytics from "@/pages/policy-maker/Analytic";
import Profile from "@/pages/citizen/Profile";
import AccountSettings from "@/pages/settings/AccountSettings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-right" duration={4000} richColors closeButton />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* System Admin Routes */}
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["system_admin"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />


         


          <Route
            path="/settings"
            element={
              <ProtectedRoute allowedRoles={["system_admin"]}>
                <SystemSettings />
              </ProtectedRoute>
            }
          />

          {/* Local Leader Routes */}
          <Route
            path="/verification"
            element={
              <ProtectedRoute allowedRoles={["local_leader"]}>
                <CitizenVerification />
              </ProtectedRoute>
            }
          />

          {/* Policy Maker Routes */}
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={["policy_maker"]}>
                <Analytics />
              </ProtectedRoute>
            }
          />

          {/* Citizen Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["citizen"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Common Routes */}
          <Route
            path="/account-settings"
            element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
