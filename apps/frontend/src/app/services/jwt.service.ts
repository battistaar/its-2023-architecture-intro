import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JWTService {
  private tokenKey = 'authToken';

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  hasToken() {
    return !!this.getToken();
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
