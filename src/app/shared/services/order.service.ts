import { Injectable } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IBasket, IBasketItem } from '../models/basket';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, Observable, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  currentBasket: IBasket;
  currentBasketItems: IBasketItem[];

  constructor(
    private basketService: BasketService,
    private firestore: AngularFirestore
  ) {}

  createOrder() {
    const basketId = localStorage.getItem('basket_id');

    const basket = this.firestore
      .collection('basket')
      .doc<IBasket>(basketId)
      .valueChanges();

    const basketItems = this.firestore
      .collection('basket')
      .doc(basketId)
      .collection<IBasketItem>('basketItems')
      .valueChanges();

    const combineItems = combineLatest(basket, basketItems);

    combineItems.subscribe(([basket, basketItems]) => {
      const orderId = this.firestore.createId();

      this.firestore
        .collection('order')
        .doc(orderId)
        .set(basket);

      basketItems.forEach(item => {
        this.firestore
          .collection('order')
          .doc(orderId)
          .collection('orderItems')
          .add(item);
      });
    });
  }
}
