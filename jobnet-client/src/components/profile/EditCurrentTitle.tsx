//@ts-ignore
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {updateCurrentUserTitle} from "@/redux/user/userSlice.ts";
//@ts-ignore
const EditCurrentTitle = ({setEditTitlePopup, setShowMessagePopup, setMessagePopupText, setCurrentTitle, currentTitle}) => {

    const userAuthData = useSelector((state: RootState) => state.auth);
    const token = userAuthData.accessToken;
    const dispatch = useDispatch();

    const UpdateCurrentTitle = () => {
        const url = `http://localhost:5087/api/users/1/updateTitle/${currentTitle}`;
        axios.patch(
            url,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        ).then(() => {
            dispatch(updateCurrentUserTitle(currentTitle));

            setEditTitlePopup(false);
            setMessagePopupText(`Your title has been updated to : ${currentTitle}`)
            setShowMessagePopup(true);

            setTimeout(() => {
                setShowMessagePopup(false);
            }, 4000);
        }).catch((err) => {
            console.log(err);
        });
    }


    return (
        <>
            <div className="absolute top-2 right-2 bg-mainBgColor text-white rounded-lg p-2 cursor-pointer" onClick={() => setEditTitlePopup(false)}>Close</div>
            <div className="mainContainer flex flex-col justify-center items-center w-full mt-2">
                <div className="header">
                    <div className="text-2xl font-bold">Set Title</div>
                </div>
                <div className="companyLists w-full flex flex-col items-center justify-center h-[30vh]">
                    <div className="titleInput flex justify-center items-center gap-4 mt-2">
                        <input className="p-2 rounded-lg" type="text" placeholder="Title..." onChange={(e) => setCurrentTitle(e.target.value)}/>
                        <div className="bg-gray8 text-white p-2 text-xs w-[25vh] text-center rounded-xl">Current Title: {currentTitle}</div>
                    </div>
                    <div className="button mt-4">
                        <button
                            onClick={UpdateCurrentTitle}
                            className="p-4 bg-mainBgColor text-white rounded-xl">Set Current Title</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCurrentTitle;