import { RxDocument, RxCollection } from "rxdb";

export interface IUser {
  uid: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserDocument extends RxDocument<IUser> {}

export interface IUserCollection extends RxCollection<IUserDocument> {}
