import { RxJsonSchema } from "rxdb";

export const userAccountsSchema: RxJsonSchema = {
  title: "user accounts schema",
  version: 0,
  description: "user accounts",
  type: "object",
  properties: {
    uid: {
      type: "string",
      primary: true,
    },
    createdAt: {
      type: "number",
    },
    updatedAt: {
      type: "number",
    },
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    description: {
      type: "string",
    },
    accountNumber: {
      type: "string",
    },
    accountTitle: {
      type: "string",
    },
    balance:  {
      type: "number",
    },
    accountType: {
      type: "string",
      enum: ["SALES", "PURCHASE", "BANK", "EXPENSES"]
    }
  },
  required: ["uid", "name", "email", "phone", "description", "balance", "accountType"],
};
