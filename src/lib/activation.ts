import { RxCollection, RxDocument } from "rxdb";

export interface IActivation {
    uid: string;
    createdAt: number;
    updatedAt: number;
    activated: boolean;
}

export interface IActivationDocument extends RxDocument<IActivation> { }

export interface IActivationCollection extends RxCollection<IActivation> { }
