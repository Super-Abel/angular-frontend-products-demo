import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductsEffects } from './products.effects';
import { Store } from '../../core/store/store';
import { ShopApiService } from '../../core/services/shop-api.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from './products.actions';

describe('ProductsEffects', () => {
  let effects: ProductsEffects;
  let mockStore: jasmine.SpyObj<Store<any>>;
  let mockApi: jasmine.SpyObj<ShopApiService>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'getState']);
    mockApi = jasmine.createSpyObj('ShopApiService', ['getProducts', 'getProductRating']);

    mockStore.getState.and.returnValue({
      products: {
        filters: { page: 1, pageSize: 10 },
        products: [],
      },
    });

    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        { provide: Store, useValue: mockStore },
        { provide: ShopApiService, useValue: mockApi },
      ],
    });

    effects = TestBed.inject(ProductsEffects);
  });

  describe('loadProducts', () => {
    it('should dispatch loadProductsSuccess on success', (done) => {
      const mockResponse = {
        results: [
          { id: 1, name: 'Product 1', price: 10 },
          { id: 2, name: 'Product 2', price: 20 },
        ],
        count: 2,
      };

      mockApi.getProducts.and.returnValue(of(mockResponse));

      mockStore.dispatch(loadProducts({ page: 1 }));

      setTimeout(() => {
        const successCall = mockStore.dispatch.calls
          .all()
          .find((call) => call.args[0].type === '[Products] Load Products Success');

        expect(successCall).toBeDefined();
        expect(successCall?.args[0].payload).toEqual(mockResponse);
        done();
      }, 100);
    });

    it('should dispatch loadProductsFailure on error', (done) => {
      const errorResponse = { error: { detail: 'Network error' } };

      mockApi.getProducts.and.returnValue(throwError(() => errorResponse));

      mockStore.dispatch(loadProducts({ page: 1 }));

      setTimeout(() => {
        const failureCall = mockStore.dispatch.calls
          .all()
          .find((call) => call.args[0].type === '[Products] Load Products Failure');

        expect(failureCall).toBeDefined();
        expect(failureCall?.args[0].payload).toBe('Network error');
        done();
      }, 100);
    });
  });
});
