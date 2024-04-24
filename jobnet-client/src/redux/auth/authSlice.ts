import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/types/types';


const initialState: AuthState = {
    userId: null,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    expirationTime: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<AuthState>) {
            state.userId = action.payload.userId;
            state.isLoggedIn = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.expirationTime = action.payload.expirationTime;
        },
        logoutSuccess(state) {
            state.userId = null;
            state.isLoggedIn = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.expirationTime = null;
        },
    },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;