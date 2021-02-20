import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInvoice, IInvoiceDocument } from "./../../lib/invoice";
import {
  addInvoiceMutation,
  invoicesQuery,
  updateInvoiceMutation,
} from "../../utils/database";
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
    updateInvoice: (state, action: PayloadAction<IInvoiceDocument>) => {
      const invoice = action.payload;
      state.invoices?.forEach((item, index) => {
        if (item.uid === invoice.uid && state.invoices) {
          state.invoices[index] = invoice;
        }
      });
    },
  },
});

export const {
  addNewInvoice,
  doneLoading,
  startLoading,
  getInvoices,
  updateInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

export const addInvoice = (
  invoice: IInvoice,
  cb: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    await addInvoiceMutation(invoice as any);
    dispatch(addNewInvoice(invoice as any));
    cb();
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const fetchInvoices = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const invoices = await invoicesQuery();
    dispatch(getInvoices(transformInvoices(invoices)));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const updateInvoiceAsync = (
  invoice: IInvoiceDocument,
  cb: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    await updateInvoiceMutation(invoice);
    dispatch(updateInvoice(invoice));
    cb();
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};
