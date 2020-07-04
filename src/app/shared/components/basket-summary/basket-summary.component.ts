import { Component, OnInit, Input } from '@angular/core';
import { IBasketItem, IBasket } from '../../models/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  @Input() basketItems: IBasketItem[];
  @Input() basket: IBasket;

  subTotal: number;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {


    // this.basketService.basketTotal$.subscribe(x => {
    //   this.subTotal = x;
    // });

  }
}
