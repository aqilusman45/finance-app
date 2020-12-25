import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addAccountMutation } from "../../utils/database";
import { AppThunk } from "..";
import { IAccount, IAccountDocument } from "../../lib/accounts";
import { transformAccount } from "../../utils/transform";

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
            const accounts = action.payload;
            state.accounts?.unshift(transformAccount(accounts));
            state.isLoading = false;
        },
        updateAccounts: (state, action: PayloadAction<IAccountDocument>) => {
            const accounts = action.payload;
            state.accounts?.forEach((item, idx) => {
                if (item.uid === accounts.uid && state.accounts) {
                    state.accounts[idx] = accounts
                }
            })
            return state
        },
    }
})

export const { addNewAccount, doneLoading, getAccounts, startLoading, updateAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;

export const addAccount = (
    account: IAccount,
    cb: () => void
): AppThunk => async dispatch => {
    try {
        dispatch(startLoading());
        console.log(account);
        await addAccountMutation(account as any);
        dispatch(addNewAccount(account as any));
        cb();
        dispatch(doneLoading);
    } catch (error) {
        throw error
    }
}