// src/types/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'system_admin' | 'local_leader' | 'policy_maker' | 'citizen';
}

export interface Citizen {
  id: number;
  user_id: number;
  national_id: string;
  full_name: string;
  date_of_birth: string;
  address: string;
  phone_number: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  verification_notes?: string;
  verified_by?: number;
  created_at: string;
  updated_at: string;
  user?: User;
  verifier?: User;
}

export interface AuthResponse {
  user: User;
  token: string;
}