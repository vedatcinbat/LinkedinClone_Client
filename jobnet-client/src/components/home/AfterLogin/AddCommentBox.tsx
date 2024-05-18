import React from "react";

const AddCommentBox: React.FC = () => {
    return(
        <div className="flex justify-center items-center w-full h-20 bg-gray8">
            <input type="text" placeholder="Add a comment" className="w-[90%] h-10 bg-gray7 text-white rounded-xl"/>
            <button className="w-[10%] h-10 bg-gray7 text-white rounded-xl">Add</button>
        </div>
    )
}

export default AddCommentBox;