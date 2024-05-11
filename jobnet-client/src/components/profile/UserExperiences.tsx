import React from "react";
import {Experience,} from "@/types/types.ts";
import SingleExperience from "@/components/profile/SingleExperience.tsx";

interface UserExperiencesProps {
    experiencesData: Experience[] | null;
}

const UserExperiences: React.FC<UserExperiencesProps> = ({ experiencesData }) => {

    return (
        <div
            // @ts-ignore
            className={`userExperiences w-full bg-sidebarBorderColor h-[50vh] flex flex-col justify-center items-center gap-2 ${experiencesData?.length > 0 ? 'overflow-y-scroll' : ''}`}>
            <div className="text-2xl text-black font-bold">Experiences</div>
            {experiencesData && experiencesData.length > 0 ? (
                experiencesData.map((experience, index) => (
                    //@ts-ignore
                    <SingleExperience exp={experience} index={index}/>
                ))
            ) : (
                <div className="overflow-hidden">No Experience Found</div>
            )}
        </div>
    );
}
export default UserExperiences;