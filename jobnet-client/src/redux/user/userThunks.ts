import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCurrentUser } from './userSlice';
import { User } from '@/types/types.ts';

const API_BASE_URL = 'http://localhost:5087/api';

// Thunk to fetch user data

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (userId: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get<User>(`${API_BASE_URL}/users/${userId}/simple`);
            const userData: User = response.data;

            dispatch(setCurrentUser(userData));

            return userData;
        } catch (error) {
            console.error('Fetch user data error:', error);
            //@ts-ignore
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Thunk to update current user data

export const updateCurrentUser = createAsyncThunk(
    'user/updateCurrentUser',
    async (userId: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get<User>(`${API_BASE_URL}/User/${userId}`);
            const userData: User = response.data;

            dispatch(setCurrentUser(userData));

            return userData;
        } catch (error) {
            console.error('Update current user error:', error);
            //@ts-ignore
            return rejectWithValue(error.response.data.message);
        }
    }
);