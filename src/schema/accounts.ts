import { RxJsonSchema } from "rxdb";
import { AccountTypes } from "../lib/enum";

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
    address: {
      type: "string",
      default: "",
    },
    companyName: {
      type: "string",
      default: "",
    },
    phone: {
      type: "string",
    },
    enabled: {
      type: "boolean",
      default: true,
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
    balance: {
      type: "number",
    },
    accountType: {
      type: "object",
      properties: {
        value: {
          type: "string",
          enum: [
            AccountTypes.BANK,
            AccountTypes.CUSTOMER,
            AccountTypes.EXPENSES,
            AccountTypes.PURCHASE,
            AccountTypes.SALES,
            AccountTypes.CASH,
            AccountTypes.RECEIVABLE,
          ],
        },
        label: {
          type: "string",
        },
      },
    },
  },
  required: ["uid", "name", "phone", "balance", "accountType"],
};
