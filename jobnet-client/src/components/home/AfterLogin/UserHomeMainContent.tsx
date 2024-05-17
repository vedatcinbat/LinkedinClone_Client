//@ts-ignore
import React, {useState, useEffect} from "react";
import {ConnectionsPost} from "@/types/types.ts";
import axios, {AxiosResponse} from "axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {setConnectionsPosts} from "@/redux/user/userSlice.ts";
import {Link} from "react-router-dom";
import UserConnectionPost from "@/components/home/AfterLogin/UserConnectionPost.tsx";

const UserHomeMainContent = () => {
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const dispatch = useDispatch();
    const connectionsPosts = useSelector((state: RootState) => state.user.connectionPosts);

    useEffect(() => {
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
    }, [])



    return(
        <>
            {connectionsPosts.length > 0 ? (
                <>
                    <>
                        {connectionsPosts.map((post) => (
                            <div className="text-white flex flex-col items-center gap-2">
                                <UserConnectionPost key={post.postId} post={post}/>
                            </div>
                        ))}
                    </>
                </>
            ) : (
                <div className="flex justify-center items-center">
                    <div
                        className="w-[90%] p-4 h-[20vh] bg-gray7 text-white flex justify-center items-center mt-2 rounded-xl">
                        <div className="content flex justify-center items-center flex-col ">
                        <div className="noPost text-2xl font-bold">No Post From Connections</div>
                            <div className="seeOtherUsers bg-gray8 w-[20vh] h-[5vh] rounded-xl flex justify-center items-center">
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