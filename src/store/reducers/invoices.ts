import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInvoice, IInvoiceDocument } from "./../../lib/invoice";
import { addInvoiceMutation } from "../../utils/database";
import { transformInvoice } from "../../utils/transform";
import { AppThunk } from "..";

interface IInitialState {
  accounts: IInvoice[] | null;
  isLoading: boolean;
}

const INITIAL_STATE: IInitialState = {
  accounts: null,
  isLoading: false,
};

const invoiceSlice = createSlice({
  initialState: { ...INITIAL_STATE },
  name: "invoices",
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    doneLoading: (state) => {
      state.isLoading = false;
    },
    addNewInvoice: (state, action: PayloadAction<IInvoiceDocument>) => {
      const invoice = action.payload;
      console.log("invoice", invoice);
      state.accounts?.unshift(transformInvoice(invoice));
      state.isLoading = false;
    },
  },
});

export const {
  addNewInvoice,
  doneLoading,
  startLoading,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

export const addInvoice = (invoice: IInvoice): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    await addInvoiceMutation(invoice as any);
    dispatch(addNewInvoice(invoice as any));
    dispatch(doneLoading());
    console.log("success");
    
  } catch (error) {
    console.log("error");

    throw error;
  }
};
