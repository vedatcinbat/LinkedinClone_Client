//@ts-ignore
import React, {useState, useEffect} from "react";
import {ConnectionsPost} from "@/types/types.ts";
import axios, {AxiosResponse} from "axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {setConnectionsPosts} from "@/redux/user/userSlice.ts";
import {Link} from "react-router-dom";
import UserConnectionPost from "@/components/home/AfterLogin/UserConnectionPost.tsx";
import UpdateIcon from '@mui/icons-material/Update';

const UserHomeMainContent = () => {
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const dispatch = useDispatch();
    const connectionsPosts = useSelector((state: RootState) => state.user.connectionPosts);


    const updateCurrentPosts = () => {
        const baseUrl = `http://localhost:5087/api/users/getConnectionPosts`;
        axios.get(baseUrl, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res: AxiosResponse<ConnectionsPost[]>) => {
            dispatch(setConnectionsPosts(res.data));
        }).catch(err => {
            console.log(`Error : ${err}`)
        })
    }



    return(
        <>
            {connectionsPosts.length > 0 ? (
                <>
                    <div className="updateButton w-full p-2 flex justify-end">
                        <button onClick={updateCurrentPosts}
                                className="bg-gray8 flex justify-end text-white rounded-xl right-2 itesm-center p-2 gap-2">
                            <UpdateIcon/>
                            <button>Update</button>
                        </button>
                    </div>
                    <div className="mainConnectionPosts">
                        {connectionsPosts.map((post) => (
                            <div className="text-white flex flex-col items-center gap-2">
                                <UserConnectionPost key={post.postId} post={post}/>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center">
                    <div
                        className="w-[90%] p-4 h-[20vh] bg-gray7 text-white flex justify-center items-center mt-2 rounded-xl">
                        <div className="content flex justify-center items-center flex-col ">
                            <div className="noPost text-2xl font-bold">No Post From Connections</div>
                            <div
                                className="seeOtherUsers bg-gray8 w-[20vh] h-[5vh] rounded-xl flex justify-center items-center">
                                <Link to='/connections' className="text-gray3">See Other Users</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserHomeMainContent;