import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";
import attributesReducer from "./reducers/attributes";


const rootReducer = combineReducers({
  products: productsReducer,
  attributes: attributesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
