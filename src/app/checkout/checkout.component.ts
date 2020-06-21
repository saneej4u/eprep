import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IBasketItem } from '../shared/models/basket';
import { BasketService } from '../basket/basket.service';
import { AccountService } from '../account/account.service';

declare var Stripe;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {


  basketItems: IBasketItem[];
  @ViewChild('cardNumber', {static: true}) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', {static: true}) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', {static: true}) cardCvcElement: ElementRef;
  
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;

  constructor(private basketService: BasketService, private afAuth: AngularFireAuth, private accountService: AccountService) {}

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

  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_5mAJP8i1P6dbIEt72vIO2BLs');
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  onChange(event) {
    if (event.error) {
      this.cardErrors = event.error.message;
    } else {
      this.cardErrors = null;
    }
    switch (event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;
    }
  }
}
