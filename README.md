# MyShop - Application E-commerce Avancée

Application e-commerce développée avec Angular 20, NgRx (custom), MSW et TailwindCSS.

## 🚀 Démarrage Rapide

```bash
npm install
npm start  # http://localhost:4200
npm run storybook  # http://localhost:6006
```

---

## 📦 Exercice 1 & 2 (Pré-requis)

### Fonctionnalités implémentées

- **Authentification** : JWT (access/refresh tokens) + state NgRx `auth`
- **Catalogue produits** : Liste avec filtres/pagination + state `products`
- **Rating** : Affichage note moyenne par produit
- **Panier** : State `cart` avec ajout/suppression/quantité + localStorage
- **Checkout** : Flux multi-étapes (récapitulatif → adresse → confirmation)
- **Storybook** : ProductCard, LoginForm, Cart

---

## ✨ Exercice 3 - Nouvelles Fonctionnalités

### 1. Espace "Mon compte" 👤

**Pages** :
- `/account/profile` - Profil + préférences (newsletter, min rating)
- `/account/orders` - Liste des commandes
- `/account/orders/:id` - Détail commande (items, taxes, shipping)

**State NgRx** : Slice `user` (séparé de `auth`)
```typescript
user: {
  id, username, email, fullName, defaultAddress,
  preferences: { newsletter, defaultMinRating },
  orders: OrderSummary[],
  wishlistProductIds: number[]
}
```

**Endpoints MSW** :
- `GET/PATCH /api/me/` - Profil
- `GET /api/me/orders/` - Liste commandes
- `GET /api/orders/:id/` - Détail commande

---

### 2. Wishlist ❤️

**Implémentation** : Intégrée dans slice `user` (cohérence des données utilisateur)

**Fonctionnalités** :
- Bouton cœur sur ProductCard (`WishlistButtonComponent`)
- Page `/account/wishlist` avec ajout au panier
- Persistance localStorage + sync NgRx

**Endpoints MSW** :
- `GET /api/me/wishlist/`
- `POST /api/me/wishlist/` - Toggle produit

---

### 3. Reviews Avancées ⭐

**Components** :
- `ReviewListComponent` - Affiche avis (user, rating, date, commentaire)
- `ReviewFormComponent` - Formulaire (rating 1-5, commentaire)

**Endpoints MSW** :
- `GET /api/products/:id/reviews/`
- `POST /api/products/:id/reviews/` - Créer avis

**Intégration** : Section "Avis clients" sur ProductDetails

---

### 4. Règles Métier 💰

#### Codes Promo
- `WELCOME10` : -10% sur total
- `FREESHIP` : Livraison gratuite
- `VIP20` : -20% si total ≥ 500€

**Endpoint** : `POST /api/cart/apply-promo/`
```typescript
Response: {
  itemsTotal, discount, shipping, taxes, grandTotal, appliedPromos[]
}
```

#### Stock Avancé
```typescript
Product: {
  stock: number,
  lowStockThreshold: number
}
```

**Affichage UI** :
- "En stock" si stock > threshold
- "Plus que X en stock" si 0 < stock ≤ threshold
- "Rupture de stock" si stock === 0
- Désactivation ajout panier si stock === 0

**Validation** : `POST /api/cart/validate-stock/` avant checkout

#### Taxes & Shipping
Calculés dynamiquement par `/api/cart/apply-promo/`, plus de valeurs codées en dur.

---

### 5. Dashboard Admin 📊

**Page** : `/admin/dashboard`

**Données** (GET `/api/admin/stats/`) :
- Total users, orders, revenue
- Top 3 produits (vendus, CA)
- Commandes récentes

**UI** : Cards statistiques + tableaux

---

### 6. Navigation 🧭

**Composants** :
- `NavbarComponent` - Header avec logo et panier (compteur articles)
- Sidebar fixe gauche avec navigation principale

**Pages** :
- Produits, Wishlist, Commandes, Profil, Admin

**Design** : Tailwind avec gradients, hover states, badges

---

## ⚡ Optimisations Performance

### Lazy Loading
**Modules** :
- `ShopModule` : /shop/products, /shop/cart, /shop/checkout
- `AccountModule` : /account/profile, /account/orders, /account/wishlist
- `AdminModule` : /admin/dashboard

**Configuration** : `loadChildren()` dans [app.routes.ts](src/app/app.routes.ts)

### ChangeDetection OnPush
Tous les composants de pages/listes utilisent `ChangeDetectionStrategy.OnPush`.

### trackBy sur *ngFor
Implémenté sur toutes les listes (produits, commandes, reviews, orders).

### Selectors Mémorisés
**Cart** :
- `selectCartTotalItems`
- `selectCartHasItems`
- `selectCartItemById(id)`

**User** :
- `selectWishlistCount`
- `selectOrdersByStatus(status)`
- `isInWishlist(productId)`

Utilisation de `distinctUntilChanged()` pour éviter re-renders inutiles.

### Cache Produits (Stale-While-Revalidate)
*Non implémenté* - Amélioration future.

---

## 🎨 Architecture

