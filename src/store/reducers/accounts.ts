import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addAccountMutation, accountsQuery, updateAccountMutation } from "../../utils/database";
import { AppThunk } from "..";
import { IAccount, IAccountDocument } from "../../lib/accounts";
import { transformAccounts } from "../../utils/transform";

interface IInitialState {
    accounts: IAccount[] | null;
    isLoading: boolean
}

const INITIAL_STATE: IInitialState = {
    accounts: null,
    isLoading: false
}

const accountsSlice = createSlice({
    initialState: { ...INITIAL_STATE },
    name: "accounts",
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        doneLoading: (state) => {
            state.isLoading = false;
        },
        getAccounts: (state, action: PayloadAction<IAccount[]>) => {
            const accounts = action.payload;
            state.accounts = [...accounts];
            state.isLoading = false;
        },
        addNewAccount: (state, action: PayloadAction<IAccountDocument>) => {
            const account = action.payload;
            state.accounts?.unshift(account);
            state.isLoading = false;
        },
        updateAccount: (state, action: PayloadAction<IAccountDocument>) => {
            const account = action.payload;
            state.accounts?.forEach((item, idx) => {
                if (item.uid === account.uid && state.accounts) {
                    state.accounts[idx] = account
                }
            })
            return state
        },
    }
})

export const { addNewAccount, doneLoading, getAccounts, startLoading, updateAccount } = accountsSlice.actions;

export default accountsSlice.reducer;

export const addAccount = (
    account: IAccount,
    cb: () => void
): AppThunk => async dispatch => {
    try {
        dispatch(startLoading());
        await addAccountMutation(account as any);
        dispatch(addNewAccount(account as any));
        cb();
        dispatch(doneLoading());
    } catch (error) {
        throw error
    }
}

export const updateAccountAsync = (
  account: IAccountDocument,
  cb?: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    await updateAccountMutation(account);
    dispatch(updateAccount(account));
    cb && cb();
    dispatch(doneLoading());
  } catch (error) {
    throw error;
  }
};

export const fetchAccounts = (): AppThunk => async dispatch => {
    try {
        dispatch(startLoading());
        const accounts = await accountsQuery();
        dispatch(getAccounts(transformAccounts(accounts)));
        dispatch(doneLoading());
    } catch (error) {
        throw error
    }
}