import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// @ts-ignore
import { RootState } from '../store';
import {ConnectionsPost, FocusedPost, LikeSimpleResponse, User} from '@/types/types.ts';

interface UserState {
    currentUser: User | null;
    showFollowers: boolean;
    showFollowings: boolean;
    isPostFocused: boolean;
    focusedPost: FocusedPost | null;
    showAddComment: boolean;
    showJob: boolean;
    showLikes: boolean;
    followersData: User[] | null;
    followingsData: User[] | null;
    connectionPosts: ConnectionsPost[] | [];
    postLikes: LikeSimpleResponse[] | [];
}

const initialState: UserState = {
    currentUser: null,
    showFollowers: false,
    showFollowings: false,
    showLikes: false,
    showAddComment: false,
    followersData: null,
    followingsData: null,
    showJob: false,
    connectionPosts: [],
    postLikes: [],
    isPostFocused: false,
    focusedPost: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User | null>) {
            state.currentUser = action.payload;
        },
        setPostLikes(state, action: PayloadAction<LikeSimpleResponse[]>) {
            state.postLikes = action.payload;
        },
        setShowAddComment(state, action: PayloadAction<boolean>) {
            state.showAddComment = action.payload;
        },
        setIsPostFocused(state, action: PayloadAction<boolean>) {
            state.isPostFocused = action.payload;
        },
        setFocusedPost(state, action: PayloadAction<FocusedPost | null>) {
            state.focusedPost = action.payload;
        },
        updateCurrentUserCompanyName(state, action: PayloadAction<string>) {
            if(state.currentUser && state.currentUser.company) {
                state.currentUser.company.companyName = action.payload;
            }
        },
        setShowLikes(state, action: PayloadAction<boolean>) {
            state.showLikes = action.payload;
        },
        updateCurrentUserTitle(state, action: PayloadAction<string>) {
            if(state.currentUser && action.payload != null) {
                state.currentUser.title = action.payload;
            }
        },
        setShowJob(state, action: PayloadAction<boolean>) {
            state.showJob = action.payload;
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
        setConnectionsPosts(state, action: PayloadAction<ConnectionsPost[]>) {
            state.connectionPosts = action.payload;
        }
    },
});

export const {setFocusedPost, setIsPostFocused, setShowAddComment, setPostLikes, setShowLikes, setConnectionsPosts, setShowJob, setCurrentUser, updateCurrentUserCompanyName, updateCurrentUserTitle, setShowFollowings, setShowFollowers, setFollowersData, setFollowingsData } = userSlice.actions;

export default userSlice.reducer;