```
src/app/
├── core/
│   ├── models/         # Interfaces (Product, User, Order...)
│   ├── services/       # ShopApiService
│   ├── store/          # Custom NgRx-like Store
│   └── interceptors/   # authInterceptor
├── state/
│   ├── auth/           # Auth slice (login, tokens)
│   ├── products/       # Products slice (catalogue, filters)
│   ├── cart/           # Cart slice (items, total, promo)
│   └── user/           # User slice (profile, orders, wishlist)
├── modules/
│   ├── shop/           # Lazy Shop routes
│   ├── account/        # Lazy Account routes
│   └── admin/          # Lazy Admin routes
├── pages/
│   ├── account/        # Profile, Orders, OrderDetail
│   ├── admin/          # Dashboard
│   ├── wishlist/       # WishlistComponent
│   └── ...
├── components/
│   ├── navbar/          # Header + Sidebar
│   ├── review-list/
│   ├── review-form/
│   ├── wishlist-button/
│   ├── notification-toast/
│   └── ...
└── mocks/
    ├── handlers.ts     # MSW handlers
    └── data.ts         # Mock data
```

---

## 🧪 Storybook

**Nouvelles stories (Exercice 3)** :
- `ReviewListComponent` - États : Default, Empty, SingleReview
- `ReviewFormComponent` - Actions : reviewSubmit
- `WishlistButtonComponent` - États : NotInWishlist, InWishlist
- `ProfileComponent` - Page complète

**Lancer** : `npm run storybook`

---

## 🔧 Décisions Techniques

### Pourquoi intégrer Wishlist dans `user` ?
La wishlist est une donnée utilisateur personnelle, au même titre que les préférences/commandes. Cela évite de multiplier les slices et centralise les données user.

### Pourquoi custom NgRx ?
Le projet utilise un store custom (compatible NgRx patterns) pour éviter la verbosité de @ngrx/store tout en gardant une architecture flux claire.

### Optimisations prioritaires
1. **Lazy loading** : Réduction bundle initial
2. **OnPush + trackBy** : Limitation change detection
3. **Memoized selectors** : Cache calculs dérivés
4. **localStorage** : Persistance cart/wishlist offline

---

## ✅ Exercice 3 - État d'avancement

### Complété
- ✅ Espace Mon compte (profile, orders, order details)
- ✅ State user NgRx avec wishlist intégrée
- ✅ Endpoints MSW (profil, commandes, wishlist, reviews, promo, stock, admin)
- ✅ Wishlist avec WishlistButton intégré dans ProductCard
- ✅ Reviews avancées (ReviewList, ReviewForm)
- ✅ Page ProductDetails avec reviews et stock
- ✅ Règles métier : codes promo, stock (affichage UI), taxes dynamiques
- ✅ Dashboard Admin (stats, top produits, commandes récentes)
- ✅ Lazy loading (3 modules: shop, account, admin)
- ✅ OnPush sur tous composants de pages/listes
- ✅ trackBy sur *ngFor (products, reviews, orders, wishlist, admin)
- ✅ Selectors mémorisés (cart, user, wishlist)
- ✅ Notifications globales (NotificationService + NotificationToastComponent)
- ✅ Stock fields dans Product model + mock data
- ✅ Aria-labels sur boutons principaux
- ✅ Home redirect vers login
- ✅ Skeleton loaders (SkeletonLoaderComponent + ProductsList)
- ✅ Cache stale-while-revalidate (ProductsEffects)
- ✅ Navbar avec sidebar navigation et compteur panier
- ✅ Types cohérents (wishlistProductIds: number[])

---

## ✅ Exercice 4 - Production Ready

### UX Améliorations
- ✅ **Filtres produits** : Debounce 500ms + sync URL query params
- ✅ **Navigation navigateur** : Back/Forward restaure filtres
- ✅ **Retry button** : Sur erreur API
- ✅ **Skeleton loaders** : ProductsList pendant chargement
- ✅ **Empty states** : Messages "Aucun produit" / "Panier vide"

### Route Guards
- ✅ **CartGuard** : Empêche accès checkout si panier vide

### Qualité Code
- ✅ **Tests unitaires** : 37 tests (reducers, selectors, effects, components)
  - Cart reducer (6 tests)
  - Auth reducer (7 tests)
  - Cart selectors (4 tests)
  - User selectors (4 tests)
  - Products effects (2 tests)
  - Auth effects (2 tests)
  - ProductCard component (5 tests)
  - LoginForm component (7 tests)
- ✅ **GitHub Actions CI** : Lint, tests, build sur PR
- ✅ **Coverage** : Tests avec coverage uploadé sur Codecov

### Architecture
- ✅ **Layouts modulaires** : client-layout, admin-layout
- ✅ **Home page professionnelle** : Landing avec sections Features + CTA
- ✅ **Séparation client/admin** : Interfaces dédiées
- ✅ **Logout** : Fonctionnalité complète avec navigation

---

## 🧪 Tests

```bash
npm test                # Lancer tests unitaires
npm test -- --coverage  # Avec rapport coverage
```

**37 tests couvrant** :
- Reducers (cart, auth)
- Selectors (cart, user)
- Effects (products, auth)
- Components (product-card, login-form)

---

## 🔄 CI/CD

**GitHub Actions** (`.github/workflows/ci.yml`) :
1. Checkout code
2. Setup Node.js 20
3. Install dependencies (`npm ci`)
4. Lint (`npm run lint`)
5. Tests (`npm test -- --no-watch --browsers=ChromeHeadless --code-coverage`)
6. Build (`npm run build`)
7. Upload coverage to Codecov

**Déclencheurs** : Pull requests et push sur main/master

---

## 🛠️ Technologies

- **Angular 20** - Framework
- **Custom NgRx** - State management
- **MSW 2** - API mocking
- **TailwindCSS 4** - Styling
- **Storybook 10** - Component documentation
- **TypeScript 5.9** - Type safety

---

## 📝 Commandes

```bash
npm start              # Dev server :4200
npm run build          # Production build
npm run storybook      # Storybook :6006
npm test               # Unit tests
npm run lint           # ESLint
```
