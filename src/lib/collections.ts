import { IProductCollection } from "./products";
import { IUserCollection } from "./users";
import { IAttributeCollection } from "./attributes";

export interface MyDatabaseCollections {
  users: IUserCollection;
  products: IProductCollection;
  attributes: IAttributeCollection;
}
