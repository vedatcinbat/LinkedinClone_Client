//@ts-ignore
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import UserSimpleProfileSidebar from "@/components/home/AfterLogin/UserSimpleProfileSidebar.tsx";
import UserHomeMainContent from "@/components/home/AfterLogin/UserHomeMainContent.tsx";
import {Alert, AlertDescription, AlertTitle} from "../../../components/ui/alert.tsx";
import {RocketIcon} from "@radix-ui/react-icons";

const UserHomePage = () => {
    /*
        const currentUserData = useSelector((state: RootState) => state.user.currentUser);
        const currentUserAuthData = useSelector((state: RootState) => state.auth);
    */
    const currentUserData = useSelector((state: RootState) => state.user.currentUser);
    console.log(currentUserData)
    const isLoading = useSelector((state: RootState) => state.auth.loading);

    return (
        <div className="w-full min-h-screen flex flex-row">
            {isLoading ? (
                <>
                    <div className="absolute bottom-2 right-2">
                        <Alert className="bg-alertSuccess2BgColor text-alertErrorTextColor p-1">
                            <RocketIcon className="h-4 w-4"/>
                            <AlertTitle>Loading...</AlertTitle>
                            <AlertDescription>Information's are loading</AlertDescription>
                        </Alert>
                    </div>
                </>) : (
                <>
                    <div className="userSimpleDataSidebar min-h-screen w-[60vh]">
                        <UserSimpleProfileSidebar/>
                    </div>
                    <div className="userMainContent w-full bg-mainBgColor">
                        <UserHomeMainContent/>
                    </div>
                </>
            )}
        </div>
    );
}


export default UserHomePage;