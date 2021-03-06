import { RxDocument, RxCollection } from "rxdb";

export interface IUser {
  uid: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

export interface IUserDocument extends RxDocument<IUser> {}

export interface IUserCollection extends RxCollection<IUserDocument> {}
