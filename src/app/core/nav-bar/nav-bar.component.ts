import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/account/account.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { MatSidenav } from '@angular/material/sidenav';

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
        // console.log('Display Name: ' + JSON.stringify(this.currentUser.displayName));
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      } else {
        this.currentUser = null;
        localStorage.setItem('user', null);
      }
    });

    this.basketService.getBasketItems().subscribe(
      result => {
        if (result) {
          this.basketItemsCount = result.length;
        } else {
          this.basketItemsCount = 0;
        }
        console.log("Basket Count: " + this.basketItemsCount);
        
      },
      error => {
        console.log('error');
      }
    );

    this.basketService.basketCountSource$.subscribe(x=> {
      this.basketItemsCount = x;
    });
  }

  items: string[] = ['Medical', 'Dental', 'Pharamacy'];

  logOut() {
    this.accoutService.logout();
  }
}
