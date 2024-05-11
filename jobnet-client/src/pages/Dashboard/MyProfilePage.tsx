//@ts-ignore
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {fetchUserDataProfile} from "@/redux/user/userThunks.ts";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import UserDetails from "@/components/profile/UserDetails.tsx";
import UserPosts from "@/components/profile/UserPosts.tsx";
import UserExperiences from "@/components/profile/UserExperiences.tsx";
import UserEducations from "@/components/profile/UserEducations.tsx";
import Skills from "@/components/profile/Skills.tsx";
import EditCurrentCompany from "@/components/profile/EditCurrentCompany.tsx";

const MyProfilePage: React.FC = () => {

    const [editCompanyPopup, setEditCompanyPopup] = useState(false);
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const [messagePopupText, setMessagePopupText] = useState<string>('');

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
                <>
                    <div className={`mainCode userDataContainer w-full flex flex-col justify-between gap-2 p-1 ${editCompanyPopup || showMessagePopup ? 'opacity-5' : 'opacity-100'}`}>
                        <UserDetails setEditCompanyPopup={setEditCompanyPopup} currentUserData={currentUserData} />
                        <UserPosts postData={currentUserData.posts} />
                        <UserExperiences experiencesData={currentUserData.experiences} />
                        <UserEducations educationsData={currentUserData.educations} />
                        <Skills skills={currentUserData.skills} />
                    </div>
                    {editCompanyPopup && (
                        <div className={`w-[80vh] h-[90vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-commentBg ${showMessagePopup ? 'opacity-35' : 'opacity-100'}`}>
                            <EditCurrentCompany setShowMessagePopup={setShowMessagePopup} setMessagePopupText={setMessagePopupText} setEditCompanyPopup={setEditCompanyPopup} />
                        </div>
                    )}
                    {showMessagePopup && (
                        <div className={`w-[40vh] h-[16vh] text-center text-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-commentBg flex justify-center items-center rounded-2xl`}>
                            <div>{messagePopupText}</div>
                        </div>
                    )}
                </>
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