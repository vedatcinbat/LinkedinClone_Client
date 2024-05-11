//@ts-ignore
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {fetchUserDataProfile} from "@/redux/user/userThunks.ts";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import UserDetails from "@/components/profile/UserDetails.tsx";
import UserPosts from "@/components/profile/UserPosts.tsx";
import UserExperiences from "@/components/profile/UserExperiences.tsx";

const MyProfilePage: React.FC = () => {

    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.auth.userId);
    const currentUserData = useSelector((state: RootState) => state.user.currentUser);
    console.log(currentUserData)

    useEffect(() => {
        if(userId) {
            //@ts-ignore
            dispatch(fetchUserDataProfile(userId));
        }
    }, []);


    return (
        <div>
            {currentUserData ? (
                <div className="userDataContainer w-full flex flex-col justify-between gap-2 p-1">
                    <UserDetails currentUserData={currentUserData} />
                    <UserPosts postData={currentUserData.posts} />
                    <UserExperiences experiencesData={currentUserData.experiences} />
                    <div className="userSchoolsSection w-full h-[30vh] bg-sidebarBorderColor"></div>
                    <div className="userSkillsSection w-full h-[30vh] bg-sidebarBorderColor"></div>
                </div>
            ) : (
                <div className="w-full h-[90vh] flex flex-col text-alertSuccess2BgColor justify-center items-center align-center">
                    <div>You should login first</div>
                    <Button
                        className="w-[20vh] mt-2 rounded-xl text-md text-formBtnTextColor bg-formBtnColor hover:text-formBtnHoverTextColor hover:bg-formBtnHoverColor p-2">
                        <Link to='/login'>
                            Login
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default MyProfilePage;