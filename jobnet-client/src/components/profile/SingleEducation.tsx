// @ts-ignore
import React from "react";
import {EducationSimpleType} from "@/types/types.ts";

interface SingleEducationProps {
    edu: EducationSimpleType;
    index: number;
}

const SimpleDate = (date: Date) => {
    const parsedDate = new Date(date); // Parse the date string
    const month = parsedDate.toLocaleString('default', {month: 'short'});
    const year = parsedDate.getFullYear();
    return `${month} ${year}`;
}

const SingleEducation = (prop: SingleEducationProps, index: number) => {
    return (
        <>
            <div key={index}
                 className="flex flex-col items-center justify-center bg-commentBg rounded-xl p-4 w-[80vh] text-formBtnHoverTextColor">
                <div className="upperPart w-full flex justify-center gap-4 items-center">
                    <div className="text-2xl">{prop.edu.school.schoolName} - <span
                        className="text-lg">({prop.edu.school.location})</span></div>
                </div>
                <div className="bottomPart flex flex-col justify-center items-center">
                    <div className="text-gray4">-{prop.edu.degree}-</div>
                    <div
                        className="text-gray4">{SimpleDate(prop.edu.startDate)} - {prop.edu.endDate ? SimpleDate(prop.edu.endDate) : 'Still'}</div>
                </div>
            </div>
        </>
    )
}

export default SingleEducation;