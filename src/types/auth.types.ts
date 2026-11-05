export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email?: string;
  role: 'Konsultan' | 'Kontraktor' | 'Dinas' | 'Eksternal' | string;
  avatar?: string;
}

export interface LoginCredentials {
  username: string;
  password?: string;
  role: string;
  rememberMe?: boolean;
}

export interface AuthResponseData {
  user: UserProfile;
  token: string;
}
