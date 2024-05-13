//@ts-ignore
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {fetchUserDataProfile} from "@/redux/user/userThunks.ts";
import {Button} from "../../../components/ui/button.tsx";
import {Link} from "react-router-dom";
import UserDetails from "@/components/profile/UserDetails.tsx";
import UserPosts from "@/components/profile/UserPosts.tsx";
import UserExperiences from "@/components/profile/UserExperiences.tsx";
import UserEducations from "@/components/profile/UserEducations.tsx";
import Skills from "@/components/profile/Skills.tsx";
import EditCurrentCompany from "@/components/profile/EditCurrentCompany.tsx";
import EditCurrentTitle from "@/components/profile/EditCurrentTitle.tsx";
import CreatePost from "@/components/profile/CreatePost.tsx";
import FollowersUserBox from "@/components/Connections/FollowersUserBox.tsx";
import {setFollowersData, setFollowingsData, setShowFollowers, setShowFollowings} from "@/redux/user/userSlice.ts";

const MyProfilePage: React.FC = () => {

    const [editCompanyPopup, setEditCompanyPopup] = useState(false);
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const [messagePopupText, setMessagePopupText] = useState<string>('');
    const [editTitlePopup, setEditTitlePopup] = useState(false);
    const [currentTitle, setCurrentTitle] = useState<string>('');

    const [showPostTweet, setShowPostTweet] = useState(false);


    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.auth.userId);
    const currentUserData = useSelector((state: RootState) => state.user.currentUser);
    let showFollowers = useSelector((state: RootState) => state.user.showFollowers);
    let showFollowings = useSelector((state: RootState) => state.user.showFollowings);
    const followersData = useSelector((state: RootState) => state.user.followersData);
    const followingsData = useSelector((state: RootState) => state.user.followingsData);

    useEffect(() => {
        if(userId) {
            //@ts-ignore
            dispatch(fetchUserDataProfile(userId));
        }
    }, []);

    const closeFollowers = () => {
        dispatch(setShowFollowers(false));
        dispatch(setFollowersData([]));
    }

    const closeFollowings = () => {
        dispatch(setShowFollowings(false));
        dispatch(setFollowingsData([]));
    }


    return (
        <div>
            {currentUserData ? (
                <>
                    <div className={`mainCode userDataContainer w-full flex flex-col justify-between gap-2 p-1 ${editCompanyPopup || showMessagePopup || editTitlePopup || showPostTweet || showFollowers || showFollowings ? 'opacity-5' : 'opacity-100'}`}>
                        <UserDetails userId={currentUserData.userId.toString()} setEditTitlePopup={setEditTitlePopup} setEditCompanyPopup={setEditCompanyPopup} currentUserData={currentUserData}  />
                        <UserPosts mes='same-user' setShowPostTweet={setShowPostTweet} showMessagePopup={showMessagePopup} setShowMessagePopup={setShowMessagePopup} setMessagePopupText={setMessagePopupText}  postData={currentUserData.posts} />
                        <UserExperiences experiencesData={currentUserData.experiences} />
                        <UserEducations educationsData={currentUserData.educations} />
                        <Skills skills={currentUserData.skills} mes='same-user' />
                    </div>
                    {editCompanyPopup && (
                        <div className={`w-[80vh] h-[90vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-commentBg ${showMessagePopup ? 'opacity-35' : 'opacity-100'}`}>
                            <EditCurrentCompany setShowMessagePopup={setShowMessagePopup} setMessagePopupText={setMessagePopupText} setEditCompanyPopup={setEditCompanyPopup} />
                        </div>
                    )}
                    {editTitlePopup && (
                        <div className={`w-[80vh] h-[40vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-commentBg ${showMessagePopup ? 'opacity-35' : 'opacity-100'}`}>
                            <EditCurrentTitle currentTitle={currentTitle} setShowMessagePopup={setShowMessagePopup} setMessagePopupText={setMessagePopupText} setEditTitlePopup={setEditTitlePopup} setCurrentTitle={setCurrentTitle}  />
                        </div>
                    )}
                    {showMessagePopup && (
                        <div className={`w-[40vh] h-[16vh] text-center text-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-commentBg flex justify-center items-center rounded-2xl`}>
                            <div>{messagePopupText}</div>
                        </div>
                    )}
                    {showPostTweet && (
                        <div
                            className={`w-[80vh] h-[50vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-commentBg ${showMessagePopup ? 'opacity-35' : 'opacity-100'}`}>
                            <CreatePost currentUserId={currentUserData.userId} setMessagePopupText={setMessagePopupText} setShowMessagePopup={setShowMessagePopup} setShowPostTweet={setShowPostTweet} />
                        </div>
                    )}
                    {showFollowers && (
                        <>
                            {followersData?.length == 0 ? (
                                <div
                                    className="absolute top-[10%] left-[30%] w-[70vh] h-[85vh] bg-gray7 text-white rounded-lg p-2">
                                    <button onClick={closeFollowers}
                                            className="absolute top-1 right-1 p-2 rounded-xl bg-mainBgColor">Close
                                    </button>
                                    <div className="header text-center mt-3 font-bold">
                                        <div>Followers</div>
                                    </div>
                                    <div className="users">
                                        <div>No Follower Found</div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="absolute top-[10%] left-[30%] w-[70vh] h-[85vh] bg-gray7 text-white rounded-lg p-2 flex flex-col justify-start items-center p-2">
                                    <button onClick={closeFollowers}
                                            className="absolute top-1 right-1 p-2 rounded-xl bg-mainBgColor">Close
                                    </button>
                                    <div className="header text-center mt-3 font-bold">
                                        <div>Followers</div>
                                    </div>
                                    <div className="users w-full mt-4">
                                        {followersData?.map((user, key) => (
                                            <FollowersUserBox user={user} key={key}/>
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
                                    <div className="header text-center mt-3 font-bold">
                                        <div>Followings</div>
                                    </div>
                                    <div className="users">
                                        <div>No Following Found</div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="absolute top-[10%] left-[30%] w-[70vh] h-[85vh] bg-gray7 text-white rounded-lg p-2">
                                    <button onClick={closeFollowings}
                                            className="absolute top-1 right-1 p-2 rounded-xl bg-mainBgColor">Close
                                    </button>
                                    <div className="header text-center mt-3 font-bold">
                                        <div>Followings</div>
                                    </div>
                                    <div className="users flex flex-col gap-4 p-4">
                                        {followingsData?.map((user, key) => (
                                            <FollowersUserBox user={user} key={key}/>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </>
            ) : (
                <div
                    className="w-full h-[90vh] flex flex-col text-alertSuccess2BgColor justify-center items-center align-center">
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