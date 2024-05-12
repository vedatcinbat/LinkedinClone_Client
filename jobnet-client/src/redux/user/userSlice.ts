import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// @ts-ignore
import { RootState } from '../store';
import {User} from '@/types/types.ts';

interface UserState {
    currentUser: User | null;
}

const initialState: UserState = {
    currentUser: null,
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
        }
    },
});

export const { setCurrentUser, updateCurrentUserCompany, updateCurrentUser, updateCurrentUserTitle } = userSlice.actions;

export default userSlice.reducer;
