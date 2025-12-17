import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from '../../../app/components/login-form/login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default demo credentials', () => {
    expect(component.username).toBe('demo');
    expect(component.password).toBe('demo');
  });

  it('should emit submitForm event on form submit', () => {
    spyOn(component.submitForm, 'emit');

    component.username = 'testuser';
    component.password = 'testpass';

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));

    expect(component.submitForm.emit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'testpass',
    });
  });

  it('should not emit submitForm when loading', () => {
    spyOn(component.submitForm, 'emit');

    component.loading = true;
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));

    expect(component.submitForm.emit).not.toHaveBeenCalled();
  });

  it('should display error message when error is provided', () => {
    component.error = 'Invalid credentials';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorDiv = compiled.querySelector('.bg-red-50');

    expect(errorDiv).toBeTruthy();
    expect(errorDiv?.textContent).toContain('Invalid credentials');
  });

  it('should disable inputs when loading', () => {
    component.loading = true;
    fixture.detectChanges();

    const usernameInput = fixture.nativeElement.querySelector('#username') as HTMLInputElement;
    const passwordInput = fixture.nativeElement.querySelector('#password') as HTMLInputElement;

    expect(usernameInput.disabled).toBe(true);
    expect(passwordInput.disabled).toBe(true);
  });

  it('should show loading text when loading', () => {
    component.loading = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Logging in...');
  });
});
