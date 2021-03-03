import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserDocument } from "../../lib/users";

interface IInitialState {
  user: any;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const INITIAL_STATE: IInitialState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  initialState: { ...INITIAL_STATE },
  name: "users",
  reducers: {
    setUser: (state, action: PayloadAction<IUserDocument>) => {
      const user = action.payload;
      state.user = user;
      state.isLoggedIn = true;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
