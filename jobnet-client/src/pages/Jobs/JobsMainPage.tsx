import React, {useEffect, useState} from "react";
import {RootState} from "@/redux/store.ts";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Job} from "@/types/types.ts";
import axios from "axios";

const JobsMainPage: React.FC = () => {
    const isUserLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const [allJobs, setAllJobs] = useState<Job[] | null>(null);

    useEffect(() => {
        const baseUrl = `http://localhost:5087/api/Job/getAllJobs`;

        axios.get(baseUrl).then((res) => {
            setAllJobs(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);
    console.log(allJobs);

    return(
        <>
            {isUserLoggedIn ? (
                <div className="flex justify-center items-center w-full h-[80vh]">
                    <div className="w-[140vh] h-[75vh] bg-mainBgColor rounded-xl flex items-center">
                        <div className="allJobsListSimple h-full w-[30%] bg-gray8 overflow-y-scroll p-2 flex flex-col items-center gap-5">
                            {allJobs && allJobs.map((job, key) => (
                                <div className="w-full h-[20vh] bg-black text-white p-2 rounded-xl" key={key} onClick={() => setSelectedJob(job)}>
                                    <div className="p-2">{job.jobTitle}</div>
                                    <div className="text-xs text-gray7">{job.postedAt.toString()} - {job.deadline.toString()}</div>
                                    <div className="text-xs text-gray7">Applied User Count: {job.appliedUsers ? job.appliedUsers.length : "0"}</div>
                                </div>
                            ))}
                        </div>
                        <div className="selectedJobDetails h-full w-[70%] bg-gray7 relative">
                            {selectedJob ? (
                                <>
                                    <div className="w-full h-full">
                                        <button onClick={() => setSelectedJob(null)} className="absolute top-1 right-1 p-2 bg-black text-white cursor-pointer">Close</button>
                                    </div>
                                </>
                                ) : (
                                <div className="flex justify-center items-center h-full">
                                    <div className="">Please Select Job</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className=" w-full h-[80vh] flex justify-center items-center">
                    <div className="content flex flex-col text-center text-alertSuccess2BgColor">
                        <div>Please login for searching jobs</div>
                        <Link to="/login">
                            <div className="p-2 bg-black text-white rounded-xl">Login</div>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default JobsMainPage;