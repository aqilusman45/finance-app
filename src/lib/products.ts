import { RxDocument, RxCollection } from "rxdb";

export interface IProduct {
  uid: string;
  name: string;
  quantity: number;
  SKU: string;
  price: string;
}

export interface IOption {
  value: string;
  label: string;
}

export interface IProductDocument extends RxDocument<IProduct> {}

export interface IProductCollection extends RxCollection<IProductDocument> {}
