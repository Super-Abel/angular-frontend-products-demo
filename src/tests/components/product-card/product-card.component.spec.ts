import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from '../../../app/components/product-card/product-card.component';
import { Store } from '../../../app/core/store/store';
import { addToCart } from '../../../app/state/cart/cart.actions';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let mockStore: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product information', () => {
    component.id = 1;
    component.name = 'Test Product';
    component.price = 29.99;
    component.avgRating = 4.5;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Test Product');
    expect(compiled.textContent).toContain('29,99');
    expect(compiled.textContent).toContain('4.5');
  });

  it('should dispatch addToCart action on button click', () => {
    component.id = 1;
    component.name = 'Test Product';
    component.price = 29.99;
    component.image = '/test.jpg';

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addToCart(
        {
          id: 1,
          name: 'Test Product',
          price: 29.99,
          image: '/test.jpg',
        },
        1,
      ),
    );
  });

  it('should format date correctly', () => {
    const dateStr = '2025-01-15T10:00:00Z';
    const formatted = component.formatDate(dateStr);

    expect(formatted).toContain('Jan');
    expect(formatted).toContain('15');
    expect(formatted).toContain('2025');
  });

  it('should handle image error', () => {
    const mockImg = { src: '/original.jpg' } as HTMLImageElement;
    const event = { target: mockImg } as unknown as Event;

    component.onImageError(event);

    expect(mockImg.src).toBe('/images/placeholder.jpg');
  });
});
