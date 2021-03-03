import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUser, usersQuery } from "../../utils/database";
import { AppThunk } from "..";
import { IUser, IUserDocument } from "../../lib/users";
import { transformUsers } from "../../utils/transform";

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
    getUsers: (state, action: PayloadAction<IUser[]>) => {
      const user = action.payload;
      state.users = [...user];
      state.isLoading = false;
    },
  },
});

export const {
  addNewUser,
  doneLoading,
  startLoading,
  getUsers,
} = userSlice.actions;

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

export const fetchUsers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const users = await usersQuery();
    dispatch(getUsers(transformUsers(users)));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};
