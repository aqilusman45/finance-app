import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "..";
import { IAttribute, IAttributeDocument } from "../../lib/attributes";
import { attributesQuery, insertAttributeMutation } from "../../utils/database";
import { transformAttribute } from "../../utils/transform";

interface IInitialState {
  attributes: IAttribute[] | null;
  isLoading: boolean;
}
const INITIAL_STATE: IInitialState = {
  attributes: null,
  isLoading: false,
};

const attributesSlice = createSlice({
  name: "attributes",
  initialState: { ...INITIAL_STATE },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    doneLoading: (state) => {
      state.isLoading = false;
    },
    getAttributes: (state, action: PayloadAction<IAttribute[]>) => {
      const attributes = action.payload;
      state.attributes = [...attributes];
      state.isLoading = false;
    },
    addAttribute: (state, action: PayloadAction<IAttributeDocument>) => {
      const attribute = action.payload;
      state.attributes?.unshift(transformAttribute(attribute));
      state.isLoading = false;
    },
  },
});

export const {
  doneLoading,
  addAttribute,
  getAttributes,
  startLoading,
} = attributesSlice.actions;

export default attributesSlice.reducer;

export const fetchAttributes = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const docs = await attributesQuery();
    const deserialized = docs.map((attr) => transformAttribute(attr));
    dispatch(getAttributes([...deserialized]));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const insertAttribute = (
  attribute: IAttributeDocument
): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    await insertAttributeMutation(attribute);
    dispatch(addAttribute(attribute));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};
