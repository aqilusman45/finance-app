import { RxJsonSchema } from "rxdb";
import { PaymentOptions } from "../lib/enum";

export const invoiceSchema: RxJsonSchema = {
  title: "invoice schema",
  version: 0,
  description: "invoice accounts",
  type: "object",
  properties: {
    uid: {
      type: "string",
      primary: true,
    },
    invoiceNumber: {
      type: "string"
    },
    date: {
      type: "number"
    },
    paymentOption: {
      type: "object",
      properties: {
        value: {
          type: "string",
          enum: [PaymentOptions.BANK, PaymentOptions.CASH, PaymentOptions.CHEQUE]
        },
        label: {
          type: "string",
        }
      },
    },
    detail: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        companyName: {
          type: "string"
        },
        shippingAddress: {
          type: "string"
        },
        phone: {
          type: "string",
        },
        address: {
          type: "string"
        },
        email: {
          type: "string"
        }
      },
    },
    products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          product: {
            type: "string",
            ref: "products"
          },
          name: {
            type: "string"
          },
          quantity: {
            type: "number",
          },
          unitPrice: {
            type: "number"
          },
          discount: {
            type: "number"
          }
        }
      }
    },
    totalDiscount: {
      type: "number"
    },
    subTotal: {
      type: "number"
    },
    taxRate: {
      type: "number"
    },
    shipping: {
      type: "number"
    },
    currentBalance: {
      type: "number"
    },
    total: {
      type: "number",
    },
    remarks: {
      type: "string"
    },
    accountRef: {
      type: "string",
      ref: "accounts",
    },
    createdAt: {
      type: "number",
    },
    updatedAt: {
      type: "number",
    }
  },
  required: ["uid", "invoiceNumber", "paymentOption", "accountRef"],
};


