import { IProductCollection } from "./products";
import { IUserCollection } from "./users";

export interface MyDatabaseCollections {
  users: IUserCollection;
  products: IProductCollection;
}
