//@ts-ignore
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import UserSimpleProfileSidebar from "@/components/home/AfterLogin/UserSimpleProfileSidebar.tsx";
import UserHomeMainContent from "@/components/home/AfterLogin/UserHomeMainContent.tsx";
import {Alert, AlertDescription, AlertTitle} from "../../../components/ui/alert.tsx";
import {RocketIcon} from "@radix-ui/react-icons";
import {updateCurrentUserTitle} from "@/redux/user/userSlice.ts";

const UserHomePage = () => {
    /*
        const currentUserData = useSelector((state: RootState) => state.user.currentUser);
        const currentUserAuthData = useSelector((state: RootState) => state.auth);
    */
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.auth.loading);
    const currentUserData = useSelector((state: RootState) => state.user.currentUser);


    useEffect(() => {
        const currentUserTitle = currentUserData ? currentUserData.title : "No Title";
        const currentUserCompany = currentUserData && currentUserData.company ? currentUserData.company.companyName : "No Company";

        // @ts-ignore
        dispatch(updateCurrentUserTitle(currentUserTitle))
        dispatch(updateCurrentUserTitle(currentUserCompany));
    }, [])

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