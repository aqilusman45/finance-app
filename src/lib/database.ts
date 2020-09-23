import { RxDatabase } from "rxdb";
import { MyDatabaseCollections } from "./collections";

export interface MyDatabase extends RxDatabase<MyDatabaseCollections> {}
