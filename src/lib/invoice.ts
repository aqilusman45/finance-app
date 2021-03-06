import { RxCollection, RxDocument } from "rxdb";
import { AccountTypes } from "./enum";
interface IProducts  {
    product: string
    name: string
    quantity: number;
    unitPrice: number;
    discount: number;

}

export interface IInvoice {
  uid: string;
  invoiceNumber: string;
  date: string;
  paymentOption: {
    value: AccountTypes;
    label: string;
  };
  detail: {
    name: string;
    companyName: string;
    shippingAddress: string;
    phone: string;
    address: string;
    email: string;
  };
  products: IProducts[];
  totalDiscount: number;
  subTotal: number;
  taxRate: number;
  shipping: number;
  currentBalance: number;
  total: number;
  remarks: string;
  accountRef: string;
  createdAt: number;
  updatedAt: number;
  quantity: number;
}


export interface IInvoiceDocument extends RxDocument<IInvoice> {}
export interface IInvoiceCollection extends RxCollection<IInvoiceDocument> {}
