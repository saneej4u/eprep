import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/account/account.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  currentUser: IUser;

  constructor(private accoutService: AccountService, private afAuth: AngularFireAuth, private router: Router) {
  }

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        console.log('user' + JSON.stringify(this.currentUser.email));
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      } else {
        this.currentUser = null;
        console.log('user: null');
        localStorage.setItem('user', null);
      }
    });
  }

  items: string[] = [
    'Medical',
    'Dental',
    'Pharamacy'
  ];
 
  logOut()
  {
    this.accoutService.logout();
  }

}
