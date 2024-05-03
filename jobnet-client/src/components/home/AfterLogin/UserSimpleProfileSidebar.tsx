//@ts-ignore
import React from "react";
import {RootState} from "@/redux/store.ts";
import {useSelector} from "react-redux";
import {User} from "@/types/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

const UserSimpleProfileSidebar = () => {

    const currentUserData: User | null = useSelector((state: RootState) => state.user.currentUser);

    return (
        <div className="w-[40vh] h-[65vh] bg-mainBgColor mt-2 ml-2 rounded-xl flex flex-col justify-evenly items-center p-2 border border-sidebarBorderColor">
            <div className="profilePictureContainer bg-sidebarBgColor w-full h-[30%] rounded-2xl mb-2 flex justify-center items-center border border-b-alertSuccessTextColor">
                {currentUserData?.profilePictureUrl !== null ? (
                    <>
                        <img src={currentUserData?.profilePictureUrl} alt="Profile Picture" className="profilePicture h-[10vh] w-[10vh] bg-navbarBgColor rounded-full"/>
                    </>
                    ) : (
                    <>
                        <div className="profilePicture h-[10vh] w-[10vh] bg-navbarBgColor rounded-full border border-sidebarBorderColor"></div>
                    </>
                    )}
            </div>
            <div className="userDetails  w-full h-[50%]  rounded-2xl flex flex-col justify-between">
                <div className="fullName bg-navbarBgColor w-full text-center rounded-xl flex justify-center items-center gap-2 h-[7vh]">
                    <div className="text-navbarTextColor">Name</div>
                    <div className="text-formBtnHoverTextColor">{currentUserData?.firstname} {currentUserData?.lastname}</div>
                </div>
                <div className="email w-full text-center bg-navbarBgColor rounded-xl flex justify-center items-center gap-2 h-[7vh]">
                    <div className="text-navbarTextColor">Email</div>
                    <div className="text-formBtnHoverTextColor">{currentUserData?.email}</div>
                </div>
                <div className="country w-full text-center bg-navbarBgColor rounded-xl flex justify-center items-center gap-2 h-[7vh]">
                    <div className="text-navbarTextColor">Country</div>
                    <div className="text-formBtnHoverTextColor">{currentUserData?.country}</div>
                </div>
                <div className="currentLanguage w-full text-center bg-navbarBgColor rounded-xl flex justify-center items-center gap-2 h-[7vh]">
                    <div className="text-navbarTextColor">Current Language</div>
                    <div className="text-formBtnHoverTextColor">{currentUserData?.currentLanguage}</div>
                </div>
            </div>
            <div className="seeProfileButton w-full flex justify-center mt-4">
                <Button
                    className="rounded-xl text-md text-formBtnTextColor bg-formBtnColor hover:text-formBtnHoverTextColor hover:bg-formBtnHoverColor p-2">
                    <Link to='/my-profile'>
                        Profile
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default UserSimpleProfileSidebar;