// authentication.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticated = false;

  constructor() { }

  login(username: string, password: string): void {
    // Logic to authenticate user (e.g., API call)
    this.isAuthenticated = true;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  setAuthenticatedUser(isAuthenticated: boolean): void {
    this.isAuthenticated = isAuthenticated;
  }
}
