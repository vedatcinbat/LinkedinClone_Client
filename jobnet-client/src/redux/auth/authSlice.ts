import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/types/types';


const initialState: AuthState = {
    userId: null,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    expirationTime: null,
    loading: false,
    error: null,
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
            state.loading = false;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
    },
});

export const { loginSuccess, logoutSuccess, setLoading, setError, clearError } = authSlice.actions;

export default authSlice.reducer;