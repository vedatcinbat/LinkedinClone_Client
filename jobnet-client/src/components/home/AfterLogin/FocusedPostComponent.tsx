import React, {useEffect, useState} from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {setFocusedPost, setIsPostFocused, setShowLikes} from "@/redux/user/userSlice.ts";
import {CommentRounded} from "@mui/icons-material";
import {SendIcon} from "lucide-react";
import {RootState} from "@/redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {updateFocusedPost} from "@/redux/user/userThunks.ts";

interface CommentApiRequest {
    Content: string;
}

const FocusedPostComponent: React.FC = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const currentFocusedPost = useSelector((state: RootState) => state.user.focusedPost);
    const currentUserId = useSelector((state: RootState) => state.auth.userId);
    const [currentUserComment, setCurrentUserComment] = useState<string>("");

    const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);

    const SimpleDate = (date: Date): string => {
        const parsedDate = new Date(date);
        const hour = parsedDate.getHours();
        const minute = parsedDate.getMinutes();
        const day = parsedDate.getDate();
        const month = parsedDate.getMonth() + 1; // Month is zero-indexed
        const year = parsedDate.getFullYear();
        return `${day}/${month}/${year} ${hour}:${minute}`;
    };

    useEffect(() => {}, []);

    const closeFocusedPost = () => {
        dispatch(setIsPostFocused(false));
        dispatch(setFocusedPost(null));
    };

    const deleteComment = (commentId: number) => {
        const url = `http://localhost:5087/api/Comment/${currentUserId}/deleteComment/${currentFocusedPost?.postId}/${commentId}`;

        axios.patch(
            url,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        ).then(() => {
            alert(`You have deleted comment : (${commentId})`)
            // @ts-ignore
            dispatch(updateFocusedPost(currentFocusedPost?.postId.toString()));
        }).catch(err => {
            console.log(err);
        })
    }


    const commentToPost = () => {
        if (currentUserComment === '') {
            alert('Comment can not be empty');
            return;
        }

        const url = `http://localhost:5087/api/Comment/${currentUserId}/comment/${currentFocusedPost?.postId}`;

        const req: CommentApiRequest = {
            Content: currentUserComment
        };

        axios.post(
            url,
            req,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        ).then(() => {
            alert(`User ${currentUserId} commented on post ${currentFocusedPost?.postId} successfully`);
            // @ts-ignore
            dispatch(updateFocusedPost(currentFocusedPost?.postId.toString()));

            setCurrentUserComment('');
        }).catch(err => {
            console.log(err);
            alert('Error while commenting');
        });
    };

    const IsItMyComment = (commentPublisherId: number) => {
        return currentUserId === commentPublisherId;
    }

    return (
        <>
            {currentFocusedPost ? (
                <div className="postFocusContainer fixed top-[8%] left-[20%]">
                    <div
                        className="rounded-xl w-[150vh] h-[75vh] bg-gray8 text-white flex flex-col justify-start items-center p-2 gap-2">
                        <button
                            className="absolute top-2 right-2 p-2 bg-gray9 text-white hover:text-black hover:bg-white rounded-xl"
                            onClick={closeFocusedPost}>Close
                        </button>
                        <div className="header h-[10%]">
                            <div className="text-2xl font-bold mb-2">Post</div>
                        </div>
                        <div className="mainPart w-full h-[90%]">
                            <div className="likedUsers w-full h-full flex items-center">
                                <div className="postPart w-[60%] h-full flex justify-center items-center bg-black">
                                    <div
                                        className="postContainer w-[80vh] h-[50vh] bg-gray8 rounded-xl flex flex-col p-2 gap-2">
                                        <div
                                            className="postPublisherInformations w-full h-[20%] flex justify-between items-center p-2 bg-gray7 rounded-xl">
                                            <div className="userInfos flex items-center gap-2">
                                                <div
                                                    className="fullName text-xl">{currentFocusedPost.user.firstname} {currentFocusedPost.user.lastname}</div>
                                                <div className="companyandTitle text-sm text-gray6 flex flex-col items-center">
                                                    {currentFocusedPost.user.company && (
                                                        <div
                                                            className="companyIfExists text-md text-gray6">({currentFocusedPost.user.company.companyName})</div>
                                                    )}
                                                    {currentFocusedPost.user.title && (
                                                        <div
                                                            className="titleIfExists text-xs">{currentFocusedPost.user.title}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="publishDate">
                                                <div
                                                    className="postPublishDate">{SimpleDate(currentFocusedPost.publishTime)}</div>
                                            </div>
                                        </div>
                                        <div
                                            className="postTextContext w-full h-[60%] bg-gray7 rounded-xl flex justify-center items-center">
                                            <div className="postContext">{currentFocusedPost.textContent}</div>
                                        </div>
                                        <div className="likeButtonAndLikeCount w-full h-[20%]">
                                            <div
                                                className="likeButtonAndCommentButton w-full h-[50%] flex justify-between items-center p-2">
                                                <div className="likeButton flex items-center gap-2">
                                                    <div className="likeButtonIcon">
                                                        <button>
                                                            <FavoriteIcon className="h-6 w-6"/>
                                                        </button>
                                                    </div>
                                                    <div className="likeButtonCount">
                                                        <button onClick={() => dispatch(setShowLikes(true))}>
                                                            {currentFocusedPost.likeCount} Likes
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="commentButton flex items-center gap-2">
                                                    <div className="commentButtonIcon">
                                                        <button>
                                                            <CommentRounded className="h-6 w-6"/>
                                                        </button>
                                                    </div>
                                                    <div className="commentButtonCount">
                                                        <button>
                                                            {currentFocusedPost.commentCount} Comments
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="commentsPart w-[40%] h-full bg-black p-1">
                                    <div
                                        className="commentContainer w-full h-full bg-gray7 rounded-xl flex flex-col items-center p-1">
                                        <div className="comments w-full h-full overflow-y-scroll bg-black rounded-xl p-2">
                                            {currentFocusedPost.comments && currentFocusedPost.comments.length > 0 ? (
                                                <>
                                                    {currentFocusedPost.comments?.map((comment, key) => (
                                                        <div key={key}
                                                             onMouseOver={() => setShowDeleteButton(true)}
                                                             onMouseLeave={() => setShowDeleteButton(false)}
                                                             className="commentBox w-full p-2 bg-gray8 text-white flex items-center rounded-xl mb-2 gap-2 relative">
                                                            {IsItMyComment(comment.userCommentSimpleResponse.userId) && (
                                                                <button
                                                                    onClick={() => deleteComment(comment.commentId)}
                                                                    className={`deleteButton text-xs p-1 rounded-xl -top-3 right-0 w-[7vh] h-[4vh] bg-gray8 text-white ${showDeleteButton ? 'absolute' : 'hidden'}`}
                                                                >
                                                                    Delete
                                                                </button>
                                                            )}
                                                            <div
                                                                className="commentedUserInformations gap-2 w-[30%] bg-black h-[7vh] rounded-xl flex justify-center items-center">
                                                                <div
                                                                    className="fullName text-sm w-full text-center">{comment.userCommentSimpleResponse.firstname} {comment.userCommentSimpleResponse.lastname}</div>
                                                            </div>
                                                            <div
                                                                className="commentContext w-[50%] p-2 bg-black rounded-xl h-[7vh]">
                                                                <div
                                                                    className="text-xs text-gray2">{comment.content}</div>
                                                            </div>
                                                            <div
                                                                className="commentedAt w-[20%] bg-black rounded-xl h-[7vh] flex justify-center items-center text-center">
                                                                <div
                                                                    className="text-xs text-gray3">{SimpleDate(comment.commentedAt)}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <div className="mt-2 w-full h-full flex items-center justify-center">
                                                <div>No Comment Found</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="commentInput w-full h-[10%] flex items-center">
                                            <input type="text" placeholder="Comment Here..."
                                                   value={currentUserComment}
                                                   onChange={(e) => setCurrentUserComment(e.target.value)}
                                                   className="w-[90%] h-full p-2 rounded-xl text-black font-bold"/>
                                            <button
                                                onClick={commentToPost}
                                                className="w-[10%] h-full rounded-[1vh] flex justify-center items-center bg-black text-white hover:bg-white hover:text-black">
                                                <SendIcon/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div>Post not found</div>
                </>
            )}
        </>
    );
}

export default FocusedPostComponent;