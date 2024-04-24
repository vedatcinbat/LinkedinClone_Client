import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {setCurrentUser} from "@/redux/user/userSlice.ts";
import {loginSuccess, logoutSuccess} from "@/redux/auth/authSlice.ts";
import {fetchUserData} from "@/redux/user/userThunks.ts";

const API_BASE_URL = 'http://localhost:5087/api';

// Thunk to handle user login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData: { email: string; password: string }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/Auth/login`, formData);
            const { accessToken, refreshToken, expirationTime, userId } = response.data;

            localStorage.setItem('token', accessToken);

            dispatch(loginSuccess({ userId: userId, isLoggedIn: true, accessToken: accessToken, refreshToken: refreshToken, expirationTime: expirationTime }));

            dispatch(fetchUserData(userId));

            return { accessToken, refreshToken, expirationTime, userId };
        } catch (error) {
            console.error('Login error:', error);
            //@ts-ignore
            return rejectWithValue(error.response?.data?.message || 'An error occurred during login.');
        }
    }
);

// Thunk to handle user logout
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { dispatch }) => {
        try {
            localStorage.removeItem('token');
            dispatch(logoutSuccess());
            dispatch(setCurrentUser(null));
        } catch (error) {
            // Handle logout failure
            console.error('Logout error:', error);
        }
    }
);


