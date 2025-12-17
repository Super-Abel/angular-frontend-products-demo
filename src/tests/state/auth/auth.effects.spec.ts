import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuthEffects } from './auth.effects';
import { Store } from '../../core/store/store';
import { ShopApiService } from '../../core/services/shop-api.service';
import { login, loginSuccess, loginFailure } from './auth.actions';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let mockStore: jasmine.SpyObj<Store<any>>;
  let mockApi: jasmine.SpyObj<ShopApiService>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'getState']);
    mockApi = jasmine.createSpyObj('ShopApiService', ['login', 'refreshToken']);

    mockStore.getState.and.returnValue({
      auth: {
        access: null,
        refresh: null,
        loading: false,
        error: null,
        isAuthenticated: false,
      },
    });

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        { provide: Store, useValue: mockStore },
        { provide: ShopApiService, useValue: mockApi },
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  describe('login', () => {
    it('should dispatch loginSuccess on successful login', (done) => {
      const mockTokens = {
        access: 'access-token',
        refresh: 'refresh-token',
      };

      mockApi.login.and.returnValue(of(mockTokens));

      mockStore.dispatch(login({ username: 'test', password: 'pass' }));

      setTimeout(() => {
        const successCall = mockStore.dispatch.calls
          .all()
          .find((call) => call.args[0].type === '[Auth] Login Success');

        expect(successCall).toBeDefined();
        expect(successCall?.args[0].payload).toEqual(mockTokens);
        done();
      }, 100);
    });

    it('should dispatch loginFailure on failed login', (done) => {
      const errorResponse = { error: { detail: 'Invalid credentials' } };

      mockApi.login.and.returnValue(throwError(() => errorResponse));

      mockStore.dispatch(login({ username: 'test', password: 'wrong' }));

      setTimeout(() => {
        const failureCall = mockStore.dispatch.calls
          .all()
          .find((call) => call.args[0].type === '[Auth] Login Failure');

        expect(failureCall).toBeDefined();
        expect(failureCall?.args[0].payload).toBe('Invalid credentials');
        done();
      }, 100);
    });
  });
});
