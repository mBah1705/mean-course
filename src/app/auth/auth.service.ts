import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly apiUrl = environment.apiUrl + '/user/';

  private _token: string | null = null;
  private readonly _isAuthenticated = signal(false);

  private tokenExpirationTimer: any = null;
  private readonly _userId = signal<string | null>(null)

  get token() {
    return this._token;
  }

  get isAuthenticated() {
    return this._isAuthenticated();
  }

  get userId() {
    return this._userId();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.httpClient.post<{message: string, authData: AuthData}>(`${this.apiUrl}signup`, authData).subscribe(
      {next: (response) => {this.router.navigate(['/'])},
      error: error => console.log(error) 
    }) 
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.httpClient.post<{message: string, token: string, expiresIn: number, userId: string}>(`${this.apiUrl}login`, authData).subscribe(response => {
      this._token = response.token
      this._isAuthenticated.set(!!this._token)
      if (this._token) {
        const expirationDuration = response.expiresIn * 1000;
        const expirationDate = new Date(new Date().getTime() + expirationDuration);
        this.saveAuthData(this._token, expirationDate, response.userId);
        this._userId.set(response.userId);
        this.tokenExpirationTimer = setTimeout(() => {
          this.logout()
        }, expirationDuration)
      }
      this.router.navigate(['/'])
    })
  }

  autoLogin() {
    const authData = this.getAuthData();
    if (!authData) {
      return;
    }
    const now = new Date();
    const expiresIn = authData.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this._token = authData.token;
      this._isAuthenticated.set(true);
      this._userId.set(authData.userId);
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout()
      }, expiresIn)
    }
  }

  logout() {
    this._token = null;
    this._isAuthenticated.set(false);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
    this._userId.set(null);
    this.clearAuthData();
    this.router.navigate(['/'])
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string | null) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId ?? '');
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }
}
