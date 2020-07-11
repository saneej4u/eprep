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
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { OrderService } from '../shared/services/order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  paymentForm: FormGroup;

  constructor(
    private basketService: BasketService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.basketService
      .getCurrentBasket()
      .pipe(
        map(basket => {
          return {
            totalPrice: basket.payment.amount,
            currency: basket.currency,
            clientSecret: basket.payment.client_secret,
            paymentIntentId: basket.payment.id,
            isPaymentIntent: true
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
    //   basket => {
    //     this.basket = basket;
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

  createLoginForm() {
    this.paymentForm = new FormGroup({
      nameOnCard: new FormControl('', Validators.required)
    });
  }

  async submitOrder1() {
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

  async submitOrder()
  {
    this.loading = true;
    try {


      await this.orderService.createOrder2(this.basket, this.basketItems);

      const paymentResult = await this.confirmPaymentWithStripe(
        this.basket.clientSecret
      );

      if (paymentResult.paymentIntent && paymentResult.paymentIntent.status === 'succeeded')
      {
        this.basketService.deleteCurrentBasket();
        //const navigationExtras: NavigationExtras = { state: 'createdOrder'}
        this.router.navigate(['checkout/success']);
      }
      else
      {
        this.toastr.error(paymentResult.error.message);
      }

      this.loading = false;
    }
    catch (error) {
      console.log(error);
    }
  }

  private async confirmPaymentWithStripe(clientSecret: string) {
    return this.stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.paymentForm.get('nameOnCard').value
        }
      }
    });
  }

  async onDeleteOrder()
  {
    await this.orderService.deleteOrder('ncqSLYYsLYheVvzACSwt');
    console.log("Completed");
    
  }
}
