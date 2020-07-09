import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, merge } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { IBasketItem, IBasket } from '../shared/models/basket';
import { ICourse } from '../shared/models/course';
import { HelperService } from '../shared/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketSource = new BehaviorSubject<IBasket>(null);

  basketItemsSource$ = new BehaviorSubject<IBasketItem[]>(null);

  basketCountSource$ = new BehaviorSubject<number>(0);

  private basketTotalSourse = new BehaviorSubject<number>(0);
  basketTotal$ = this.basketTotalSourse.asObservable();

  basket$ = this.basketSource.asObservable();
  currentBasket: IBasket;

  tBasket: number;

  constructor(
    private firestore: AngularFirestore,
    private helperService: HelperService
  ) {}

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
    this.firestore
      .collection('basket')
      .doc(basketId)
      .collection('basketItems')
      .doc(basketItemId)
      .delete();

    this.firestore
      .collection('basket')
      .doc(basketId)
      .collection<IBasketItem>('basketItems')
      .valueChanges()
      .subscribe(basketItems => {
        this.basketItemsSource$.next(basketItems);
        this.basketCountSource$.next(basketItems.length);
        this.updaateTotalPricev2();
      });
  }

  deleteCurrentBasket() {
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

  getBasketItems(): Observable<IBasketItem[]> {
    const basketId = localStorage.getItem('basket_id');

    if (basketId) {
      return this.firestore
        .collection<IBasket>('basket')
        .doc(basketId)
        .collection<IBasketItem>('basketItems')
        .valueChanges({ idField: 'id' });
    }
    return of(null);
  }

  // addItemToBasketV2(course: ICourse, quantity = 1) {
  //   this.getCurrentBasket().subscribe(
  //     result => {
  //       this.currentBasket = result;

  //       if (this.currentBasket == null) {
  //         this.currentBasket = this.createBasket();
  //       }

  //       const itemsToAdd: IBasketItem = this.mapCourseItemToBasketItem(course);
  //       const basketId = localStorage.getItem('basket_id');
  //       this.firestore
  //         .collection('basket')
  //         .doc(basketId)
  //         .collection('basketItems')
  //         .add(itemsToAdd);

  //       const totalprice = this.currentBasket.totalPrice + course.Price;
  //       this.tBasket = totalprice;

  //       console.log('Total Price: ' + totalprice);

  //       this.basketTotalSourse.next(totalprice);
  //     },
  //     error => {
  //       console.log('Error');
  //     },
  //     () => {
  //       console.log('Update Basket - product');
  //     }
  //   );
  // }

  createBasket(): IBasket {
    const basketId = this.firestore.createId();

    console.log(
      ' Current time: basket: ' + this.helperService.getCurrentTime()
    );

    const basket = {
      createdOn: this.helperService.getCurrentTime(),
      totalPrice: 0
    };

    console.log(' Basket ' + basket.totalPrice);

    this.firestore
      .collection('basket')
      .doc(basketId)
      .set(basket);

    localStorage.setItem('basket_id', basketId);

    return {
      id: basketId,
      createdOn: basket.createdOn,
      totalPrice: basket.totalPrice
    };
  }

  findTotalPrice(basketItems: IBasketItem[]): number {
    let totalPrice = 0;

    basketItems.forEach(x => {
      totalPrice = totalPrice + x.price;
    });

    return totalPrice;
  }

  updateBasketTotal(amout: number) {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.firestore
        .collection('basket')
        .doc(basketId)
        .update({ totalPrice: amout });

      //.set({ totalPrice: amout }, { merge: true });
    }
  }

  mapCourseItemToBasketItem(course: ICourse): IBasketItem {
    return {
      courseId: course.Id,
      courseTitle: course.Title,
      price: course.Price,
      pictureUrl: course.Thumbnail,
      instructorName: course.InstructorName,
      courseAvailableFor: course.RentInDays
    };
  }

  addItemToBasket(course: ICourse, quantity = 1) {
    let basketId = localStorage.getItem('basket_id');

    if (basketId == null) {
      basketId = this.firestore.createId();

      this.firestore
        .collection('basket')
        .doc(basketId)
        .set({ totalPrice: course.Price, createdOn: this.helperService.getCurrentTime() }, { merge: true });

      localStorage.setItem('basket_id', basketId);
    }

    const itemsToAdd: IBasketItem = this.mapCourseItemToBasketItem(course);

    this.firestore
      .collection('basket')
      .doc(basketId)
      .collection('basketItems')
      .add(itemsToAdd);

    this.firestore
      .collection('basket')
      .doc(basketId)
      .collection<IBasketItem>('basketItems')
      .valueChanges()
      .subscribe(basketItems => {
        this.basketItemsSource$.next(basketItems);
        this.basketCountSource$.next(basketItems.length);
        this.updaateTotalPricev2();
      });
  }

  updaateTotalPricev2() {
    const basketItems = this.basketItemsSource$.value;
    if (basketItems) {
      const subtotal = basketItems.reduce((a, b) => b.price * 1 + a, 0);

      const basketId = localStorage.getItem('basket_id');
      this.firestore
        .collection('basket')
        .doc(basketId)
        .set({ totalPrice: subtotal }, { merge: true });
    }
  }

  private calculateTotals() {
    const basketItems = this.basketItemsSource$.value;

    const subtotal = basketItems.reduce((a, b) => b.price * 1 + a, 0);

    this.basketTotalSourse.next(subtotal);
  }
}
