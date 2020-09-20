import { createRxDatabase, addRxPlugin } from "rxdb";
addRxPlugin(require("pouchdb-adapter-node-websql"));

export const initDB = async () => {
  try {
    const db = await createRxDatabase({
      name: `db`,
      adapter: "websql", // the name of your adapter
    });
    const dbdump = await db.dump();
    console.log(dbdump)
    return db
  } catch (error) {
    console.log(error);
  }
};
