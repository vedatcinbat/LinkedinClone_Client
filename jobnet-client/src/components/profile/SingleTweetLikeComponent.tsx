import {Post} from "@/types/types.ts";
import React, {useState} from "react";
import {RootState} from "@/redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {fetchUserDataProfile} from "@/redux/user/userThunks.ts";
//import {fetchUserDataProfile} from "@/redux/user/userThunks.ts";

interface PostInterface {
    post: Post;
    showMessagePopup?: boolean;
    setMessagePopupText?: React.Dispatch<React.SetStateAction<string>>;
    setShowMessagePopup?: React.Dispatch<React.SetStateAction<boolean>>;
    publisherUser?: string;
    mes?: string;
}

const SingleTweetLikeComponent: React.FC<PostInterface> = ({mes, publisherUser, post, setMessagePopupText, setShowMessagePopup}) => {
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const authData = useSelector((state: RootState) => state.auth);
    const token = authData.accessToken;
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    //const currentUserData = useSelector((state: RootState) => state.user.currentUser);

    const deletePost = (postId: string) => {
        if(setShowMessagePopup && setMessagePopupText) {
            const url = `http://localhost:5087/api/Post/deletePost/${postId}`;

            axios.delete(
                url,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            ).then(() => {
                setMessagePopupText("Post deleted successfully with id : " + postId);
                setShowMessagePopup(true);

                setTimeout(() => {
                    setShowMessagePopup(false);
                }, 3000);
                //@ts-ignore
                dispatch(fetchUserDataProfile(currentUser?.userId));
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const SimpleDate = (date: Date): string => {
        const parsedDate = new Date(date);
        const hour = parsedDate.getHours();
        const minute = parsedDate.getMinutes();
        const day = parsedDate.getDate();
        const month = parsedDate.getMonth();
        const year = parsedDate.getFullYear();
        const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
        return formattedDate;
    }
    console.log(post);
    return (
        <div
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`w-[50vh] mb-2 h-[23vh] bg-gray8 text-formBtnHoverTextColor rounded-xl p-1 flex flex-col justify-between items-center relative`}>
            <button
                onClick={() => deletePost(post.postId.toString())}
                className={`absolute -top-2 -right-5 bg-alertErrorBgColor text-alertErrorTextColor p-2 rounded-2xl ${isHovered && mes == 'same-user' ? 'opacity-100' : 'hidden'}`}>Delete</button>
            <div className="publisherInformation flex h-[10vh] mb-2 rounded-lg gap-2 justify-evenly items-center bg-gray7 w-full">
                <div className="text-gray6">({SimpleDate(post.publishTime)})</div>
                <div className="">{publisherUser ? `${publisherUser.toString()}` : `${currentUser?.firstname}`}</div>
                <div>{currentUser?.company?.companyName}</div>
            </div>
            <div className="mainContent bg-commentBg w-full p-4 border border-sidebarBorderColor rounded-xl h-[30vh] overflow-hidden">
                <div>{post.textContent}</div>
            </div>
            <div className="likeComments mt-2 w-full h-[10vh] flex justify-center items-center gap-2 bg-gray7 rounded-xl">
                <div>Like {post.likeCount}</div>
                <div>Comment {post.commentCount}</div>
            </div>
        </div>
    )
}

export default SingleTweetLikeComponent;