import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IBasketItem } from '../shared/models/basket';
import { BasketService } from '../basket/basket.service';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  basketItems: IBasketItem[];
  constructor(private basketService: BasketService, private afAuth: AngularFireAuth, private accountService: AccountService) {}

  ngOnInit(): void {
    this.basketService.getBasketItems().subscribe(
      (items: IBasketItem[]) => {
        this.basketItems = items;
      },
      error => {
        console.log('Basket Items error: ' + error);
      }
    );
  }

}
