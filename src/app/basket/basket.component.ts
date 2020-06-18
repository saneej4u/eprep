import { Component, OnInit } from '@angular/core';
import { IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basketItems: IBasketItem[];
  constructor(private basketService: BasketService) {}

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
