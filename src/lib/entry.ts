import { RxCollection, RxDocument } from "rxdb";
import { PaymentOptions, EntryTypes } from "./enum";

export interface IEntry {
  uid: string;
  date: number;
  paymentOption: {
    value: PaymentOptions;
    label: string;
  };
  entryType: {
    value: EntryTypes;
    label: string;
  };
  accountRef: string;
  invoiceRef: string;
  createdAt: number;
  updatedAt: number;
  detail: {
    name: string;
    phone: string;
    email: string;
  };
  entries: {
    payableAmount: number;
    receivableAmount: number;
    remainingAmount: number;
    date: number;
  };
}

export interface IEntryDocument extends RxDocument<IEntry> {}
export interface IEntryCollection extends RxCollection<IEntryDocument> {}
