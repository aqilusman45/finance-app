import { AttributeType } from "./enum";
import { RxDocument, RxCollection } from "rxdb";

export interface IAttribute {
  uid: string;
  attributeType: AttributeType;
  attributeName: {
    name: string;
    key: string;
  };
  required: boolean;
  options: IOption[];
}

export interface IOption {
  value: string;
  label: string;
}

export interface IAttributeDocument extends RxDocument<IAttribute> {}

export interface IAttributeCollection extends RxCollection<IAttributeDocument> {}
