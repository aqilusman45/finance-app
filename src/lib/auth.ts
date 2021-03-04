import { RxDocument, RxCollection } from "rxdb";

export interface IAuth {
    uid: string;
    name: string;
    email: string;
    token: string;
    createdAt: number;
  }
  
  export interface IAuthDocument extends RxDocument<IAuth> {}
  
  export interface IAuthCollection extends RxCollection<IAuthDocument> {}