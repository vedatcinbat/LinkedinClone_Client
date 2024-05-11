import React from "react";
import {Experience,} from "@/types/types.ts";
import SingleExperience from "@/components/profile/SingleExperience.tsx";

interface UserExperiencesProps {
    experiencesData: Experience[] | null;
}

const UserExperiences: React.FC<UserExperiencesProps> = ({ experiencesData }) => {

    return (
        // @ts-ignore
        <div className={`userExperiences w-full bg-sidebarBorderColor h-[50vh] flex flex-col justify-center items-center gap-2 ${experiencesData.length && 'overflow-y-scroll'}`}>
            {experiencesData && experiencesData.length > 0 ? (
                experiencesData.map((experience, index) => (
                        //@ts-ignore
                        <SingleExperience exp={experience} index={index} />
                ))
            ) : (
                <div className="overflow-hidden">No Experience Found</div>
            )}
        </div>
    );
}
export default UserExperiences;