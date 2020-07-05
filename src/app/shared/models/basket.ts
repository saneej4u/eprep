export interface IBasket {
  id?: string;
  createdOn?: string;
  expiresAt?: string;
  amount?: number;
  currency?: string;

  clientSecret?: string;
  isPaymentIntent?: boolean;
  paymentIntentId?: string;

  totalPrice?: number;
}

export interface IBasketItem {
  id?: string;
  courseId?: string,
  courseName: string;
  courseDescription?: string;
  price: number;
  instructorName: string;
  pictureUrl: string;
}