import { Injectable } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IBasket, IBasketItem } from '../models/basket';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, Observable, combineLatest } from 'rxjs';
import { IOrderItem, IMycourses } from '../models/order-items';
import { IOrder } from '../models/order';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  currentBasket: IBasket;
  currentBasketItems: IBasketItem[];

  constructor(
    private basketService: BasketService,
    private firestore: AngularFirestore,
    private helperService: HelperService
  ) {}

  createOrder() {
    const token = localStorage.getItem('token');
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

      const order: IOrder = {
        userId: token,
        createdOn: this.helperService.getCurrentTime(),
        paymentIntentId: basket.paymentIntentId,
        totalPrice: basket.totalPrice,
        currency: basket.currency
      };

      this.firestore
        .collection('order')
        .doc(orderId)
        .set(order);

      basketItems.forEach((item: IBasketItem) => {
       

        const orderItem: IOrderItem = {
          courseId: item.courseId,
          userId: token,
          courseTitle: item.courseTitle,
          courseDescription: item.courseDescription,
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
          courseName: orderItem.courseTitle,
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
