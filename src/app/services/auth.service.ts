import { Injectable, inject } from '@angular/core';

import { Auth, User, UserCredential, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly firebaseService = inject(FirebaseService);
  
  private readonly auth: Auth;

  constructor() {
    this.auth = this.firebaseService.auth;
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  checkAuthStateReady() {
    return this.auth.authStateReady();
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
