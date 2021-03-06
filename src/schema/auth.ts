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
      createdAt: {
        type: "number",
      },
      name: {
        type: "string",
      },
      email: {
        type: "string",
      },
      token: {
        type: "string",
      },
    },
    required: ["uid", "name", "token", "email"],
  };
  