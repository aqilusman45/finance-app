import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "..";
import { IImages, IProduct, IProductDocument } from "../../lib/products";
import {
  insertProductMutation,
  productsQuery,
  updateProductMutation,
} from "../../utils/database";
import { transformProduct } from "../../utils/transform";

interface IInitialState {
  products: IProduct[] | null;
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
    getProducts: (state, action: PayloadAction<IProduct[]>) => {
      const products = action.payload;
      state.products = [...products];
      state.isLoading = false;
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;
      state.products?.unshift(product);
      state.isLoading = false;
    },
    updateProduct: (state, action: PayloadAction<IProductDocument>) => {
      const product = action.payload;
      state.products?.forEach((item, idx) => {
        if (item.uid === product.uid && state.products) {
          state.products[idx] = product;
        }
      });
      return state;
    },
  },
});

export const {
  getProducts,
  doneLoading,
  startLoading,
  addProduct,
  updateProduct,
} = productsSlice.actions;

export default productsSlice.reducer;

export const fetchProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const docs = await productsQuery();
    const deserialized = docs.map((attr) => transformProduct(attr));
    dispatch(getProducts([...deserialized]));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const insertProduct = (
  product: IProductDocument,
  images: IImages[],
  cb: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const doc = await insertProductMutation(product);
    images.forEach(async ({ base64, name, type }) => {
      await doc.putAttachment({
        data: base64,
        id: name,
        type,
      });
    });
    dispatch(addProduct(product));
    cb();
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const updateProductAsync = (
  product: IProductDocument,
  images?: IImages[],
  cb?: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const doc: any = await updateProductMutation(product);
    images &&
      images.forEach(async ({ base64, name, type }) => {
        await doc.putAttachment({
          data: base64,
          id: name,
          type,
        });
      });
    dispatch(updateProduct(product));
    cb && cb();
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};
