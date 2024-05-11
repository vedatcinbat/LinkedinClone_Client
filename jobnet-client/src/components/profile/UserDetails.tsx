//@ts-ignore
import React from "react";

// @ts-ignore
const UserDetails = ({currentUserData}) => {
    return (
        <div className="userInformationsSimple flex items-center w-full h-[30vh] bg-sidebarBorderColor">
            <div className="profileImg w-[20vh] h-[20vh] rounded-full bg-black"></div>
            <div className="username bg-gray7 p-3 rounded-xl  ml-4">
                <div className="text-3xl text-gray10">{currentUserData.firstname} {currentUserData.lastname}
                </div>
            </div>
            <div className="text-center ml-4 bg-gray7 p-3 rounded-xl">
                <div className="postFollowerFollowing gap-4 flex justify-evenly items-center">
                    <div className="postCount flex flex-col justify-center items-center">
                        <div className="text-white">Post</div>
                        <div className="text-gray5">{currentUserData.posts?.length.toString()}</div>
                    </div>
                    <div className="postCount flex flex-col justify-center items-center">
                        <div className="text-white">Follower</div>
                        <div
                            className="text-gray5">{currentUserData.followers ? currentUserData.followers.length : "0"}</div>
                    </div>
                    <div className="postCount flex flex-col justify-center items-center">
                        <div className="text-white">Following</div>
                        <div
                            className="text-gray5">{currentUserData.following ? currentUserData.following.length : "0"}</div>
                    </div>

                </div>
            </div>
            <div className="text-center ml-4 bg-gray7 p-3 rounded-xl">
                <div className="postCount flex flex-col justify-center items-center">
                    <div className="text-white">Company</div>
                    <div
                        className="text-gray5">{currentUserData.company === null ? "No Company" : currentUserData.company?.companyName}</div>
                </div>
            </div>
        </div>
    )
}


export default UserDetails;