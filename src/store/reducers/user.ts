import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUser } from "../../utils/database";
import { AppThunk } from "..";
import { IUser, IUserDocument } from "../../lib/users";

interface IInitialState {
  users: IUser[] | null;
  isLoading: boolean;
}

const INITIAL_STATE: IInitialState = {
  users: null,
  isLoading: false,
};

const userSlice = createSlice({
  initialState: { ...INITIAL_STATE },
  name: "users",
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    doneLoading: (state) => {
      state.isLoading = false;
    },
    addNewUser: (state, action: PayloadAction<IUserDocument>) => {
      const user = action.payload;
      state.users?.unshift(user);
      state.isLoading = false;
    },
  },
});

export const { addNewUser, doneLoading, startLoading } = userSlice.actions;

export default userSlice.reducer;

export const addUserAsync = (user: IUser, cb: () => void): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(startLoading());
    await addUser(user as any);
    dispatch(addNewUser(user as any));
    cb();
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};
