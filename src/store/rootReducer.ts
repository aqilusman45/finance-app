import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";
import attributesReducer from "./reducers/attributes";
import accountsReducer from "./reducers/accounts";
import invoiceReducer from "./reducers/invoices";
const rootReducer = combineReducers({
  products: productsReducer,
  attributes: attributesReducer,
  accounts: accountsReducer,
  invoices: invoiceReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
