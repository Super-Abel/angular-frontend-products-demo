import { BehaviorSubject } from 'rxjs';
import { selectWishlist, selectWishlistCount, isInWishlist, selectOrdersByStatus } from './user.selectors';
import { UserState } from './user.reducer';
import { User } from './user.actions';

describe('UserSelectors', () => {
  let stateSubject: BehaviorSubject<{ user: UserState }>;

  beforeEach(() => {
    const mockUser: User = {
      id: '1',
      username: 'test',
      email: 'test@test.com',
      fullName: 'Test User',
      preferences: { newsletter: true, defaultMinRating: 3 },
      orders: [
        { id: 'o1', total: 100, status: 'shipped', createdAt: '2025-01-01' },
        { id: 'o2', total: 200, status: 'delivered', createdAt: '2025-01-02' },
        { id: 'o3', total: 150, status: 'shipped', createdAt: '2025-01-03' },
      ],
      wishlistProductIds: [1, 7, 18],
    };

    const initialState: UserState = {
      user: mockUser,
      loading: false,
      error: null,
    };

    stateSubject = new BehaviorSubject<{ user: UserState }>({ user: initialState });
  });

  describe('selectWishlist', () => {
    it('should select wishlist product IDs', (done) => {
      selectWishlist(stateSubject.asObservable()).subscribe((wishlist) => {
        expect(wishlist).toEqual([1, 7, 18]);
        done();
      });
    });

    it('should return empty array if no user', (done) => {
      stateSubject.next({ user: { user: null, loading: false, error: null } });

      selectWishlist(stateSubject.asObservable()).subscribe((wishlist) => {
        expect(wishlist).toEqual([]);
        done();
      });
    });
  });

  describe('selectWishlistCount', () => {
    it('should select wishlist count', (done) => {
      selectWishlistCount(stateSubject.asObservable()).subscribe((count) => {
        expect(count).toBe(3);
        done();
      });
    });

    it('should return 0 if no user', (done) => {
      stateSubject.next({ user: { user: null, loading: false, error: null } });

      selectWishlistCount(stateSubject.asObservable()).subscribe((count) => {
        expect(count).toBe(0);
        done();
      });
    });
  });

  describe('isInWishlist', () => {
    it('should return true if product is in wishlist', (done) => {
      isInWishlist(7)(stateSubject.asObservable()).subscribe((inWishlist) => {
        expect(inWishlist).toBe(true);
        done();
      });
    });

    it('should return false if product is not in wishlist', (done) => {
      isInWishlist(999)(stateSubject.asObservable()).subscribe((inWishlist) => {
        expect(inWishlist).toBe(false);
        done();
      });
    });
  });

  describe('selectOrdersByStatus', () => {
    it('should filter orders by status', (done) => {
      selectOrdersByStatus('shipped')(stateSubject.asObservable()).subscribe((orders) => {
        expect(orders.length).toBe(2);
        expect(orders[0].id).toBe('o1');
        expect(orders[1].id).toBe('o3');
        done();
      });
    });

    it('should return empty array if no orders match status', (done) => {
      selectOrdersByStatus('cancelled')(stateSubject.asObservable()).subscribe((orders) => {
        expect(orders).toEqual([]);
        done();
      });
    });
  });
});
