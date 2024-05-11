import {Post} from "@/types/types.ts";
import React, {useEffect, useState} from "react";
import {RootState} from "@/redux/store.ts";
import {useSelector} from "react-redux";

interface PostInterface {
    post: Post;
}

const SingleTweetLikeComponent: React.FC<PostInterface> = ({post}) => {
    const currentUser = useSelector((state: RootState) => state.user.currentUser);


    return (
        <div className={`w-[50vh] h-[23vh] bg-gray8 text-formBtnHoverTextColor rounded-xl p-1 flex flex-col justify-between items-center`}>
            <div className="publisherInformation flex h-[10vh] mb-2 rounded-lg gap-2 justify-center items-center bg-gray7 w-full">
                <div>{currentUser?.firstname} {currentUser?.lastname}</div>
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