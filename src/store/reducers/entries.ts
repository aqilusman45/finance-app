import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addEntryMutation, entriesQuery, updateEntryMutation } from "../../utils/database";
import { AppThunk } from "..";
import { IEntry, IEntryDocument } from "../../lib/entries";
import { transformEntry, transformEntries } from "../../utils/transform";

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
    getEntries: (state, action: PayloadAction<IEntry[]>) => {
      const entries = action.payload;
      state.entries = [...entries];
      state.isLoading = false;
    },
    updateEntry: (state, action: PayloadAction<IEntryDocument>) => {
      const entry = action.payload;
      state.entries?.forEach((item, idx) => {
        if (item.uid === entry.uid && state.entries) {
          state.entries[idx] = entry;
        }
      });
      return state;
    },
  },
});

export const {
  doneLoading,
  startLoading,
  addNewEntry,
  getEntries,
  updateEntry
} = entriesSlice.actions;
export default entriesSlice.reducer;

export const addEntry = (entry: IEntry): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    await addEntryMutation(entry as any);
    dispatch(addNewEntry(entry as any));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const fetchEntries = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const entries = await entriesQuery();
    dispatch(getEntries(transformEntries(entries)));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const updateEntryAsync = (
  entry: IEntryDocument,
): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    await updateEntryMutation(entry);
    dispatch(updateEntry(entry));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};
