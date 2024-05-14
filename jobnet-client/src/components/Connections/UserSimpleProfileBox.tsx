import React from "react";
import {UserSimpleType} from "@/types/types.ts";
import {Link} from "react-router-dom";
import {RootState} from "@/redux/store.ts";
import {useSelector} from "react-redux";

interface UserSimpleProfileBoxProps {
    user: UserSimpleType;
    key: number;
}


const UserSimpleProfileBox: React.FC<UserSimpleProfileBoxProps> = ({user, key}) => {
    const toUser = `/user/${user.userId}`;

    const currentUserId = useSelector((state: RootState) => state.auth.userId);

    const isUserMe = user.userId === currentUserId;

    return(
        <Link to={`${isUserMe ? '/my-profile' : `${toUser}`}`}>
            <div
                key={key}
                className={`w-[25vh] h-[30vh] text-white rounded-xl flex flex-col items-center justify-between p-2 ${isUserMe ? 'bg-gray6' : 'bg-gray8'}`}>
                <div className="profilImgAndName flex flex-col items-center">
                    <div className="mb-2 bg-mainBgColor w-[10vh] h-[10vh] rounded-full"></div>
                    <div>{user.firstname} {user.lastname}</div>
                </div>
                <div className="titleAndCompany flex flex-col justify-center items-center text-center">
                    <div>{user.title && user.title}</div>
                    <div>{user.company && (user.company.companyName)}</div>
                </div>
                {user.aboutMe && (
                    <div className="aboutMe">
                        <div className="text-xs text-gray4">{user.aboutMe}</div>
                    </div>
                )}
            </div>
        </Link>
    )
}

export default UserSimpleProfileBox;