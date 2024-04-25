import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginSuccess, logoutSuccess, setLoading, clearError, setError } from './authSlice';
import { setCurrentUser } from '../user/userSlice';
import { fetchUserData } from '../user/userThunks';
import {useSelector} from "react-redux";

const API_BASE_URL = 'http://localhost:5087/api';

// Thunk to handle user login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData: { email: string; password: string }, { dispatch, rejectWithValue }) => {
        await axios.post(`${API_BASE_URL}/Auth/login`, formData)
            .then((res: any) => {
                dispatch(setLoading(true))

                const { accessToken, refreshToken, expirationTime, userId } = res.data;

                localStorage.setItem('token', accessToken);

                dispatch(loginSuccess({ userId: userId, isLoggedIn: true, accessToken: accessToken, refreshToken: refreshToken, expirationTime: expirationTime, error: null, loading: true}));

                dispatch(fetchUserData(userId));

                setTimeout(() => {
                    dispatch(setLoading(false))
                },2000);

                return { accessToken, refreshToken, expirationTime, userId };
            }).catch(() => {
                console.log('Code goes here');
                dispatch(setError("Login Failed"))
                setTimeout(() => {
                    dispatch(setError(null))
                }, 3000);
            });

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
            dispatch(clearError());
        } catch (error) {
            // Handle logout failure
            console.error('Logout error:', error);
        }
    }
);