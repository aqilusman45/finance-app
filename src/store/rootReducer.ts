import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";
import attributesReducer from "./reducers/attributes";
import accountsReducer from "./reducers/accounts";
import invoiceReducer from "./reducers/invoices";
import entriesReducer from "./reducers/entries";
import usersReducer from "./reducers/user";
import authReducer from "./reducers/auth";
const rootReducer = combineReducers({
  products: productsReducer,
  attributes: attributesReducer,
  accounts: accountsReducer,
  invoices: invoiceReducer,
  entries: entriesReducer,
  users: usersReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
