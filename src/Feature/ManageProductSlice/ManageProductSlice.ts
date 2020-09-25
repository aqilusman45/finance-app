import { createSlice } from "@reduxjs/toolkit";

export const ManageProductsSlice = createSlice({
  name: "productData",
  initialState: [
    {
      name: "T-Shirt",
      quantity: 100,
      sku: "1",
      price: 200,
    },
    {
      name: "T-Shirt",
      quantity: 200,
      sku: "1",
      price: 200,
    },
  ],

  reducers: {
    addProductFunc(state, action) {
      const {name,quantity,sku,price}=action.payload;
      console.log("obj", action.payload);
      state.push({name,quantity,sku,price})

    },
  },
});

export const { addProductFunc } = ManageProductsSlice.actions;
export const productDataValues = (state:any) => {
  console.log(state);
  return {
    value: state.productData,
  };
};

export default ManageProductsSlice.reducer;
