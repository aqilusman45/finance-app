import { RxJsonSchema } from "rxdb";
import { PaymentOptions, EntryTypes } from "../lib/enum";

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
    paymentOption: {
      type: "object",
      properties: {
        value: {
          type: "string",
          enum: [
            PaymentOptions.BANK,
            PaymentOptions.CASH,
            PaymentOptions.CHEQUE,
          ],
        },
        label: {
          type: "string",
        },
      },
    },
    entryType: {
      type: "object",
      properties: {
        value: {
          type: "string",
          enum: [
            EntryTypes.DEBIT,
            EntryTypes.CREDIT,
          ],
        },
        label: {
          type: "string",
        },
      },
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
  required: ["uid", "accountRef", "invoiceRef", "paymentOption", "entryType"],
};
