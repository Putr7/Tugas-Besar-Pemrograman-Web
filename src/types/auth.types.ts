export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email?: string;
  role: 'Konsultan' | 'Kontraktor' | 'Dinas' | 'Eksternal' | string;
  phone?: string;
  agency?: string;
  avatar?: string;
}

export interface LoginCredentials {
  username: string;
  password?: string;
  role: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  agency?: string;
  password?: string;
}

export interface AuthResponseData {
  user: UserProfile;
  token: string;
}
