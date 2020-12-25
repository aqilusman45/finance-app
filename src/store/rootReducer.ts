import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";
import attributesReducer from "./reducers/attributes";
import accountsReducer from "./reducers/accounts";

const rootReducer = combineReducers({
  products: productsReducer,
  attributes: attributesReducer,
  accounts: accountsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
