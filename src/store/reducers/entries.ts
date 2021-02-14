import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addEntryMutation } from "../../utils/database";
import { AppThunk } from "..";
import { IEntry, IEntryDocument } from "../../lib/entries";
import { transformEntry } from "../../utils/transform";

interface IInitialState {
  entries: IEntry[] | null;
  isLoading: boolean;
}

const INITIAL_STATE: IInitialState = {
  entries: null,
  isLoading: false,
};

const entriesSlice = createSlice({
  initialState: { ...INITIAL_STATE },
  name: "entries",
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    doneLoading: (state) => {
      state.isLoading = false;
    },
    addNewEntry: (state, action: PayloadAction<IEntryDocument>) => {
      const entry = action.payload;
      state.entries?.unshift(transformEntry(entry));
      state.isLoading = false;
    },
  },
});

export const { doneLoading, startLoading, addNewEntry } = entriesSlice.actions;
export default entriesSlice.reducer;

export const addEntry = (
    entry: IEntry,
    cb: () => void
): AppThunk => async dispatch => {
    try {
        dispatch(startLoading());
        await addEntryMutation(entry as any);
        dispatch(addNewEntry(entry as any));
        cb();
        dispatch(doneLoading());
    } catch (error) {
        throw error
    }
}
