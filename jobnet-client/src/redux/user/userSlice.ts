import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// @ts-ignore
import { RootState } from '../store';
import {User} from '@/types/types.ts';

interface UserState {
    currentUser: User | null;
    showFollowers: boolean;
    showFollowings: boolean;
    followersData: User[] | null;
    followingsData: User[] | null;
}

const initialState: UserState = {
    currentUser: null,
    showFollowers: false,
    showFollowings: false,
    followersData: null,
    followingsData: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User | null>) {
            state.currentUser = action.payload;
        },
        updateCurrentUserCompany(state, action: PayloadAction<number>) {
            if(state.currentUser && state.currentUser.company) {
                state.currentUser.company.companyId = action.payload;
            }
        },
        updateCurrentUserTitle(state, action: PayloadAction<string>) {
            if(state.currentUser && state.currentUser.title) {
                state.currentUser.title = action.payload;
            }
        },
        updateCurrentUser(state, action: PayloadAction<User>) {
            state.currentUser = action.payload;
        },
        setShowFollowers(state, action: PayloadAction<boolean>) {
            state.showFollowers = action.payload;
        },
        setShowFollowings(state, action: PayloadAction<boolean>) {
            state.showFollowings = action.payload;
        },
        setFollowersData(state, action: PayloadAction<User[]>) {
            state.followersData = action.payload;
        },
        setFollowingsData(state, action: PayloadAction<User[]>) {
            state.followingsData = action.payload;
        },
    },
});

export const { setCurrentUser, updateCurrentUserCompany, updateCurrentUser, updateCurrentUserTitle, setShowFollowings, setShowFollowers, setFollowersData, setFollowingsData } = userSlice.actions;

export default userSlice.reducer;
