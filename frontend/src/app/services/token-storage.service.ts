import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private tokenKey = 'auth-token';  
  private userKey = 'auth-user'; 

  constructor() { }
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
  saveToken(token: string): void {
    if (this.isBrowser()) {
      window.localStorage.setItem(this.tokenKey, token);
    }
  }
  saveUser(user: any): void {
    if (this.isBrowser()) {
      window.localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }
  getToken(): string | null {
    return this.isBrowser() ? window.localStorage.getItem(this.tokenKey) : null;
  }
  getUser(): any {
    if (this.isBrowser()) {
      const user = window.localStorage.getItem(this.userKey);
      if (user) {
        return JSON.parse(user);
      }
    }
    return {};  
  }
  signOut(): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(this.tokenKey);
      window.localStorage.removeItem(this.userKey);
    }
  }
}