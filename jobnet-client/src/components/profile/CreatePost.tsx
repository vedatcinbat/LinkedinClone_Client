import React from "react";
import {UserPostRequest} from "@/types/types.ts";
import {RootState} from "@/redux/store.ts";
import {useSelector} from "react-redux";
import axios from "axios";


interface CreatePostProps {
    setShowPostTweet: React.Dispatch<React.SetStateAction<boolean>>;
    setShowMessagePopup: React.Dispatch<React.SetStateAction<boolean>>;
    setMessagePopupText: React.Dispatch<React.SetStateAction<string>>;
    currentUserId: number;
}

const CreatePostRequest: UserPostRequest = {
    caption: "",
    postType: 1,
    textContent: "",
    imageContent: null,
    imagesContent: null
}



const CreatePost: React.FC<CreatePostProps> = ({setShowPostTweet, setShowMessagePopup, setMessagePopupText}) => {

    const token = useSelector((state: RootState) => state.auth.accessToken);
    //const dispatch = useDispatch();

    const postTweet = () => {
        const url = `http://localhost:5087/api/Post/createPost`;
        axios.post(
            url,
            CreatePostRequest,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        ).then(() => {
            setShowPostTweet(false);
            setShowMessagePopup(true);
            setMessagePopupText("Post created successfully");

            setTimeout(() => {
                setShowMessagePopup(false);
            }, 2000);

        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <>
            <div className="absolute top-2 right-2 bg-mainBgColor text-white rounded-lg p-2 cursor-pointer" onClick={() => setShowPostTweet(false)}>Close</div>
            <div className="mainPart flex flex-col items-center mt-2">
                <div className="text-2xl font-bold ">Create Post</div>
                <textarea onChange={(e) => CreatePostRequest.textContent = e.target.value}
                          className="w-[50vh] h-[20vh] mt-4 text-navbarTextColor bg-mainBgColor rounded-xl p-2"
                          placeholder="Write your post here..."></textarea>
                <textarea onChange={(e) => CreatePostRequest.caption = e.target.value}
                          className="w-[50vh] h-[6vh] mt-4 text-navbarTextColor bg-mainBgColor rounded-xl p-2"
                          placeholder="Caption"></textarea>
                <button onClick={postTweet} className="bg-mainBgColor text-white p-2 rounded-xl w-[10vh] mt-4">Post</button>
            </div>
        </>
    )
}

export default CreatePost;