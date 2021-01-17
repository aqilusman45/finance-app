import { RxJsonSchema } from "rxdb";

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
        productName: {
            
        }
    }
}