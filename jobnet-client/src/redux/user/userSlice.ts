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
            if(state.currentUser) {
                state.currentUser.title = action.payload;
            }
        }
    },
});

export const { setCurrentUser, updateCurrentUserCompany, updateCurrentUserTitle } = userSlice.actions;

export default userSlice.reducer;
