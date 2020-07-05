import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IBasketItem, IBasket } from '../shared/models/basket';
import { BasketService } from '../basket/basket.service';
import { AccountService } from '../account/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { OrderService } from '../shared/services/order.service';

declare var Stripe;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {
  basketItems: IBasketItem[];
  basket: IBasket;

  @ViewChild('cardNumber', { static: true }) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement: ElementRef;

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

  constructor(
    private basketService: BasketService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.basketService
      .getCurrentBasket()
      .pipe(
        map(basket => {
          console.log(
            'basket.payment.client_seceret: ' +
              JSON.stringify(basket.payment.client_secret)
          );

          return {
            amount: basket.amount,
            currency: basket.currency,
            clientSecret: basket.payment.client_secret
          };
        })
      )
      .subscribe(
        result => {
          this.basket = result;
        },
        error => {}
      );

    // this.basketService.getCurrentBasket().subscribe(
    //   (basket) => {

    //     this.basket = basket;
    //     console.log("Current Basket: " + JSON.stringify(basket));
    //     console.log("This Current Basket: " + JSON.stringify(this.basket));
    //   },
    //   error => {
    //     console.log('Basket error: ' + error);
    //   }
    // );

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

  async submitOrder() {

    //TODO: Revert below chnages
    // try {
    //   const paymentResult = await this.confirmPaymentWithStripe(this.basket);
    //   if (paymentResult.paymentIntent) {
    //     this.router.navigate(['checkout/success']);
    //   } else {
    //     this.toastr.error(paymentResult.error.message);
    //   }
    //   this.loading = false;
    // } catch (error) {
    //   console.log(error);
    //   this.loading = false;
    // }

    this.orderService.createOrder();
  }

  private async confirmPaymentWithStripe(basket: IBasket) {
    return this.stripe.confirmCardPayment(basket.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: 'Sunny'
        }
      }
    });
  }
}
