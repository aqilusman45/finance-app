import {
  createRxDatabase,
  addRxPlugin,
  RxDatabase,
  RxJsonSchema,
  RxDocument,
} from "rxdb";
import { IAttribute, IAttributeDocument } from "../lib/attributes";
import { MyDatabaseCollections } from "../lib/collections";
import { IImages, IProduct, IProductDocument } from "../lib/products";
import { IUserDocument } from "../lib/users";
import { userSchema } from "../schema";
import { attributeSchema } from "../schema/attributes";
import { productSchema } from "../schema/products";
import { RxDBEncryptionPlugin } from "rxdb/plugins/encryption";
import { RxDBValidatePlugin } from "rxdb/plugins/validate";
import { getFile } from "./files";
addRxPlugin(RxDBValidatePlugin);
addRxPlugin(RxDBEncryptionPlugin);
addRxPlugin(require("pouchdb-adapter-idb"));

let dbPromise: Promise<RxDatabase<MyDatabaseCollections>> | null = null;

const _create = async () => {
  const db = await createRxDatabase<MyDatabaseCollections>({
    name: "financeapp",
    adapter: "idb",
    password: process.env.REACT_APP_PASSWORD,
  });
  await createCollection(db, userSchema, "users");
  await createCollection(db, productSchema, "products");
  await createCollection(db, attributeSchema, "attributes");
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

export const createBackup = async () => {
  const db = await get();
  const dump = await db.dump();
  dump.collections.forEach((collection, idx) => {
    const { name, docs } = collection;
    if (name === "products") {
      docs.map(async (doc: any, index) => {
        const { images, uid } = doc;
        const rxDoc = await findProduct(uid);
        const imagesWithBase64 = await Promise.all(
          images.map(async ({ name }: { name: string }) => {
            const base64 = await (
              await getAttatchment(rxDoc, name)
            )?.getStringData();
            return {
              name,
              base64,
            };
          })
        );
        // @ts-ignore
        dump.collections[idx].docs[index].images = imagesWithBase64;
      });
    }
  });
  return dump;
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
  return products.find().exec();
};

export const findProduct = async (uid: string) => {
  const db = await get();
  const { products } = db.collections;
  return products.findOne().where("uid").eq(uid).exec();
};

export const insertProductMutation = async (product: IProductDocument) => {
  const db = await get();
  const { products } = db.collections;
  return products.insert({
    ...product,
  });
};

export const insertAttributeMutation = async (
  attribute: IAttributeDocument
) => {
  const db = await get();
  const { attributes } = db.collections;
  return attributes.insert({
    ...attribute,
  });
};

export const attributesQuery = async () => {
  const db = await get();
  const { attributes } = db.collections;
  return attributes.find().exec();
};

export const getAttatchment = async <T>(
  doc: RxDocument<T, {}> | null,
  fileName: string
) => {
  return doc?.getAttachment(fileName);
};

export const getProductAttatchments = async ({ uid, images }: IProduct) => {
  const rxDoc = await findProduct(uid);
  const imagesWithBase64 = await Promise.all(
    images.map(async ({ name, type }: IImages) => {
      const base64 = await getFile(rxDoc?.uid || "", name)
      console.log(base64);
      return {
        name,
        base64,
        type
      };
    })
  );
  return imagesWithBase64;
};

export const updateAttributeMutation = async (attribute: IAttribute) => {
  const db = await get();
  const { attributes } = db.collections;
  const attr = await attributes.findOne().where('uid').eq(attribute.uid).exec()
  await attr?.atomicUpdate((oldData) => {
    oldData.options = attribute.options
    oldData.updatedAt = attribute.updatedAt
    return oldData
  })
};
