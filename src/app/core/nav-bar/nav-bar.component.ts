import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/account/account.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentUser: IUser;

  basketItemsCount: number;

  constructor(
    private accoutService: AccountService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        console.log('user' + JSON.stringify(this.currentUser.email));
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      } else {
        this.currentUser = null;
        localStorage.setItem('user', null);
        console.log('user: null');
      }
    });

    this.basketService.getBasketItems().subscribe(
      result => {
        this.basketItemsCount = result.length;
      },
      error => {
        console.log('error');
      }
    );
  }

  items: string[] = ['Medical', 'Dental', 'Pharamacy'];

  logOut() {
    this.accoutService.logout();
  }
}
