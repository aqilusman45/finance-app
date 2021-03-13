import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { activationQuery, activateApp } from "../../utils/database";
import { AppThunk } from "..";
import { IActivation, IActivationDocument } from "../../lib/activation";

interface IInitialState {
  activation: IActivation | null;
  isLoading: boolean;
}

const INITIAL_STATE: IInitialState = {
  activation: null,
  isLoading: false,
};

const activationSlice = createSlice({
  initialState: { ...INITIAL_STATE },
  name: "activation",
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    doneLoading: (state) => {
      state.isLoading = false;
    },
    getActivationStatus: (state, action: PayloadAction<IActivation>) => {
      state.activation = { ...action.payload };
      state.isLoading = false;
    },
    updateActivationStatus: (state, action: PayloadAction<IActivation>) => {
      state.activation = { ...action.payload };
      state.isLoading = false;
    },
  },
});

export const {
  getActivationStatus,
  doneLoading,
  updateActivationStatus,
  startLoading,
} = activationSlice.actions;

export default activationSlice.reducer;

export const updateActivationAsync = (
  activation: IActivationDocument,
  cb?: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    await activateApp(activation)
    dispatch(updateActivationStatus(activation))
    cb && cb();
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const fetchActivationStatus = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const doc = await activationQuery();
    dispatch(getActivationStatus(doc?._data as any))
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};
