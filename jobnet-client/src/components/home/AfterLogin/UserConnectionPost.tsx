import React, {useEffect, useState} from "react";
import {ConnectionsPost} from "@/types/types.ts";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import axios from "axios";
import {updateUserConnectionsPosts} from "@/redux/user/userThunks.ts";
import {
    setFocusedPost,
    setIsPostFocused,
    setPostLikes,
    setShowAddComment,
    setShowLikes
} from "@/redux/user/userSlice.ts";
interface UserConnectionPostProps {
    post: ConnectionsPost;
    key: number;
}

const UserConnectionPost: React.FC<UserConnectionPostProps> = ({post, key}) => {

    const [doILike, setDoILike] = useState<boolean>(false);
    const currentUserId = useSelector((state: RootState) => state.auth.userId);
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const postId = post.postId;
    const dispatch = useDispatch();

    useEffect(() => {
        const baseUrl = `http://localhost:5087/api/Post/${postId}/doILike/${currentUserId}`;
        axios.get(
            baseUrl,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        ).then((res) => {
            setDoILike(res.data)
        } )
    }, []);

    const likeDislikePost = () => {
        if(!doILike) {
            const baseUrl = `http://localhost:5087/api/Like/${currentUserId}/like/${postId}`;
            axios.patch(
                baseUrl,
                null,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            ).then(() => {
                setDoILike(true);
                // @ts-ignore
                dispatch(updateUserConnectionsPosts());
                alert(`Post ${postId} liked successfully`)
            })
        }
        if(doILike) {
            const baseUrl = `http://localhost:5087/api/Like/${currentUserId}/dislike/${postId}`;
            axios.patch(
                baseUrl,
                null,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            ).then(() => {
                setDoILike(false);
                // @ts-ignore
                dispatch(updateUserConnectionsPosts());
                alert(`Post ${postId} disliked successfully`)
            })
        }
    }

    const showLikesEvent = () => {
        dispatch(setShowLikes(true));
        const baseUrl = `http://localhost:5087/api/Post/${postId}/likes`;

        axios.get(baseUrl).then(res => {
            dispatch(setPostLikes(res.data));
        }).catch(err => {
            console.log(err);
        })

        // @ts-ignore
        dispatch(updateUserConnectionsPosts(currentUserId));

        console.log(post);
        //dispatch(setPostLikes(post.likes));
    }

    const showCommentInputBox = () => {
        // @ts-ignore
        dispatch(setShowAddComment(true))
    }

    const focusPost = () => {
        dispatch(setIsPostFocused(true));

        const baseUrl = `http://localhost:5087/api/Post/${postId}`;

        axios.get(baseUrl).then(res => {
            dispatch(setFocusedPost(res.data));
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div key={key}
             className="w-[60vh] h-[30vh] flex flex-col items-center bg-gray7 text-white mt-2 mb-4 rounded-xl cursor-pointer">
            <div
                className="userDetails w-full h-[20%] bg-black2 rounded-tl-xl rounded-tr-xl text-white flex justify-between items-center p-2">
                <div className="fullNameCompany flex items-center gap-2">
                    <div className="text-lg text-gray4">{post.user?.firstname} {post.user?.lastname}</div>
                    {post.user?.company && (
                        <div
                            className="text-sm text-gray6">-{post.user.company.companyName}-</div>
                    )}
                </div>
                <div className="publishTime">
                    <div className="text-xs">({post.publishTime.toString()})</div>
                </div>
            </div>
            <button onClick={focusPost} className="content w-full h-[70%] bg-commentBg flex justify-center items-center rounded-bl-xl rounded-br-xl">
                <div>
                    <div>{post.textContent}</div>
                </div>
            </button>
            <div className="likesComments w-full flex gap-2 justify-between items-center p-2">
                <div className="likeOrCommentButton flex items-center gap-2">
                    <div className={`cursor-pointer ${doILike ? 'text-postLikeColor' : 'text-white'}`}>
                        <button onClick={likeDislikePost}>
                            <FavoriteIcon className="hover:scale-125"/>
                        </button>
                    </div>
                    <div
                        onClick={showCommentInputBox}
                        className="hover:text-black cursor-pointer">
                        <ChatBubbleOutlineIcon/>
                    </div>
                </div>
                <div className="showLikesOrComment flex itesm-center gap-2">
                    <div className="hover:text-black cursor-pointer">
                        <button onClick={showLikesEvent}>Likes {post.likeCount}</button>
                    </div>
                    <div className="hover:text-black cursor-pointer">Comments {post.commentCount}</div>
                </div>
            </div>
        </div>
    )
}

export default UserConnectionPost;