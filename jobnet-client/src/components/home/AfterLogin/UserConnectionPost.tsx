import React from "react";
import {ConnectionsPost} from "@/types/types.ts";

interface UserConnectionPostProps {
    post: ConnectionsPost;
}

const UserConnectionPost: React.FC<UserConnectionPostProps> = ({post}) => {
    return(
        <div className="w-[60vh] h-[30vh] bg-gray8 text-white mt-2 mb-4 rounded-xl">
            <div>{post.publishTime.toString()}</div>
            <div>{post.textContent}</div>
            <div>{post.user?.firstname} {post.user?.lastname}</div>
            <div>{post.user?.company?.companyName}</div>
        </div>
    )
}

export default UserConnectionPost;