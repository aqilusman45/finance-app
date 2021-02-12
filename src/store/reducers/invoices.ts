import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInvoice, IInvoiceDocument } from "./../../lib/invoice";
import { addInvoiceMutation, invoicesQuery } from "../../utils/database";
import { transformInvoice, transformInvoices } from "../../utils/transform";
import { AppThunk } from "..";

interface IInitialState {
  invoices: IInvoice[] | null;
  isLoading: boolean;
}

const INITIAL_STATE: IInitialState = {
  invoices: null,
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
    getInvoices: (state, action: PayloadAction<IInvoice[]>) => {
      const invoices = action.payload;      
      state.invoices = [...invoices];
      state.isLoading = false;
    },
    addNewInvoice: (state, action: PayloadAction<IInvoiceDocument>) => {
      const invoice = action.payload;
      state.invoices?.unshift(transformInvoice(invoice));
      state.isLoading = false;
    },
  },
});

export const {
  addNewInvoice,
  doneLoading,
  startLoading,
  getInvoices,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

export const addInvoice = (invoice: IInvoice): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    await addInvoiceMutation(invoice as any);
    dispatch(addNewInvoice(invoice as any));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const fetchInvoices = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading())
    const invoices = await invoicesQuery()
    console.log("add invoices", invoices);
    dispatch(getInvoices(transformInvoices(invoices)))
    dispatch(doneLoading())
  } catch (error) {
    throw error
}
}


