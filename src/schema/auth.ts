import { RxJsonSchema } from "rxdb";

export const authSchema: RxJsonSchema = {
    title: "auth schema",
    version: 0,
    description: "user auth",
    type: "object",
    properties: {
      uid: {
        type: "string",
        primary: true,
      },
      email: {
        type: "string"
      },
      name: {
        type: "string",
      },
      phone: {
        type: "string",
      },
      password: {
        type: "string",
      },
      createdAt: {
        type: "number",
      },
      updatedAt: {
        type: "number",
      }
    },
    required: ["uid", "phone",],
  };
  
  