//@ts-ignore
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "@/types/types.ts";
import axios from "axios";
import UserDetails from "@/components/profile/UserDetails.tsx";
import UserPosts from "@/components/profile/UserPosts.tsx";
import UserExperiences from "@/components/profile/UserExperiences.tsx";
import UserEducations from "@/components/profile/UserEducations.tsx";
import Skills from "@/components/profile/Skills.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { setFollowersData, setFollowingsData, setShowFollowers, setShowFollowings } from "@/redux/user/userSlice.ts";
import FollowersUserBox from "@/components/Connections/FollowersUserBox.tsx";

interface UserParams {
    userId: string;
}

const UserPage = () => {
    //@ts-ignore
    const { userId } = useParams<UserParams>();
    const currentUserId = useSelector((state: RootState) => state.auth.userId);
    const [userData, setUserData] = useState<User | null>(null);
    const [amIFollow, setAmIFollow] = useState<boolean | null>(null);
    let showFollowers = useSelector((state: RootState) => state.user.showFollowers);
    let showFollowings = useSelector((state: RootState) => state.user.showFollowings);

    const dispatch = useDispatch();
    const followersData = useSelector((state: RootState) => state.user.followersData);
    const followingsData = useSelector((state: RootState) => state.user.followingsData);


    useEffect(() => {
        console.log(followingsData)
    }, [])

    useEffect(() => {
        const baseUrl = `http://localhost:5087/api/users/${userId}/profile`;
        const amIFollowingThisUser = `http://localhost:5087/api/Follow/${currentUserId}/isFollowing/${userId}`;
        try {
            axios.get(`${baseUrl}`).then(res => {
                setUserData(res.data);
            });
            axios.get(`${amIFollowingThisUser}`).then(res => {
                setAmIFollow(res.data)
            }).catch(err => {
                console.log(err);
            });
            //@ts-ignore
        } catch (err) {
            console.log(err);
            setUserData(null);
        }
    }, [followersData, followingsData, amIFollow]);

    const closeFollowers = () => {
        dispatch(setShowFollowers(false));
        dispatch(setFollowersData([]));
    }

    const closeFollowings = () => {
        dispatch(setShowFollowings(false));
        dispatch(setFollowingsData([]));
    }

    return (
        <>
            {userData !== null ? (
                <div className={`${(showFollowers || showFollowings) && 'h-[92vh] overflow-hidden'}`}>
                    <div
                        className={`mainCode userDataContainer w-full flex flex-col justify-between gap-2 p-1 ${showFollowers || showFollowings ? 'opacity-15' : 'opacity-100'}`}>
                        <UserDetails setAmIFollow={setAmIFollow} amIFollow={amIFollow} userId={userId} currentUserData={userData} mes={(currentUserId?.toString() !== userId) ? 'another-user' : 'same-user'} />
                        <UserPosts publisherUser={`${userData.firstname} ${userData.lastname}`} postData={userData.posts} mes={(currentUserId?.toString() !== userId) ? 'another-user' : 'same-user'} />
                        <UserExperiences experiencesData={userData.experiences} />
                        <UserEducations educationsData={userData.educations} />
                        <Skills skills={userData.skills} mes={(currentUserId?.toString() !== userId) ? 'another-user' : 'same-user'} />
                    </div>
                    {showFollowers && (
                        <>
                            {followersData?.length == 0 ? (
                                <div
                                    className="absolute top-[10%] left-[30%] w-[70vh] h-[85vh] bg-gray7 text-white rounded-lg p-2">
                                    <button onClick={closeFollowers}
                                        className="absolute top-1 right-1 p-2 rounded-xl bg-mainBgColor">Close
                                    </button>
                                    <div className="header text-center">
                                        <div>Followers</div>
                                    </div>
                                    <div className="users">
                                        <div>No Follower Found</div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="absolute top-[10%] left-[30%] w-[70vh] h-[85vh] bg-gray7 text-white rounded-lg flex flex-col justify-start items-center p-2">
                                    <button onClick={closeFollowers}
                                        className="absolute top-1 right-1 p-2 rounded-xl bg-mainBgColor">Close
                                    </button>
                                    <div className="header">
                                        <div>Followers</div>
                                    </div>
                                    <div className="users w-full mt-4">
                                        {followersData?.map((user, key) => (
                                            <FollowersUserBox user={user} key={key} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    {showFollowings && (
                        <>
                            {followingsData?.length == 0 ? (
                                <div
                                    className="absolute top-[10%] left-[30%] w-[70vh] h-[85vh] bg-gray7 text-white rounded-lg p-2">
                                    <button onClick={closeFollowings}
                                        className="absolute top-1 right-1 p-2 rounded-xl bg-mainBgColor">Close
                                    </button>
                                    <div className="header">
                                        <div>Followings</div>
                                    </div>
                                    <div className="users">
                                        <div>No Following Found</div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="absolute top-[10%] left-[30%] w-[70vh] h-[85vh] bg-gray7 text-white rounded-l flex flex-col justify-start items-center p-2">
                                    <button onClick={closeFollowings}
                                        className="absolute top-1 right-1 p-2 rounded-xl bg-mainBgColor">Close
                                    </button>
                                    <div className="header">
                                        <div>Followings</div>
                                    </div>
                                    <div className="users w-full mt-4">
                                        {followingsData?.map((user, key) => (
                                            <FollowersUserBox user={user} key={key} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <>
                    <div className="text-text-formBtnHoverTextColor">No user found !</div>
                </>
            )}
        </>
    )
}


export default UserPage;