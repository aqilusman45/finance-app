import { RxJsonSchema } from "rxdb";
import { PaymentOptions } from "../lib/enum";

export const LedgerSchema: RxJsonSchema = {
  title: "ledger shcema",
  version: 0,
  description: "ledger",
  type: "object",
  properties: {
    uid: {
      type: "string",
      primary: true,
    },
    date: {
      type: "number",
    },
    accountRef: {
      type: "string",
      ref: "accounts",
    },
    invoiceRef: {
      type: "string",
      ref: "invoices",
    },
    createdAt: {
      type: "number",
    },
    updatedAt: {
      type: "number",
    },
    detail: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        phone: {
          type: "string",
        },
        email: {
          type: "string",
        },
      },
    },
    entries: {
      type: "array",
      items: {
        type: "object",
        properties: {
          payableAmount: {
            type: "number",
          },
          receivableAmount: {
            type: "number",
          },
          remainingAmount: {
            type: "number",
          },
          date: {
            type: "number",
          },
        },
      },
    },
  },
};
