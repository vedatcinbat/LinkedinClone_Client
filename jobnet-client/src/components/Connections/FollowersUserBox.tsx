import React from "react"
import {User} from "@/types/types.ts";

interface FollowersUserBoxProps {
    user: User;
    key: number;
}

const FollowersUserBox: React.FC<FollowersUserBoxProps> = ({user, key}) => {
    return(
        <div key={key} className="w-full h-[10vh] bg-mainBgColor text-white rounded-xl flex justify-start items-center gap-2 p-2">
            <div className="profileImg mr-[10vh]">
                <div className=" w-[7vh] h-[7vh] rounded-full bg-black"></div>
            </div>
            <div className="content w-[80%] h-full bg-followerUserBoxBg rounded-xl flex justify-between items-center p-2">
                <div className="fullNameAndTitle">
                    <div className="flex">
                        <div>{user.firstname}</div>
                        <div>{user.lastname}</div>
                    </div>
                    {user.title && (
                        <div className="title">
                            <div>{user.title}</div>
                        </div>
                    )}
                </div>
                {user.company && (
                    <div className="company ml-4 text-xl">
                        <div>({user.company.companyName})</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FollowersUserBox;