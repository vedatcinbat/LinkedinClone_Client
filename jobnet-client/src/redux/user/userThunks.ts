import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    setConnectionsPosts,
    setCurrentUser, setFocusedPost,
    updateCurrentUserCompanyName,
    updateCurrentUserTitle
} from './userSlice';
import {ConnectionsPost, User} from '@/types/types.ts';

const API_BASE_URL = 'http://localhost:5087/api';

// Thunk to fetch user data

export const fetchUserDataSimple = createAsyncThunk(
    'user/fetchUserDataSimple',
    async (userId: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get<User>(`${API_BASE_URL}/users/${userId}/simple`);
            const userData: User = response.data;

            dispatch(setCurrentUser(userData));

            if(userData.company) {
                dispatch(updateCurrentUserCompanyName(userData.company.companyName));
            }

            if(userData.title) {
                dispatch(updateCurrentUserTitle(userData.title));
            }

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

export const updateUserConnectionsPosts = createAsyncThunk(
    'user/updateUserConnectionsPosts',
    // @ts-ignore
    async (userId: number, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get<ConnectionsPost[]>(`${API_BASE_URL}/users/getConnectionPosts`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json"
                }
            });
            const connectionsPosts: ConnectionsPost[] = response.data;

            dispatch(setConnectionsPosts(connectionsPosts));

            return connectionsPosts;
        } catch (error) {
            console.error('Fetch user connections posts error:', error);
            //@ts-ignore
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const updateFocusedPost = createAsyncThunk(
    'user/updateFocusedPost',
    // @ts-ignore
    async (postId: string, { dispatch, rejectWithValue }) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`http://localhost:5087/api/Post/${postId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const updatedCurrentPost = response.data;

            dispatch(setFocusedPost(updatedCurrentPost));

            return updatedCurrentPost;
        } catch (error) {
            console.error('Update Focused Post error:', error);
            //@ts-ignore
            return rejectWithValue(error.response.data.message);
        }
    }
)


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