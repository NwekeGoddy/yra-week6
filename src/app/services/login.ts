import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class LoginService {

 loginWithPromise(credentials: LoginCredentials): Promise<LoginCredentials> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!credentials.email || !credentials.password) {
          reject('Invalid credentials');
          return;
        }

        console.log('[Promise] Login submitted:', credentials);
        resolve(credentials);
      }, 1000);
    });
  }

 loginWithObservable(credentials: LoginCredentials): Observable<LoginCredentials> {
    return new Observable<LoginCredentials>((subscriber) => {
      setTimeout(() => {
        if (!credentials.email || !credentials.password) {
          subscriber.error('Invalid credentials');
          return;
        }

        subscriber.next(credentials);
        subscriber.complete();
      }, 1000);
    }).pipe(
      map((creds) => ({
        ...creds,
        email: creds.email.toUpperCase(),
        password: creds.password.toUpperCase(),
      })),
     map((uppercased) => {
        console.log('[Observable] Login submitted (uppercased):', uppercased);
        return uppercased;
      }),
    );
  }
}
