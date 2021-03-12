import { RxJsonSchema } from "rxdb";
import { PaymentOptions, EntryTypes } from "../lib/enum";

export const entrySchema: RxJsonSchema = {
  title: "ledger schema",
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
            PaymentOptions.PARTIAL,
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
    amount: {
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
    }
  },
  required: ["uid", "accountRef",],
};
