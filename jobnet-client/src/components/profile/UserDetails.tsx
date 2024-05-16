//@ts-ignore
import React, {useEffect, useState} from "react";
import {RootState} from "@/redux/store.ts";
import axios from "axios";
import {User} from "@/types/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    setFollowersData,
    setFollowingsData,
    setShowFollowers,
    setShowFollowings,
    setShowJob
} from "@/redux/user/userSlice.ts";

interface UserDetailsProps {
    currentUserData: User;
    setEditCompanyPopup?: (value: any) => void;
    setEditTitlePopup?: (value: any) => void;
    mes?: string;
    userId?: string;
    amIFollow?: boolean | null;
    setAmIFollow?: (value: any) => void | null;
}


const UserDetails: React.FC<UserDetailsProps> = ({setAmIFollow, amIFollow, userId, mes, currentUserData, setEditCompanyPopup, setEditTitlePopup}) => {

    const currentUserId = useSelector((state: RootState) => state.auth.userId);
    const isUserLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const currentUserCompany = useSelector((state: RootState) => state.user.currentUserCompany);
    const currentUserTitle = useSelector((state: RootState) => state.user.currentUserTitle);
    const dispatch = useDispatch();


    const handleFollowUnfollow = () => {
        if(amIFollow && setAmIFollow) {
            const baseUrl = `http://localhost:5087/api/Follow/${currentUserId}/unfollow/${userId}`;
            axios.patch(
                `${baseUrl}`,
                null,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            ).then((res) => {
                alert(res.data)
                setAmIFollow(false)
            }).catch(err => {
                console.error(err);
            })
        }

        if(!amIFollow && setAmIFollow) {
            const baseUrl = `http://localhost:5087/api/Follow/${currentUserId}/follow/${userId}`;
            axios.post(
                `${baseUrl}`,
                null,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            ).then((res) => {
                alert(res.data)
                setAmIFollow(true)
            }).catch(err => {
                console.error(err);
            })
        }

    }

    const handleShowPost = () => {
        dispatch(setShowJob(true));
    }


    const getFollowers = () => {
        const baseUrl = `http://localhost:5087/api/users/${userId}/followers`;

        axios.get(`${baseUrl}`).then((res) => {
            dispatch(setFollowersData(res.data));
            dispatch(setShowFollowers(true));
        }).catch(err => {
            console.log(err);
        })
    }

    const getFollowings = () => {
        const baseUrl = `http://localhost:5087/api/users/${userId}/followings`;

        axios.get(`${baseUrl}`).then((res) => {
            dispatch(setShowFollowings(true));
            dispatch(setFollowingsData(res.data));
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <div className={`userInformationSimple flex items-center w-full h-[30vh] bg-sidebarBorderColor`}>
            <div className="profileImg w-[20vh] h-[20vh] rounded-full bg-black"></div>
            <div className="username bg-gray7 p-3 rounded-xl  ml-4">
                <div className="text-3xl text-gray10">{currentUserData.firstname} {currentUserData.lastname}
                </div>
            </div>
            <div className="text-center ml-4 bg-gray7 p-3 rounded-xl">
                <div className="postFollowerFollowing gap-4 flex justify-evenly items-center h-[7vh]">
                    <div
                        className="postCount flex flex-col justify-center items-center hover:bg-black hover:rounded-xl p-4">
                        <div className="text-white">Post</div>
                        <div
                            className="text-gray5">{currentUserData?.posts ? currentUserData.posts?.length.toString() : "0"}</div>
                    </div>
                    <div
                        className="getFollowers flex flex-col justify-center items-center hover:bg-black hover:rounded-xl p-4">
                        <button onClick={getFollowers}>
                            <div className="text-white">Follower</div>
                            <div
                                className="text-gray5">{currentUserData.followerCount}</div>
                        </button>
                    </div>
                    <div
                        className="getFollowings flex flex-col justify-center items-center hover:bg-black hover:rounded-xl p-4">
                        <button onClick={getFollowings}>
                            <div className="text-white">Following</div>
                            <div
                                className="text-gray5">{currentUserData.followingCount}</div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-center ml-4 bg-gray7 p-3 rounded-xl">
                <div className="company flex flex-col justify-center items-center h-[7vh]">
                    <div className="text-white">Company</div>
                    <div
                        onClick={() => setEditCompanyPopup ? setEditCompanyPopup(true) : null}
                        className="text-gray5 cursor-pointer">{currentUserCompany === "" ? 'No Company' : currentUserCompany}</div>
                </div>
            </div>
            <div className="text-center ml-4 bg-gray7 p-3 rounded-xl">
                <div className="postCount flex flex-col justify-center items-center h-[7vh]">
                    <div className="text-white">Title</div>
                    <div
                        onClick={() => setEditTitlePopup && setEditTitlePopup(true)}
                        className="text-gray5 cursor-pointer">{currentUserTitle === "" ? "No Title" : currentUserTitle}</div>
                </div>
            </div>
            {mes === 'another-user' && (
                <>
                    {isUserLoggedIn && (
                        <div className="text-center ml-4 bg-gray7 p-3 rounded-xl">
                            <div className="followUnfollowArea flex justify-evenly items-center h-[7vh] w-[20vh]">
                                <button
                                    onClick={handleFollowUnfollow}
                                    className="bg-mainBgColor text-white w-[10vh] h-[6vh] rounded-2xl">{amIFollow ? 'Unfollow' : 'Follow'}</button>
                            </div>
                        </div>

                    )}
                </>
            )}
            {currentUserData.aboutMe && (
                <div className="text-center ml-4 bg-gray7 p-3 rounded-xl">
                    <div className="postCount flex flex-col justify-center items-center">
                        <div className="text-white">About Me</div>
                        <div className="text-gray5 cursor-pointer">{currentUserData.aboutMe}</div>
                    </div>
                </div>
            )}
            {currentUserId?.toString() === userId && (
                <div
                    className="postJob flex flex-col justify-center items-center bg-gray8 rounded-xl text-white hover:bg-black hover:rounded-xl p-4 ml-2">
                    <button onClick={handleShowPost}>Post Job</button>
                </div>
            )}
        </div>


    )
}


export default UserDetails;