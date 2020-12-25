import { IAccount, IAccountDocument } from "../lib/accounts";
import { IAttribute, IAttributeDocument } from "../lib/attributes";
import { IProduct, IProductDocument } from "../lib/products";

export function transformAttribute(doc: IAttributeDocument): IAttribute {
  const {
    attributeName,
    attributeType,
    uid,
    required,
    options,
    createdAt,
    updatedAt,
  } = doc;

  return {
    uid,
    attributeName,
    attributeType,
    required,
    createdAt,
    updatedAt,
    options,
  };
}

export function transformAccount(doc: IAccountDocument): IAccount {
  return {
    ...doc._data
  }
}

export function transformProduct(doc: IProductDocument): IProduct {
  const {
    uid,
    name,
    quantity,
    sku,
    cost,
    createdAt,
    updatedAt,
    description,
    enabled,
    price,
    attributes,
    images,
  } = doc;

  return {
    uid,
    name,
    quantity,
    sku,
    description,
    cost,
    enabled,
    createdAt,
    updatedAt,
    price,
    attributes,
    images,
  };
}
