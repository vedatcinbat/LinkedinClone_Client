//@ts-ignore
import React from "react";

const UserHomeMainContent = () => {
    return(
        <div className="flex justify-center">
            <div className="mt-2 p-2 flex flex-col justify-between items-center gap-2">
                <div
                    className="w-[75vh] h-[65vh] flex justify-center items-center text-mainBgColor bg-alertErrorTextColor">Box
                </div>
                <div
                    className="w-[75vh] h-[30vh] flex justify-center items-center text-mainBgColor bg-alertErrorTextColor">Box
                </div>
                <div
                    className="w-[75vh] h-[65vh] flex justify-center items-center text-mainBgColor bg-alertErrorTextColor">Box
                </div>
            </div>
        </div>
    )
}

export default UserHomeMainContent;