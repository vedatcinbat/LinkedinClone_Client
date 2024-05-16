import React, {useEffect, useState} from 'react';
import {Skill} from "@/types/types.ts";
import SingleSkill from "@/components/profile/SingleSkill.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select.tsx";
import axios from "axios";
import {RootState} from "@/redux/store.ts";
import {useSelector} from "react-redux";

interface SkillProps {
    skills: Skill[] | null;
    mes: string;
}

const Skills: React.FC<SkillProps> = ({skills, mes}) => {

    const [allSkills, setAllSkills] = useState<Skill[]>([]);

    const url = 'http://localhost:5087/api/Skill/allSkills';
    const currentUserAuth = useSelector((state: RootState) => state.auth);
    const token = currentUserAuth.accessToken;

    const [currentSkillId, setCurrentSkillId] = useState<number>(0);
    const [showMessage, setShowMessage] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        axios.get(
            url,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    setAllSkills(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const ChangeCurrentSkillId = (skillId: number) => {
        setCurrentSkillId(skillId);
    }

    const addCurrentSkill = () => {
        const url = `http://localhost:5087/api/users/addSkill/${currentSkillId}`;
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
                setMessages(prevMessages => [...prevMessages, res.status === 200 && !res.data.problemDetails ? 'Skill added successfully' : 'Error occurred while adding skill']);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div
            className={`userExperiences w-full bg-sidebarBorderColor h-[70vh] flex flex-col items-center ${skills && skills?.length > 0 ? 'overflow-y-scroll' : ''}`}>
            <div className="text-2xl text-black font-bold">Skills</div>
            {showMessage && messages.map((message, index) => (
                    <div className="messagePart top-0 right-0 text-md p-2 rounded-lg cursor-pointer text-navbarTextColor">
                        <div key={index} className="text-alerSutccess2BgColor text-sm p-2 rounded-lg">{message}</div>
                    </div>

                )
            )}
            {mes === 'same-user' && (
                <div className="addSkillPart flex justify-center items-center gap-2">
                    <div className="Input">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Add skill"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Technology</SelectLabel>
                                    {allSkills && allSkills.map((skill, index) => (
                                        <SelectItem key={index} value={skill.skillName}
                                                    onMouseEnter={() => ChangeCurrentSkillId(skill.skillId)}>
                                            {skill.skillName}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="addButton ">
                        <button
                            onClick={addCurrentSkill}
                            className="bg-formBtnColor text-formBtnTextColor w-[15vh] p-2 rounded-xl">Add
                        </button>
                    </div>
                </div>
            )}
            {skills && skills.length > 0 ? (
                <div className="mt-4">
                    {skills.map((skill, index) => (
                        <SingleSkill skill={skill} index={index}/>
                    ))}
                </div>
            ) : (
                <>
                    <div className="overflow-hidden">No Skills Found</div>
                </>
            )}
        </div>
    );
}


export default Skills;