import { IAccount, IAccountDocument } from "../lib/accounts";
import { IAttribute, IAttributeDocument } from "../lib/attributes";
import { IProduct, IProductDocument } from "../lib/products";
import { IInvoice, IInvoiceDocument } from "../lib/invoice";
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

export function transformInvoice(doc: IInvoiceDocument): IInvoice {
  return {
    ...doc._data
  }
}

export function transformInvoices(doc: IInvoiceDocument[]): IInvoice[] {
  return doc.map((node) => transformInvoice(node));
}

export function transformAccounts(doc: IAccountDocument[]): IAccount[] {
  return doc.map((node) => transformAccount(node));
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
