import React, { useState } from "react";
import { Skill } from "@/types/types.ts";
import { SkillIndustry } from "@/types/enums.ts";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";

interface SingleSkillProps {
    skill: Skill;
    index: number;
}

const SingleSkill: React.FC<SingleSkillProps> = ({ skill }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const industryName = getIndustryName(skill.skillIndustry);

    const [messages, setMessages] = useState<string[]>([]);


    const currentAuthData = useSelector((state: RootState) => state.auth);
    const token = currentAuthData.accessToken;

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    const deleteSkill = (skillId: number) => {
        const url = `http://localhost:5087/api/users/removeSkill/${skillId}`;

        axios.patch(
            url,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )
            .then((res) => {
                if(res.status === 200 && !res.data.problemDetails) {
                    setMessages([...messages, 'Skill deleted successfully']);
                    setShowMessage(true);

                    setTimeout(() => {
                        setShowMessage(false);
                    }, 2000);
                }else if(res.data.problemTitle) {
                    setMessages([...messages, res.data.problemTitle]);
                    setShowMessage(true);

                    setTimeout(() => {
                        setShowMessage(false);
                    }, 2000);
                }else {
                    setMessages([...messages, 'Error occurred while deleting skill']);
                    setShowMessage(true);

                    setTimeout(() => {
                        setShowMessage(false);
                    }, 2000);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex items-center justify-center bg-commentBg rounded-xl p-4 w-[50vh] text-formBtnHoverTextColor mb-4 relative"
        >
            <div className="messagePart absolute top-0 right-0 text-md p-2 rounded-lg cursor-pointer bg-mainBgColor text-navbarTextColor">
                {showMessage && messages.map((message, index) => (
                    <div key={index} className="text-alertSuccess2BgColor text-sm p-2 rounded-lg">{message}</div>
                ))}
            </div>
            <div className="mainPart flex flex-col text-center">
                <div>{skill.skillName}</div>
                <div className="text-gray6">({industryName})</div>
            </div>
            {isHovered && (
                <button
                    onClick={() => deleteSkill(skill.skillId)}
                    className="deletePart absolute top-0 right-0 text-md p-2 rounded-lg cursor-pointer bg-mainBgColor text-navbarTextColor">Delete</button>
            )}
        </div>
    );
}

const getIndustryName = (industry: SkillIndustry): string => {
    switch (industry) {
        case SkillIndustry.Programming:
            return 'Programming';
        case SkillIndustry.Design:
            return 'Design';
        case SkillIndustry.Marketing:
            return 'Marketing';
        case SkillIndustry.Sales:
            return 'Sales';
        case SkillIndustry.Communication:
            return 'Communication';
        case SkillIndustry.Leadership:
            return 'Leadership';
        case SkillIndustry.ProblemSolving:
            return 'Problem Solving';
        case SkillIndustry.Creativity:
            return 'Creativity';
        case SkillIndustry.Organization:
            return 'Organization';
        case SkillIndustry.Teamwork:
            return 'Teamwork';
        case SkillIndustry.Other:
            return 'Other';
        default:
            return 'Unknown';
    }
}

export default SingleSkill;