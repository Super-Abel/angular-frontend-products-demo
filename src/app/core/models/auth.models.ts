export interface AuthState {
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface RefreshResponse {
  access: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
