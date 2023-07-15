import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    status: boolean;
    token: string | null;
    userData: Account.UserDocument | null;
}

const initialState: AuthState = {
    status: false,
    token: null,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; userData: Account.UserDocument }>) => {
            state.status = true;
            state.token = action.payload.token;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.token = null;
            state.userData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
