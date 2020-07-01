import { Component, OnInit, Input } from '@angular/core';
import { IBasketItem, IBasket } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  @Input() basketItems: IBasketItem[];
  @Input() basket: IBasket;

  constructor() { }

  ngOnInit(): void {

    console.log("Basket Summary :" + JSON.stringify(this.basketItems));
    
  }

}
