import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// @ts-ignore
import { RootState } from '../store';
import { User } from '@/types/types.ts';


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
    },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
