import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IUser } from '../shared/models/user';
import { ReplaySubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUserProfile } from '../shared/models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.loadCurrentUser();
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  register(values: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(
      values.email,
      values.password
    );
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
    return this.afAuth.authState.pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.uid);
          this.currentUserSource.next(user);
        } else {
          localStorage.setItem('token', null);
          this.currentUserSource.next(null);
        }
      })
    );
  }

  createUserProfile(userProfile: IUserProfile) {
    const userProfileId = userProfile.id; // this.firestore.createId();
    this.firestore
      .collection('userProfile')
      .doc(userProfileId)
      .set(userProfile);
  }
}
