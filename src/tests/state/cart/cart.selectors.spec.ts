import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { CartSelectors } from './cart.selectors';
import { Store } from '../../core/store/store';
import { CartState } from './cart.reducer';

describe('CartSelectors', () => {
  let selectors: CartSelectors;
  let mockStore: jasmine.SpyObj<Store<any>>;
  let cartStateSubject: BehaviorSubject<{ cart: CartState }>;

  beforeEach(() => {
    const initialState: CartState = {
      items: [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 },
        { id: 2, name: 'Product 2', price: 20, quantity: 1 },
      ],
      total: 40,
      itemCount: 3,
    };

    cartStateSubject = new BehaviorSubject<{ cart: CartState }>({ cart: initialState });

    mockStore = jasmine.createSpyObj('Store', ['select']);
    mockStore.select.and.returnValue(cartStateSubject.asObservable().pipe());

    TestBed.configureTestingModule({
      providers: [
        CartSelectors,
        { provide: Store, useValue: mockStore },
      ],
    });

    selectors = TestBed.inject(CartSelectors);
  });

  describe('selectCartItems', () => {
    it('should select cart items', (done) => {
      selectors.selectCartItems().subscribe((items) => {
        expect(items.length).toBe(2);
        expect(items[0].id).toBe(1);
        expect(items[1].id).toBe(2);
        done();
      });
    });

    it('should return empty array if no items', (done) => {
      cartStateSubject.next({ cart: { items: [], total: 0, itemCount: 0 } });

      selectors.selectCartItems().subscribe((items) => {
        expect(items).toEqual([]);
        done();
      });
    });
  });

  describe('selectCartTotal', () => {
    it('should select cart total', (done) => {
      selectors.selectCartTotal().subscribe((total) => {
        expect(total).toBe(40);
        done();
      });
    });
  });

  describe('selectCartItemCount', () => {
    it('should select cart item count', (done) => {
      selectors.selectCartItemCount().subscribe((count) => {
        expect(count).toBe(3);
        done();
      });
    });
  });

  describe('selectCartItem', () => {
    it('should select specific cart item by id', (done) => {
      selectors.selectCartItem(1).subscribe((item) => {
        expect(item).toBeDefined();
        expect(item.id).toBe(1);
        expect(item.name).toBe('Product 1');
        done();
      });
    });

    it('should return undefined for non-existent item', (done) => {
      selectors.selectCartItem(999).subscribe((item) => {
        expect(item).toBeUndefined();
        done();
      });
    });
  });
});
