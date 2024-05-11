import {Post} from "@/../src/types/types.ts";
import React from "react";
import SingleTweetLikeComponent from "@/components/profile/SingleTweetLikeComponent.tsx";

interface UserPostsProps {
    postData: Post[] | null;
}

const UserPosts: React.FC<UserPostsProps> = ({postData}) => {

    console.log(postData);
    return (
        <div className="userPosts w-full bg-sidebarBorderColor">
            {postData?.length === 0 ? (
                <div className="h-[30vh] flex justify-center items-center">
                    <div>No Post</div>
                </div>
            ) : (
                <div className = "h-[50vh] overflow-y-scroll flex flex-col items-center justify-between mt-2 gap-4 mb-2">
                    <div className="text-2xl text-black font-bold">Posts</div>
                    {postData?.map((post, key: number) => (
                        <div key={key}>
                            {post.textContent && <SingleTweetLikeComponent post={post} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserPosts;