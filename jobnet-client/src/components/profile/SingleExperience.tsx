import {UserExperienceSimpleType} from "@/types/types.ts";
// @ts-ignore
import React from "react";

interface SingleExperienceProps {
    exp: UserExperienceSimpleType;
    index: number;
}

const SimpleDate = (date: Date) => {
    const parsedDate = new Date(date); // Parse the date string
    const month = parsedDate.toLocaleString('default', { month: 'short' });
    const year = parsedDate.getFullYear();
    return `${month} ${year}`;
}

const SingleExperience = (prop: SingleExperienceProps, index: number) => {
    return (
        <div key={index} className="flex flex-col items-center justify-center bg-commentBg rounded-xl p-4 w-[50vh] text-formBtnHoverTextColor">
            <div>{prop.exp.companyName}</div>
            <div>{prop.exp.title}</div>
            <div>{SimpleDate(prop.exp.startDate)} - {prop.exp.endDate ? SimpleDate(prop.exp.endDate) : 'Still'}</div>
        </div>
    )
}

export default SingleExperience;