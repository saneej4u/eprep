import { Component, OnInit } from '@angular/core';
import { IBasketItem, IBasket } from '../shared/models/basket';
import { BasketService } from './basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basketItems: IBasketItem[];
  basket: IBasket;

  constructor(private basketService: BasketService, private router: Router) {}

  ngOnInit(): void {

    this.basketService.getCurrentBasket().subscribe(
      (basket: IBasketItem) => {
        this.basket = basket;
      },
      error => {}
    );

    this.basketService.getBasketItems().subscribe(
      (items: IBasketItem[]) => {
        this.basketItems = items;
      },
      error => {
        console.log('Basket Items error: ' + error);
      }
    );
  }

  onCheckout()
  {
    const basket = this.basket;
    basket.isPaymentIntent = true; 
    
    this.basketService.updateBasket(basket);
    
    this.router.navigate(['/checkout']);
  }

  onRemoveBasketItem(basketItemId: string)
  {    
    this.basketService.deleteBasketItem(basketItemId);
  }
}
