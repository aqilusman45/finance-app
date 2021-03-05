import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "..";
import { transformUsersAuth } from "../../utils/transform";
import { IAuthDocument, IAuth } from "../../lib/auth";
import {
  addUserAuth,
  userAuthQuery,
  removeUserAuth,
} from "../../utils/database";

interface IInitialState {
  user: IAuth[] | null;
  isLoading: boolean;
}

const INITIAL_STATE: IInitialState = {
  user: null,
  isLoading: false,
};

const authSlice = createSlice({
  initialState: { ...INITIAL_STATE },
  name: "auth",
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    doneLoading: (state) => {
      state.isLoading = false;
    },
    setUser: (state, action: PayloadAction<IAuthDocument>) => {
      const user = action.payload;
      state.user?.unshift(user);
      state.isLoading = false;
    },
    getUserAuth: (state, action: PayloadAction<IAuth[]>) => {
      const user = action.payload;
      state.user = [...user];
      state.isLoading = false;
    },
    updateUserAuth: (state, action: PayloadAction<IAuthDocument>) => {
      const user = action.payload;
      state.user?.filter((item) => item.uid !== user.uid);
      return state;
    },
  },
});

export const {
  setUser,
  startLoading,
  doneLoading,
  getUserAuth,
  updateUserAuth,
} = authSlice.actions;

export default authSlice.reducer;

export const addUserAuthAsync = (user: IAuth): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    await addUserAuth(user as any);
    dispatch(setUser(user as any));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const fetchUserAuth = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const users = await userAuthQuery();
    dispatch(getUserAuth(transformUsersAuth(users)));
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const removeUserAuthAsync = (
  user: IAuthDocument,
  cb: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    await removeUserAuth(user);
    dispatch(updateUserAuth(user));
    cb();
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};
