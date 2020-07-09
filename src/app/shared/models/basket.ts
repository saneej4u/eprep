export interface IBasket {
  id?: string;
  createdOn?: any;
  totalPrice?: number;
  currency?: string;
  clientSecret?: string;
  isPaymentIntent?: boolean;
  paymentIntentId?: string;
}

export interface IBasketItem {
  id?: string;
  courseId?: string,
  courseTitle: string;
  courseDescription?: string;
  price?: number;
  instructorId?: string;
  instructorName?: string;
  pictureUrl?: string;
  courseAvailableFor?: number;
}