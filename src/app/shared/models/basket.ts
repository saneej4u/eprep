export interface IBasket {
  id?: string;
  createdOn?: string;
  expiresAt?: string;
  isPaymentIntent?: boolean;
  paymentIntentId?: string;
}

export interface IBasketItem {
  id?: string;
  courseName: string;
  courseDescription?: string;
  price: number;
  instructorName: string;
  pictureUrl: string;
}