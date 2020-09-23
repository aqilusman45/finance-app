import { createRxDatabase, addRxPlugin, RxDatabase, RxJsonSchema } from "rxdb";
import { MyDatabaseCollections } from "../lib/collections";
import { IUserDocument } from "../lib/users";
import { userSchema } from "../schema";
addRxPlugin(require("pouchdb-adapter-idb"));

let dbPromise: Promise<RxDatabase<MyDatabaseCollections>> | null = null;

const _create = async () => {
  const db = await createRxDatabase<MyDatabaseCollections>({
    name: "financeapp",
    adapter: "idb",
    password: process.env.REACT_APP_PASSWORD,
  });
  await createCollection(db, userSchema, 'users')
  return db;
};

export const get = () => {
  if (!dbPromise) dbPromise = _create();
  return dbPromise;
};

const createCollection = async (
  db: RxDatabase<MyDatabaseCollections>,
  schema: RxJsonSchema,
  name: string
) => {
  return db.collection({
    name,
    schema,
  });
};

export const dump = async () => {
  const db = await get();
  return db.dump();
};

export const addUser = async (user: IUserDocument) => {
  const db = await get();
  const { users } = db.collections;
  return users.insert({
    ...user,
  });
};
