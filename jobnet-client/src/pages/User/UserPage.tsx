//@ts-ignore
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {User} from "@/types/types.ts";
import axios from "axios";
import UserDetails from "@/components/profile/UserDetails.tsx";
import UserPosts from "@/components/profile/UserPosts.tsx";
import UserExperiences from "@/components/profile/UserExperiences.tsx";
import UserEducations from "@/components/profile/UserEducations.tsx";
import Skills from "@/components/profile/Skills.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";

interface UserParams {
    userId: string;
}

const UserPage = () => {
    //@ts-ignore
    const { userId } = useParams<UserParams>();
    const currentUserId = useSelector((state: RootState) => state.auth.userId);
    const [userData, setUserData] = useState<User | null>(null);
    const [amIFollow, setAmIFollow] = useState<boolean | null>(null);


    useEffect(() => {
        const baseUrl = `http://localhost:5087/api/users/${userId}/profile`;
        const amIFollowingThisUser = `http://localhost:5087/api/Follow/${currentUserId}/isFollowing/${userId}`;
        try {
            axios.get(`${baseUrl}`).then(res => {
                setUserData(res.data);
            });
            axios.get(`${amIFollowingThisUser}`).then(res => {
                setAmIFollow(res.data)
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            });
            //@ts-ignore
        } catch (err) {
            console.log(err);
            setUserData(null);
        }
    }, []);



    return(
        <>
            {userData !== null ? (
                <>
                    <div
                        className={`mainCode userDataContainer w-full flex flex-col justify-between gap-2 p-1`}>
                        <UserDetails setAmIFollow={setAmIFollow} amIFollow={amIFollow} userId={userId} currentUserData={userData} mes={(currentUserId?.toString() !== userId) ? 'another-user' : 'same-user'}  />
                        <UserPosts postData={userData.posts} mes={(currentUserId?.toString() !== userId) ? 'another-user' : 'same-user'} />
                        <UserExperiences experiencesData={userData.experiences} />
                        <UserEducations educationsData={userData.educations} />
                        <Skills skills={userData.skills} mes={(currentUserId?.toString() !== userId) ? 'another-user' : 'same-user'}  />
                    </div>
                </>
            ) : (
                <>
                    <div className="text-text-formBtnHoverTextColor">No user found !</div>
                </>
            )}
        </>
    )
}


export default UserPage;