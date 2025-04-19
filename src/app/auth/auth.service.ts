import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly apiUrl = 'http://localhost:3000/api/user';
  private _token: string | null = null;
  private readonly _isAuthenticated = signal(false);

  get token() {
    return this._token;
  }

  get isAuthenticated() {
    return this._isAuthenticated();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.httpClient.post<{message: string, authData: AuthData}>(`${this.apiUrl}/signup`, authData).subscribe(response => console.log(response))
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.httpClient.post<{message: string, token: string}>(`${this.apiUrl}/login`, authData).subscribe(response => {
      this._token = response.token
      this._isAuthenticated.set(!!this._token)
      this.router.navigate(['/'])
    })
  }

  logout() {
    this._token = null;
    this._isAuthenticated.set(false);
    this.router.navigate(['/'])
  }
}
