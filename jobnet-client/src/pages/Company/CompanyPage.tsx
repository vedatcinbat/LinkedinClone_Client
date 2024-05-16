import React, {useState, useEffect} from "react";
import axios from "axios";
import {Company} from "@/types/types.ts";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
interface CompanyParams {
    companyId: string;
}


const CompanyPage: React.FC = () => {
    //@ts-ignore
    const { companyId } = useParams<CompanyParams>();
    const currentUserId = useSelector((state: RootState) => state.auth.userId);
    const [companyData, setCompanyData] = useState<Company | null>(null);
    const reqUrl = `http://localhost:5087/api/Company/${companyId}`;

    useEffect(() => {
        axios.get(`${reqUrl}`).then(res => {
            setCompanyData(res.data);
        }).catch(err => {
            console.log(err);
            setCompanyData(null);
        });
    }, [])


    const goToUserPage = (userId: string): string => {
        if(currentUserId?.toString() !== userId) {
            return `http://localhost:5173/user/${userId}`;
        }else {
            return `http://localhost:5173/my-profile`;
        }
    }


    // @ts-ignore
    return(
        <>
            {companyData === null ? (
                <>
                    <div>Company Data Not Found</div>
                </>
                ) : (
                <div className="w-full h-[90vh] bg-mainBgColor p-1">
                    <div className="CompanyDetails bg-gray8 w-full h-[30vh] flex justify-center items-center rounded-xl">
                        <div className="content flex justify-center items-center bg-mainBgColor w-[80vh] h-[20vh] rounded-xl">
                            <div className="upperPart">
                                <div
                                    className="text-formBtnHoverTextColor text-3xl mr-[10vh]">{companyData?.companyName}</div>
                            </div>
                            <div className="buttomPart">
                                <div
                                    className="text-formBtnHoverTextColor text-lg mr-[10vh]"><span
                                    className="text-gray5 text-xs">Description: </span>{companyData?.description}
                                </div>
                                <div
                                    className="text-formBtnHoverTextColor text-md mr-[10vh]"><span
                                    className="text-gray5 text-xs">Employee Count: </span>{companyData?.talentManagers?.length}
                                </div>
                                <div
                                    className="text-formBtnHoverTextColor text-md mr-[10vh]"><span
                                    className="text-gray5 text-xs">Job Count: </span>{companyData?.currentAvailableJobs?.length}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="EmployeesHere mt-2 bg-gray8 w-full h-[40vh] flex justify-center items-center rounded-xl">
                        {companyData.talentManagers?.length !== 0 ? (
                            <div className="talentManagers flex justify-center gap-2 overflow-x-auto text-center">
                                {companyData.talentManagers?.map((emp) => (
                                    <Link to={goToUserPage(emp.userId.toString())}>
                                        <div
                                            className="bg-gray3 text-black w-[25vh] h-[30vh] rounded-xl flex flex-col items-center justify-evenly cursor-pointer">
                                            <div
                                                className="profileImg rounded-full bg-mainBgColor w-[8vh] h-[8vh]"></div>
                                            <div
                                                className="text-xl text-mainBgColor">{emp.firstname?.toUpperCase()} {emp.lastname?.toUpperCase()}</div>
                                            <div className="text-sm text-gray7">{emp.title}</div>
                                            <div className="text-xs text-gray7">{emp.country}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="text-2xl text-navbarTextColor">No Employee Found</div>
                            </>
                        )}
                    </div>
                    <div className="OpeningJobs mt-2 bg-gray8 w-full h-[40vh] flex justify-center items-center rounded-xl">
                        {companyData.currentAvailableJobs?.length !== 0 ? (
                            <div className="talentManagers flex justify-center gap-2 overflow-x-auto">
                                {companyData.currentAvailableJobs?.map((job) => (
                                    <div
                                        className="bg-gray3 text-black w-[35vh] h-[30vh] rounded-xl flex flex-col items-center justify-evenly cursor-pointer">
                                        <div className="text-xl">{job.jobTitle}</div>
                                        <div className="text-md text-gray9">{job.jobEmployeeLevel}</div>
                                        <div className="text-md text-gray9">{job.location}</div>
                                        <div className="text-md text-gray9">{job.description.substring(0, 20)}</div>
                                        <div className="text-md text-gray9">{job.publisherId}</div>
                                        <div className="text-md text-gray9">{job.deadline.toString()}</div>
                                        <div className="text-xs text-gray7">- {companyData.companyName} -</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="text-2xl text-navbarTextColor">No Job Found</div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default CompanyPage;