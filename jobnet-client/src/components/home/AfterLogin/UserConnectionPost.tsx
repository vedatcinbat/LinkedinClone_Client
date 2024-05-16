import React from "react";
import {ConnectionsPost} from "@/types/types.ts";

interface UserConnectionPostProps {
    post: ConnectionsPost;
}

const UserConnectionPost: React.FC<UserConnectionPostProps> = ({post}) => {
    return(
        <div className="w-[60vh] h-[30vh] flex flex-col items-center bg-gray7 text-white mt-2 mb-4 rounded-xl cursor-pointer">
            <div className="userDetails w-full h-[20%] bg-black2 rounded-tl-xl rounded-tr-xl text-white flex justify-between items-center p-2">
                <div className="fullNameCompany flex items-center gap-2">
                    <div className="text-lg text-gray4">{post.user?.firstname} {post.user?.lastname}</div>
                    <div className="text-sm text-gray6">-{post.user?.company && post.user.company.companyName}-</div>
                </div>
                <div className="publishTime">
                    <div className="text-xs">({post.publishTime.toString()})</div>
                </div>
            </div>
            <div className="content w-full h-[70%] bg-commentBg flex justify-center items-center">
                <div>{post.textContent}</div>
            </div>
            <div className="likesComments w-full flex gap-2 justify-start items-center p-1">
                <div className="hover:text-black cursor-pointer">Likes</div>
                <div className="hover:text-black cursor-pointer">Comments</div>
            </div>
        </div>
    )
}

export default UserConnectionPost;