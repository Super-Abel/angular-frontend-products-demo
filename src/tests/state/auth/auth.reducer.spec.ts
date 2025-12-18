import { authReducer, initialAuthState } from '../../../app/state/auth/auth.reducer';
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  refreshToken,
  refreshSuccess,
  refreshFailure,
} from '../../../app/state/auth/auth.actions';
import { AuthState } from '../../../app/core/models/auth.models';

describe('AuthReducer', () => {
  it('should return initial state', () => {
    const action = { type: 'UNKNOWN' };
    const result = authReducer(undefined, action);

    expect(result).toEqual(initialAuthState);
  });

  describe('LOGIN', () => {
    it('should set loading to true', () => {
      const action = login({ username: 'test', password: 'pass' });
      const result = authReducer(initialAuthState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should store tokens and set authenticated', () => {
      const tokens = { access: 'access-token', refresh: 'refresh-token' };
      const action = loginSuccess(tokens);
      const result = authReducer(initialAuthState, action);

      expect(result.access).toBe('access-token');
      expect(result.refresh).toBe('refresh-token');
      expect(result.isAuthenticated).toBe(true);
      expect(result.loading).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('LOGIN_FAILURE', () => {
    it('should store error and set authenticated to false', () => {
      const action = loginFailure('Invalid credentials');
      const result = authReducer(initialAuthState, action);

      expect(result.error).toBe('Invalid credentials');
      expect(result.isAuthenticated).toBe(false);
      expect(result.loading).toBe(false);
    });
  });

  describe('REFRESH_TOKEN', () => {
    it('should set loading to true', () => {
      const action = refreshToken('refresh-token');
      const result = authReducer(initialAuthState, action);

      expect(result.loading).toBe(true);
    });
  });

  describe('REFRESH_SUCCESS', () => {
    it('should update access token', () => {
      const stateWithTokens: AuthState = {
        ...initialAuthState,
        access: 'old-access',
        refresh: 'refresh-token',
        isAuthenticated: true,
      };
      const action = refreshSuccess('new-access-token');
      const result = authReducer(stateWithTokens, action);

      expect(result.access).toBe('new-access-token');
      expect(result.loading).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('REFRESH_FAILURE', () => {
    it('should store error', () => {
      const action = refreshFailure('Token expired');
      const result = authReducer(initialAuthState, action);

      expect(result.error).toBe('Token expired');
      expect(result.loading).toBe(false);
    });
  });

  describe('LOGOUT', () => {
    it('should reset to initial state', () => {
      const authenticatedState: AuthState = {
        access: 'access-token',
        refresh: 'refresh-token',
        loading: false,
        error: null,
        isAuthenticated: true,
      };
      const action = logout();
      const result = authReducer(authenticatedState, action);

      expect(result).toEqual(initialAuthState);
    });
  });
});
