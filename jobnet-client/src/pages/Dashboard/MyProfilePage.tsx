//@ts-ignore
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {fetchUserDataProfile} from "@/redux/user/userThunks.ts";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

const MyProfilePage: React.FC = () => {

    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.auth.userId);
    const currentUserData = useSelector((state: RootState) => state.user.currentUser);

    useEffect(() => {
        if(userId) {
            //@ts-ignore
            dispatch(fetchUserDataProfile(userId));
        }
    }, [dispatch, userId]);

    console.log(currentUserData);


    return (
        <div>
            {currentUserData ? (
                <div className="text-alertSuccess2BgColor">
                    <div>Welcome, {currentUserData?.firstname}</div>
                    <div>Email: {currentUserData?.email}</div>
                </div>
            ) : (
                <div className="w-full h-[90vh] flex flex-col text-alertSuccess2BgColor flex justify-center items-center align-center">
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