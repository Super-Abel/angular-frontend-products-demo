/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw';
import { products, reviews, orders, mockUser, adminStats } from './data';
import { paginate, avgRating } from './utils';

const API = '/api';

export const handlers = [
  // Auth: POST /api/auth/token/ -> { access, refresh }
  http.post(`${API}/auth/token/`, async () => {
    return HttpResponse.json(
      {
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
      },
      { status: 200 },
    );
  }),

  // Auth refresh: POST /api/auth/token/refresh/ -> { access }
  http.post(`${API}/auth/token/refresh/`, async () => {
    return HttpResponse.json({ access: 'mock-access-token-refreshed' }, { status: 200 });
  }),

  // Products list: GET /api/products/?page=&page_size=&min_rating=&ordering=
  http.get(`${API}/products/`, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const page_size = Number(url.searchParams.get('page_size') || '10');
    const min_rating = Number(url.searchParams.get('min_rating') || '0');
    const ordering = url.searchParams.get('ordering') || '-created_at';

    const rows = products
      .map((p) => ({ ...p, _avg: avgRating(p.ratings) }))
      .filter((p) => p._avg >= min_rating);

    const sign = ordering.startsWith('-') ? -1 : 1;
    const key = ordering.replace(/^-/, '');
    rows.sort((a: any, b: any) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * sign);

    const { count, results } = paginate(rows, page, page_size);
    return HttpResponse.json({ count, next: null, previous: null, results }, { status: 200 });
  }),

  // Product detail: GET /api/products/:id/
  http.get(`${API}/products/:id/`, async ({ params }) => {
    const id = Number(params['id']);
    const p = products.find((x) => x.id === id);
    if (!p) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });
    return HttpResponse.json(p, { status: 200 });
  }),

  // Product rating: GET /api/products/:id/rating/
  http.get(`${API}/products/:id/rating/`, async ({ params }) => {
    const id = Number(params['id']);
    const p = products.find((x) => x.id === id);
    if (!p) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });
    return HttpResponse.json(
      { product_id: id, avg_rating: avgRating(p.ratings), count: p.ratings.length },
      { status: 200 },
    );
  }),

  // User profile: GET /api/me/
  http.get(`${API}/me/`, async () => {
    return HttpResponse.json(mockUser, { status: 200 });
  }),

  // Update user: PATCH /api/me/
  http.patch(`${API}/me/`, async ({ request }) => {
    const body = await request.json() as any;
    const updated = { ...mockUser, ...body };
    return HttpResponse.json(updated, { status: 200 });
  }),

  // User orders: GET /api/me/orders/
  http.get(`${API}/me/orders/`, async () => {
    return HttpResponse.json(mockUser.orders, { status: 200 });
  }),

  // Order detail: GET /api/orders/:id/
  http.get(`${API}/orders/:id/`, async ({ params }) => {
    const order = orders.find((o) => o.id === params['id']);
    if (!order) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });
    return HttpResponse.json(order, { status: 200 });
  }),

  // Wishlist: GET /api/me/wishlist/
  http.get(`${API}/me/wishlist/`, async () => {
    return HttpResponse.json(mockUser.wishlistProductIds, { status: 200 });
  }),

  // Wishlist toggle: POST /api/me/wishlist/
  http.post(`${API}/me/wishlist/`, async ({ request }) => {
    const { productId } = (await request.json()) as any;
    const idx = mockUser.wishlistProductIds.indexOf(productId);
    if (idx > -1) {
      mockUser.wishlistProductIds.splice(idx, 1);
    } else {
      mockUser.wishlistProductIds.push(productId);
    }
    return HttpResponse.json(mockUser.wishlistProductIds, { status: 200 });
  }),

  // Reviews list: GET /api/products/:id/reviews/
  http.get(`${API}/products/:id/reviews/`, async ({ params }) => {
    const id = Number(params['id']);
    return HttpResponse.json(reviews[id] || [], { status: 200 });
  }),

  // Post review: POST /api/products/:id/reviews/
  http.post(`${API}/products/:id/reviews/`, async ({ params, request }) => {
    const id = Number(params['id']);
    const body = (await request.json()) as any;
    const newReview = {
      id: `r${Date.now()}`,
      user: 'CurrentUser',
      rating: body.rating,
      comment: body.comment,
      createdAt: new Date().toISOString(),
    };
    if (!reviews[id]) reviews[id] = [];
    reviews[id].push(newReview);
    return HttpResponse.json(newReview, { status: 201 });
  }),

  // Apply promo: POST /api/cart/apply-promo/
  http.post(`${API}/cart/apply-promo/`, async ({ request }) => {
    const { items, code } = (await request.json()) as any;
    const itemsTotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    let discount = 0;
    let shipping = 10;

    if (code === 'WELCOME10') discount = itemsTotal * 0.1;
    else if (code === 'FREESHIP') shipping = 0;
    else if (code === 'VIP20' && itemsTotal >= 500) discount = itemsTotal * 0.2;

    const taxes = (itemsTotal - discount) * 0.2;
    const grandTotal = itemsTotal - discount + shipping + taxes;

    return HttpResponse.json({
      itemsTotal,
      discount,
      shipping,
      taxes,
      grandTotal,
      appliedPromos: code ? [code] : [],
    }, { status: 200 });
  }),

  // Validate stock: POST /api/cart/validate-stock/
  http.post(`${API}/cart/validate-stock/`, async ({ request }) => {
    const { items } = (await request.json()) as any;
    for (const item of items) {
      const product = products.find((p) => p.id === item.id);
      if (!product || product.stock < item.quantity) {
        return HttpResponse.json(
          { error: `Stock insuffisant pour ${product?.name || item.id}` },
          { status: 400 }
        );
      }
    }
    return HttpResponse.json({ valid: true }, { status: 200 });
  }),

  // Admin stats: GET /api/admin/stats/
  http.get(`${API}/admin/stats/`, async () => {
    return HttpResponse.json(adminStats, { status: 200 });
  }),
];
