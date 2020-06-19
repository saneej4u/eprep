import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentUser: IUser;

  authState = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      } else {
        this.currentUser = null;
        localStorage.setItem('user', null);
      }
      this.authState = user;
    });
  }

  get isLogedIn(): boolean
  {
    return this.authState != null;
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

  sendPasswordResetEmail(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  loadCurrentUser() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        console.log('user' + JSON.stringify(this.currentUser.email));
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      } else {
        console.log('user: null');
        localStorage.setItem('user', null);
      }
    });
  }
}
