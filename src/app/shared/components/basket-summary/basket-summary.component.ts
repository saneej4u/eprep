import { Component, OnInit, Input } from '@angular/core';
import { IBasketItem } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  @Input() basketItems: IBasketItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
