import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "..";
import { IProductDocument } from "../../lib/products";
import { productsQuery } from "../../utils/database";

interface IInitialState {
  products: IProductDocument[];
  isLoading: boolean;
}
const INITIAL_STATE: IInitialState = {
  products: [],
  isLoading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState: { ...INITIAL_STATE },
  reducers: {
    fetching: (state) => {
      state.isLoading = true;
    },
    doneFetching: (state) => {
      state.isLoading = false;
    },
    getProducts: (state, action: PayloadAction<IProductDocument[]>) => {
      const products = action.payload;
      state.products = [...products];
      state.isLoading = false;
    },
  },
});

export const { getProducts, fetching, doneFetching } = productsSlice.actions;

export default productsSlice.reducer;

export const fetchProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetching());
    const docs = await productsQuery();
    dispatch(getProducts([...docs]));
    dispatch(doneFetching());
  } catch (error) {
    throw error;
  }
};
