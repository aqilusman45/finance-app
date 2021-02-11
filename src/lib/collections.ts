import { IProductCollection } from "./products";
import { IUserCollection } from "./users";
import { IAttributeCollection } from "./attributes";
import { IAccountCollection } from "./accounts";
import { IInvoiceCollection } from "./invoice";

export interface MyDatabaseCollections {
  users: IUserCollection;
  products: IProductCollection;
  attributes: IAttributeCollection;
  accounts: IAccountCollection;
  invoices: IInvoiceCollection
}
