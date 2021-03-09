import * as yup from "yup";
import { IAttribute } from "../lib/attributes";

export const productSchema = yup.object().shape({
  cost: yup.number().moreThan(0).required(),
  price: yup.number().moreThan(0).required(),
  description: yup.string(),
  name: yup.string().required(),
  quantity: yup.number().required(),
  sku: yup.string().required(),
});

export const productAttributesCheck = async (
  attributes: IAttribute[] | null,
  values: {
    attributeRef: IAttribute["uid"];
    options: IAttribute["options"];
  }[]
) => {
  if (!attributes) return;
  const errors = attributes
    .map(({ uid, required, attributeName }) => {
      if (
        required &&
        !values.some(({ attributeRef }) => attributeRef === uid)
      ) {
        return {
          message: `${attributeName.name} is a required field`,
        };
      }
      return null;
    })
    .filter((node) => node);
  if (errors.length > 0) {
    throw errors[0];
  }
};

export const accountSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  phone: yup.string().required(),
  address: yup.string(),
  companyName: yup.string(),
  accountNumber: yup.string(),
  accountTitle: yup.string(),
  balance: yup.number().required(),
  description: yup.string(),
});

export const addEntrySchema = yup.object().shape({
  name: yup.string().required("Please Select a User"),
});

export const accountTypeCheck = async (invoice: any) => {
  if (!invoice) return;
  if (!invoice.paymentOption.value) {
    throw new Error(`Payment Option is a required field`);
  }
};

export const checkProduct = async (invoice: any) => {
  if (!invoice) return;
  let prod = invoice.products;
  prod.forEach((item: any, idx: number) => {
    if (!item.name.length || item.quantity < 1) {
      throw new Error(
        `Please Select at Least 1 Product with atleast 1 Quantity at line ${
          idx + 1
        }`
      );
    } else if (item.discount > 100 || item.discount < 0) {
      throw new Error(`Discount between 0 and 100 at line${idx + 1}`);
    }
  });
};

export const invoiceSchema = async (invoice: any) => {
  if (!invoice) return;
  if (invoice.taxRate > 99 || invoice.taxRate < 0) {
    throw new Error(`Tax between 0 and 99`);
  }
}

export const signUpSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  password: yup.string().required("Password must be atleast 6 characters!"),
});

export const authenticateUser = () => {
  throw new Error(`Incorrect email or password!`);
};

export const checkDuplication = () => {
  throw new Error(`A user with that Email or Phone already exists!`);
};

export const signInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const checkExistedUser = () => {
  throw new Error(`If you are new user please sign up first!`);
};