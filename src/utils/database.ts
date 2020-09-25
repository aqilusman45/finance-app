import { createRxDatabase, addRxPlugin, RxDatabase, RxJsonSchema } from "rxdb";
import { IAttributeDocument } from "../lib/attributes";
import { MyDatabaseCollections } from "../lib/collections";
import { IProductDocument } from "../lib/products";
import { IUserDocument } from "../lib/users";
import { userSchema } from "../schema";
import { attributeSchema } from "../schema/attributes";
import { productSchema } from "../schema/products";
addRxPlugin(require("pouchdb-adapter-idb"));

let dbPromise: Promise<RxDatabase<MyDatabaseCollections>> | null = null;

const _create = async () => {
  const db = await createRxDatabase<MyDatabaseCollections>({
    name: "financeapp",
    adapter: "idb",
    password: process.env.REACT_APP_PASSWORD,
  });
  await createCollection(db, userSchema, 'users')
  await createCollection(db, productSchema, 'products')
  await createCollection(db, attributeSchema, 'attributes')
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

export const productsQuery = async () => {
  const db = await get();
  const { products } = db.collections;
  return products.find().exec()
};

export const insertProductMutation = async (product: IProductDocument) => {
  const db = await get();
  const { products } = db.collections;
  return products.insert({
    ...product
  })
};


export const insertAttributeMutation = async (attribute: IAttributeDocument) => {
  const db = await get();
  const { attributes } = db.collections;
  return attributes.insert({
    ...attribute
  })
};

export const attributesQuery = async () => {
  const db = await get();
  const { attributes } = db.collections;
  return attributes.find().exec()
};