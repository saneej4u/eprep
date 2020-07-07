import { Injectable } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IBasket, IBasketItem } from '../models/basket';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, Observable, combineLatest } from 'rxjs';
import { IOrderItem, IMycourses } from '../models/order-items';

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

      basketItems.forEach((item: IBasketItem) => {
        const token = localStorage.getItem('token');

        const orderItem: IOrderItem = {
          courseId: item.courseId,
          userId: token,
          courseName: item.courseName,
          //courseDescription: item.courseDescription,
          price: item.price,
          pictureUrl: item.pictureUrl,
          instructorName: item.instructorName
        };

        this.firestore
          .collection('order')
          .doc(orderId)
          .collection('orderItems')
          .add(orderItem);

        const myCourses: IMycourses = {
          courseId: orderItem.courseId,
          courseName: orderItem.courseName,
          pictureUrl: item.pictureUrl,
          instructorName: item.instructorName
        };

        this.firestore
          .collection('userProfile')
          .doc(token)
          .collection('mycourses')
          .add(myCourses);
      });

      //TODO: Take payment

      //if payment succeded, then move order to user profile
    });
  }
}
