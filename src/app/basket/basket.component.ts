import { Component, OnInit } from '@angular/core';
import { IBasketItem, IBasket } from '../shared/models/basket';
import { BasketService } from './basket.service';
import { Router } from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basketItems: IBasketItem[];
  basket: IBasket;
  isMobile: boolean;

  constructor(private basketService: BasketService, private router: Router, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {

    

    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
        
      }
      else
      {
        this.isMobile = false;
      }
      console.log("Is Mobile" + this.isMobile);
    });

    this.basketService.getCurrentBasket().subscribe(
      (basket: IBasketItem) => {
        this.basket = basket;

        console.log("Basket: " + JSON.stringify(basket));
        
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
    this.router.navigate(['/checkout']);
  }

  onRemoveBasketItem(basketItemId: string)
  {    
    this.basketService.deleteBasketItem(basketItemId);
  }
}
