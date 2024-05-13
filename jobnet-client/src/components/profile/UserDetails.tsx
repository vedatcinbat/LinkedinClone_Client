//@ts-ignore
import React from "react";

// @ts-ignore
const UserDetails = ({currentUserData, setEditCompanyPopup, setEditTitlePopup}) => {

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
                        <div
                            className="text-gray5">{currentUserData.posts ? currentUserData.posts?.length.toString() : "0"}</div>
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
                <div className="company flex flex-col justify-center items-center">
                    <div className="text-white">Company</div>
                    <div
                        onClick={() => setEditCompanyPopup(true)}
                        className="text-gray5 cursor-pointer">{currentUserData.company === null ? "No Company" : currentUserData.company?.companyName}</div>
                </div>
            </div>
            <div className="text-center ml-4 bg-gray7 p-3 rounded-xl">
                <div className="postCount flex flex-col justify-center items-center">
                    <div className="text-white">Title</div>
                    <div
                        onClick={() => setEditTitlePopup(true)}
                        className="text-gray5 cursor-pointer">{currentUserData.title === null ? "(NoTitle)" : currentUserData.title}</div>
                </div>
            </div>
            {currentUserData.aboutMe && (
                <div className="text-center ml-4 bg-gray7 p-3 rounded-xl">
                    <div className="postCount flex flex-col justify-center items-center">
                        <div className="text-white">About Me</div>
                        <div className="text-gray5 cursor-pointer">{currentUserData.aboutMe}</div>
                    </div>
                </div>
            )}
        </div>
    )
}


export default UserDetails;