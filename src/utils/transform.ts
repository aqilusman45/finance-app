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

export function transformProduct(doc: IProductDocument): IProduct {
  const {
    uid,
    name,
    quantity,
    sku,
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
    enabled,
    createdAt,
    updatedAt,
    price,
    attributes,
    images,
  };
}
