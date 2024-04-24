//@ts-ignore
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import UserSimpleProfileSidebar from "@/components/home/AfterLogin/UserSimpleProfileSidebar.tsx";
import UserHomeMainContent from "@/components/home/AfterLogin/UserHomeMainContent.tsx";

const UserHomePage = () => {
    const currentUserAuthData= useSelector((state: RootState) => state.auth);
    const currentUserData = useSelector((state: RootState) => state.user.currentUser);
    console.log(currentUserAuthData);
    console.log(currentUserData);
    return (
        <div className="w-full min-h-screen flex flex-row">
            <div className="userSimpleDataSidebar min-h-screen w-[60vh]">
                <UserSimpleProfileSidebar />
            </div>
            <div className="userMainContent w-full bg-alertErrorBgColor">
                <UserHomeMainContent />
            </div>
        </div>
    );
}


export default UserHomePage;