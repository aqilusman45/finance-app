import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RxDocument } from "rxdb";
import { AppThunk } from "..";
import { IProductDocument } from "../../lib/products";
import { insertProductMutation, productsQuery } from "../../utils/database";

interface IInitialState {
  products: IProductDocument[] | null;
  isLoading: boolean;
}
const INITIAL_STATE: IInitialState = {
  products: null,
  isLoading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState: { ...INITIAL_STATE },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    doneLoading: (state) => {
      state.isLoading = false;
    },
    getProducts: (state, action: PayloadAction<IProductDocument[]>) => {
      const products = action.payload;
      state.products = [...products];
      state.isLoading = false;
    },
    addProduct: (
      state,
      action: PayloadAction<RxDocument<IProductDocument, {}>>
    ) => {
      const product = action.payload;
      state.products?.unshift(product);
      state.isLoading = false;
    },
  },
});

export const {
  getProducts,
  doneLoading,
  startLoading,
  addProduct,
} = productsSlice.actions;

export default productsSlice.reducer;

export const fetchProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const docs = await productsQuery();
    dispatch(getProducts([...docs]));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const insertProduct = (product: IProductDocument): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(startLoading());
    const productRes = await insertProductMutation(product);
    dispatch(addProduct(productRes));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};
