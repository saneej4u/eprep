import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { IBasketItem, IBasket } from '../shared/models/basket';
import { ICourse } from '../shared/models/course';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketSource = new BehaviorSubject<IBasket>(null);

  basket$ = this.basketSource.asObservable();
  currentBasket: IBasket;

  constructor(private firestore: AngularFirestore) {}

  // getBasket(id: string) {
  //   return this.firestore
  //     .collection('basket')
  //     .doc(id)
  //     .valueChanges()
  //     .pipe(
  //       map((basket: IBasket) => {
  //         this.basketSource.next(basket);
  //       })
  //     );
  // }

  setBasket(basket: IBasket) {
    return this.firestore
      .collection('basket')
      .doc(basket.id)
      .update(basket);
  }

  updateBasket(basket: IBasket) {
    const basketId = localStorage.getItem('basket_id');
    this.firestore.doc('basket/' + basketId).update(basket);
  }

  deleteBasketItem(basketItemId: string) {
    const basketId = localStorage.getItem('basket_id');
    this.firestore.collection('basket').doc(basketId).collection('basketItems').doc(basketItemId).delete();
    
  }

  deleteCurrentBasket(basketItemId: string) {
    const basketId = localStorage.getItem('basket_id');
    
  }

  getCurrentBasket(): Observable<any> {
    const basketId = localStorage.getItem('basket_id');

    if (basketId != null) {
      return this.firestore
        .collection('basket')
        .doc<any>(basketId)
        .valueChanges();
    }

    return of(null);
  }

  getBasketItems(): Observable<IBasketItem[]>
  {
    const basketId = localStorage.getItem('basket_id');
    return this.firestore
    .collection<IBasket>('basket')
    .doc(basketId)
    .collection<IBasketItem>('basketItems')
    .valueChanges({ idField: 'id' });
  }

  addItemToBasket(course: ICourse, quantity = 1) {
    this.getCurrentBasket().subscribe(
      result => {
        this.currentBasket = result;

        if (this.currentBasket == null) {
          this.currentBasket = this.createBasket();
        }

        const itemsToAdd: IBasketItem = this.mapCourseItemToBasketItem(course);
        const basketId = localStorage.getItem('basket_id');
        this.firestore
          .collection('basket')
          .doc(basketId)
          .collection('basketItems')
          .add(itemsToAdd);
      },
      error => {
        console.log('Error');
      }
    );
  }

  createBasket(): IBasket {
    const basketId = this.firestore.createId();

    var basket = {
      createdOn: 'created On',
      expiresAt: 'expires at'
    };

    this.firestore
      .collection('basket')
      .doc(basketId)
      .set(basket);

    localStorage.setItem('basket_id', basketId);

    return {
      id: basketId,
      createdOn: basket.createdOn,
      expiresAt: basket.expiresAt
    };
  }

  mapCourseItemToBasketItem(course: ICourse): IBasketItem {
    return {
      courseName: course.Title,
      price: course.Price,
      pictureUrl: course.Thumbnail,
      instructorName: course.InstructorName
    };
  }
}
