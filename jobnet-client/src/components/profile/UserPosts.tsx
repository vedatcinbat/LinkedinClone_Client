import {Post} from "@/../src/types/types.ts";
import React from "react";
import SingleTweetLikeComponent from "@/components/profile/SingleTweetLikeComponent.tsx";

interface UserPostsProps {
    postData: Post[] | null;
    showMessagePopup?: boolean;
    setMessagePopupText?: React.Dispatch<React.SetStateAction<string>>;
    setShowMessagePopup?: React.Dispatch<React.SetStateAction<boolean>>;
    setShowPostTweet?: React.Dispatch<React.SetStateAction<boolean>>;
    mes: string;
}

const UserPosts: React.FC<UserPostsProps> = ({mes, setShowPostTweet, postData, showMessagePopup, setMessagePopupText, setShowMessagePopup}) => {

    console.log(postData);
    return (
        <>
            {mes === 'same-user' ? (
                <div className="userPosts w-full bg-sidebarBorderColor">
                    {postData?.length === 0 ? (
                        <div className="h-[30vh] flex flex-col gap-2 justify-center items-center">
                            <div className="text-2xl font-bold">No Post</div>
                            <button
                                onClick={() => setShowPostTweet && setShowPostTweet(true)}
                                className="bg-black text-white p-2 rounded-xl">Post Now</button>
                        </div>
                    ) : (
                        <div className="h-[50vh] overflow-y-scroll flex flex-col items-center mt-2 gap-4 mb-2">
                            <div className="upperPart text-center">
                                <div className="text-2xl text-black text-center font-bold">Posts</div>
                                <button
                                    onClick={() => setShowPostTweet && setShowPostTweet(true)}
                                    className="bg-black text-white p-2 rounded-xl">Post Now
                                </button>
                            </div>
                            <div className="postPart">
                                {postData?.map((post, key: number) => (
                                    <div key={key}>
                                        {post.textContent && (
                                            <>
                                                {(setShowMessagePopup && setMessagePopupText && showMessagePopup) ? (
                                                        <SingleTweetLikeComponent setShowMessagePopup={setShowMessagePopup}
                                                                                  setMessagePopupText={setMessagePopupText}
                                                                                  showMessagePopup={showMessagePopup}
                                                                                  post={post}/>) :
                                                    (<SingleTweetLikeComponent post={post}/>)
                                                }
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="userPosts w-full bg-sidebarBorderColor">
                    {postData?.length === 0 ? (
                        <div className="h-[30vh] flex flex-col gap-2 justify-center items-center">
                            <div className="text-2xl font-bold">No Post Published</div>
                        </div>
                    ) : (
                        <div className="h-[50vh] overflow-y-scroll flex flex-col items-center mt-2 gap-4 mb-2">
                            <div className="postPart">
                                {postData?.map((post, key: number) => (
                                    <div key={key}>
                                        {post.textContent && (
                                            <>
                                                {(setShowMessagePopup && setMessagePopupText && showMessagePopup) ? (
                                                        <SingleTweetLikeComponent setShowMessagePopup={setShowMessagePopup}
                                                                                  setMessagePopupText={setMessagePopupText}
                                                                                  showMessagePopup={showMessagePopup}
                                                                                  post={post}/>) :
                                                    (<SingleTweetLikeComponent post={post}/>)
                                                }
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default UserPosts;