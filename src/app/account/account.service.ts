import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IUser } from '../shared/models/user';
import { ReplaySubject, of } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.loadCurrentUser();
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  register(values: any) {
    this.afAuth.createUserWithEmailAndPassword(values.email, values.password).then(result => {
        return result.user.updateProfile ( {displayName: values.fullname});
    }).then(item => {
       
    });
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
        }
        else
        {
          localStorage.setItem('token', null);
          this.currentUserSource.next(null);
        }
      })
    );
  }
}
