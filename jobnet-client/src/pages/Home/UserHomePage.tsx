//@ts-ignore
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import UserSimpleProfileSidebar from "@/components/home/AfterLogin/UserSimpleProfileSidebar.tsx";
import UserHomeMainContent from "@/components/home/AfterLogin/UserHomeMainContent.tsx";
import {Alert, AlertDescription, AlertTitle} from "../../../components/ui/alert.tsx";
import {RocketIcon} from "@radix-ui/react-icons";
import {setShowLikes, updateCurrentUserTitle} from "@/redux/user/userSlice.ts";
import LikeUserBox from "@/components/home/AfterLogin/LikeUserBox.tsx";

const UserHomePage = () => {
    /*
        const currentUserData = useSelector((state: RootState) => state.user.currentUser);
        const currentUserAuthData = useSelector((state: RootState) => state.auth);
    */
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.auth.loading);
    const currentUserData = useSelector((state: RootState) => state.user.currentUser);
    const showLikes = useSelector((state: RootState) => state.user.showLikes);
    const postLikes = useSelector((state: RootState) => state.user.postLikes);


    useEffect(() => {
        const currentUserTitle = currentUserData ? currentUserData.title : "No Title";
        const currentUserCompany = currentUserData && currentUserData.company ? currentUserData.company.companyName : "No Company";

        // @ts-ignore
        dispatch(updateCurrentUserTitle(currentUserTitle))
        dispatch(updateCurrentUserTitle(currentUserCompany));
        console.log(postLikes)
    }, [])

    const closeLikes = () => {
        dispatch(setShowLikes(false))
    }

    return (
        <div className={`w-full min-h-screen flex flex-row ${showLikes ? 'overflow-hidden' : ''}`}>
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
                    <div className={`userSimpleDataSidebar min-h-screen w-[60vh]`}>
                        <UserSimpleProfileSidebar/>
                    </div>
                    <div className={`userMainContent w-full bg-mainBgColor ${showLikes ? 'opacity-20' : 'opacity-100'}`}>
                        <UserHomeMainContent/>
                    </div>
                    {showLikes && (
                        <div className="showLikeContainer fixed top-[10%] left-[40%]">
                            <div
                                className="rounded-xl w-[60vh] h-[80vh] bg-gray8 text-white flex overflow-y-scroll flex-col justify-start items-center p-2 gap-2">
                                <button
                                    className="absolute top-2 right-2 p-2 bg-gray9 text-white hover:text-black hover:bg-white rounded-xl"
                                    onClick={closeLikes}>Close
                                </button>
                                <div className="header">
                                    <div className="text-2xl font-bold mb-2">Likes</div>
                                </div>
                                <div className="likedUsers w-full flex flex-col items-center">
                                    {postLikes.map((like, index) => (
                                        <LikeUserBox user={like.user} index={index}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}


export default UserHomePage;