import { RxDocument, RxCollection } from "rxdb";

export interface IProduct {
  uid: string;
  name: string;
  quantity: number;
  sku: string;
  description: string;
  cost : number;
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
  price: string;
  attributes: IProductAttributes[];
  images: IImages[];
}

export interface IImages {
  base64: string;
  name: string;
  type: string;
}
export interface IProductAttributes {
  attributeRef: string;
  options: IOption[];
}

export interface IOption {
  value: string;
  label: string;
}

export interface IProductDocument extends RxDocument<IProduct> {}

export interface IProductCollection extends RxCollection<IProductDocument> {}
