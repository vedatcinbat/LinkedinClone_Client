import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCurrentUser } from './userSlice';
import { User } from '@/types/types.ts';

const API_BASE_URL = 'http://localhost:5087/api';

// Thunk to fetch user data

export const fetchUserDataSimple = createAsyncThunk(
    'user/fetchUserDataSimple',
    async (userId: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get<User>(`${API_BASE_URL}/users/${userId}/simple`);
            const userData: User = response.data;

            dispatch(setCurrentUser(userData));

            return userData;
        } catch (error) {
            console.error('Fetch user simple data error:', error);
            //@ts-ignore
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const fetchUserDataProfile = createAsyncThunk<User, string>(
    'user/fetchUserDataProfile',
    async (userId: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get<User>(`${API_BASE_URL}/users/${userId}/profile`);
            const userData: User = response.data;

            dispatch(setCurrentUser(userData));

            return userData;
        } catch (error) {
            console.error('Fetch user profile data error:', error);
            //@ts-ignore
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user profile data');
        }
    }
);

export const updateUserProfile = createAsyncThunk<User, number>(
    'user/updateUserProfile',
    async (userId: number, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get<User>(`${API_BASE_URL}/users/${userId}/profile`);
            const userData: User = response.data;

            dispatch(setCurrentUser(userData));

            return userData;
        } catch (error) {
            console.error('Update user profile data error:', error);
            //@ts-ignore
            return rejectWithValue(error.response?.data?.message || 'Failed to update user profile data');
        }
    }
);