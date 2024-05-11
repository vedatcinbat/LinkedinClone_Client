import React from "react";
import {Education} from "@/types/types.ts";
import SingleEducation from "@/components/profile/SingleEducation.tsx";

interface UserEducationsProps {
    educationsData: Education[] | null;
}


const UserEducations: React.FC<UserEducationsProps> = ({educationsData}) => {
    return (
        <div
            // @ts-ignore
            className={`userExperiences w-full bg-sidebarBorderColor h-[50vh] flex flex-col justify-center items-center gap-2 ${educationsData?.length > 0 ? 'overflow-y-scroll' : ''}`}>
            <div className="text-2xl text-black font-bold">Educations</div>
            {educationsData && educationsData.length > 0 ? (
                educationsData.map((education, index) => (
                    //@ts-ignore
                    <SingleEducation edu={education} index={index}/>
                ))
            ) : (
                <div className="overflow-hidden">No Experience Found</div>
            )}
        </div>
    );
}

export default UserEducations;