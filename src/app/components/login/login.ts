import { Component, signal, inject } from '@angular/core';
import { form, required, minLength, email, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { LoginService, LoginCredentials } from '../../services/login';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private loginService = inject(LoginService);

  loginModel = signal<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false,
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email address is required' });
    email(schemaPath.email, { message: 'Please enter a valid email address' });

    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, {
      message: 'Password must be at least 8 characters',
    });
  });

  statusMessage = signal<string>('');

  submitWithPromise(event: Event) {
    event.preventDefault();
    this.statusMessage.set('Submitting via Promise...');

    const creds: LoginCredentials = this.loginModel();

    this.loginService
      .loginWithPromise(creds)
      .then((resolved) => {
        this.statusMessage.set('Promise login success — check console.');
        console.log('Promise resolved with:', resolved);
      })
      .catch((err) => {
        this.statusMessage.set(`Promise login failed: ${err}`);
      });
  }

  submitWithObservable(event: Event) {
    event.preventDefault();
    this.statusMessage.set('Submitting via Observable...');

    const creds: LoginCredentials = this.loginModel();

    this.loginService.loginWithObservable(creds).subscribe({
      next: (transformed) => {
        this.statusMessage.set('Observable login success — check console.');
        console.log('Observable emitted (uppercased):', transformed);
      },
      error: (err) => {
        this.statusMessage.set(`Observable login failed: ${err}`);
      },
      complete: () => {
        console.log('Observable stream complete.');
      },
    });
  }
}
