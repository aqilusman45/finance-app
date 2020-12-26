import { RxCollection, RxDocument } from "rxdb";
import { AccountTypes } from "./enum";

export interface IAccount {
    uid: string;
    createdAt: number;
    updatedAt: number;
    name: string;
    email: string;
    phone: string;
    enabled: boolean;
    description: string;
    accountNumber: string;
    accountTitle: string;
    balance: number;
    accountType: {
        value: AccountTypes;
        label: string;
    };
}

export interface IAccountDocument extends RxDocument<IAccount> { }

export interface IAccountCollection extends RxCollection<IAccountDocument> { }
