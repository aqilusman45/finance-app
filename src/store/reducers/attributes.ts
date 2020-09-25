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
    getAttributes: (state, action: PayloadAction<IAttributeDocument[]>) => {
      const attributes = action.payload;
      const deserialized = attributes.map(attr=> transformAttribute(attr))
      state.attributes = [...deserialized];
      state.isLoading = false;
    },
    addAttribute: (
      state,
      action: PayloadAction<IAttributeDocument>
    ) => {
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
    dispatch(getAttributes([...docs]));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const insertAttribute = (attribute: IAttributeDocument): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(startLoading());
    const attributesRes = await insertAttributeMutation(attribute);
    dispatch(addAttribute(attributesRes));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};
