import { IAttribute, IAttributeDocument } from "../lib/attributes";

export function transformAttribute(doc: IAttributeDocument): IAttribute {
  const { attributeName, attributeType, uid, required, options } = doc;

  return {
    uid,
    attributeName,
    attributeType,
    required,
    options,
  };
}
