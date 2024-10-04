import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginService } from './services/login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jest.Mocked<LoginService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    loginService = { login: jest.fn() } as unknown as jest.Mocked<LoginService>;
    router = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with login and password fields', () => {
    expect(component.loginForm.contains('login')).toBe(true);
    expect(component.loginForm.contains('password')).toBe(true);
  });

  it('should call login service and navigate on submit', () => {
    component.loginForm.setValue({
      login: 'test@example.com',
      password: 'StrongPassword1!',
    });

    component.submitUser();

    expect(loginService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
