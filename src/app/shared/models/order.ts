export interface IOrder {
    id?: string;
    userId?: string;
    createdOn?: any;
    totalPrice?: number;
    currency?: string;
    paymentIntentId?: string;
  }