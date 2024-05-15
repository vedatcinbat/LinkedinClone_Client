import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowJob } from "@/redux/user/userSlice.ts";
import {Company, CreateJobRequest} from "@/types/types.ts";
import { RootState } from "@/redux/store.ts";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select.tsx";

const PostJob: React.FC = () => {

    const [createJobApiRequest, setCreateJobApiRequest] = useState<CreateJobRequest>({
        jobTitle: "",
        jobType: "",
        jobEmployeeLevel: "",
        description: "",
        location: "",
        postedAt: null,
        deadline: null,
        companyId: 0,
    });

    const dispatch = useDispatch();
    const currentUserCompanyId = useSelector(
        (state: RootState) => state.user.currentUser?.company?.companyId
    );
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const [allCompanies, setAllCompanies] = useState<Company[] | null>(null);
    const getAllCompaniesUrl = `http://localhost:5087/api/Company`;
    const [currentCompany, setCurrentCompany] = useState<Company | null>(null);

    useEffect(() => {
        axios.get(getAllCompaniesUrl).then((res) => {
            setAllCompanies(res.data);
        });
    }, []);

    const closePostJob = () => {
        dispatch(setShowJob(false));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setCreateJobApiRequest((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }));
    };


    useEffect(() => {
        const getAllJobsUrl = `http://localhost:5087/api/Job/getAllJobs`;
        axios.get(getAllJobsUrl).then((res) => {
            console.log(res.data);
        });
    }, []);

    useEffect(() => {
        setCreateJobApiRequest((prevState) => ({
            ...prevState,
            companyId: currentCompany?.companyId || 0,
        }));
    }, [currentCompany]);

    const addJob = () => {

        if(currentUserCompanyId !== currentCompany?.companyId) {
            alert("You can only post jobs for your company");
            return;
        }
        if (
            createJobApiRequest.companyId === 0 ||
            createJobApiRequest.jobTitle === "" ||
            createJobApiRequest.jobType === "" ||
            createJobApiRequest.jobEmployeeLevel === "" ||
            createJobApiRequest.description === "" ||
            createJobApiRequest.location === "" ||
            createJobApiRequest.deadline === ""
        ) {
            alert("Please fill all fields or companyId cannot be 0");
            return;
        }
        console.log(createJobApiRequest)
        const postJobUrl = `http://localhost:5087/api/Job/addJob`;

        axios
            .post(postJobUrl, createJobApiRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json",
                },
            })
            .then((res) => {
                console.log(res.data);
                alert(`Job Added Successfully`);
                dispatch(setShowJob(false));
            })
            .catch((err) => {
                alert(`Error: ${err}`);
                console.log(err);
            });
        console.log(createJobApiRequest)
    };

    const handleStartsDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        const dateObj = new Date(selectedDate);

        const formattedDate = dateObj.toISOString();

        setCreateJobApiRequest((prevState) => ({
            ...prevState,
            postedAt: formattedDate,
        }));
    };

    const handleEndsDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        const dateObj = new Date(selectedDate);

        const formattedDate = dateObj.toISOString();

        setCreateJobApiRequest((prevState) => ({
            ...prevState,
            deadline: formattedDate,
        }));
    };

    return (
        <>
            <div className="w-full flex flex-col justify-between items-center">
                <div className="closeButton absolute top-2 right-2">
                    <button onClick={closePostJob} className="bg-mainBgColor text-white p-2 rounded-xl">
                        Close
                    </button>
                </div>
                <div className="header text-center mb-4">
                    <div className="mt-2 mb-2 text-2xl">Create Job</div>
                    <div className="companySelect">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Choose Company" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Technology</SelectLabel>
                                    {allCompanies &&
                                        allCompanies.map((company, index) => (
                                            <SelectItem
                                                key={index}
                                                value={company.companyName}
                                                onMouseEnter={() => setCurrentCompany(company)}
                                            >
                                                {company.companyName}
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="createJobForm w-full flex flex-col justify-between itesm-center gap-3 h-[55vh]">
                    <div className="inputGroup flex justify-center items-center">
                        <div className="text-lg font-bold mr-2 text-white  w-[20%]">Title</div>
                        <input
                            className="p-2 rounded-xl bg-gray7 text-white w-[50vh]"
                            placeholder="Software Engineer..."
                            onChange={handleInputChange}
                            type="text"
                            id="jobTitle"
                        />
                    </div>
                    <div className="inputGroup flex justify-center items-center">
                        <div className="text-lg font-bold mr-2 text-white  w-[20%]">JobType</div>
                        <input className="p-2 rounded-xl bg-gray7 text-white w-[50vh]" placeholder="Full-Time..."
                               onChange={handleInputChange} type="text" id="jobType"/>
                    </div>
                    <div className="inputGroup flex justify-center items-center">
                        <div className="text-lg font-bold mr-2 text-white  w-[20%]">Employee Level</div>
                        <input className="p-2 rounded-xl bg-gray7 text-white w-[50vh] "
                               placeholder="Junior | Mid-Level | Senior"
                               onChange={handleInputChange} type="text"
                               id="jobEmployeeLevel"/>
                    </div>
                    <div className="inputGroup flex justify-center items-center">
                        <div className="text-lg font-bold mr-2 text-white  w-[20%]">Description</div>
                        <textarea className="p-2 rounded-xl bg-gray7 text-white w-[50vh]" placeholder="2+ year of ...."
                            //@ts-ignore
                                  onChange={handleInputChange}
                                  id="description"/>
                    </div>
                    <div className="inputGroup flex justify-center items-center">
                        <div className="text-lg font-bold mr-2 text-white  w-[20%]">Location</div>
                        <input className="p-2 rounded-xl bg-gray7 text-white w-[50vh]" placeholder="United States..."
                               onChange={handleInputChange} type="text"
                               id="location"/>
                    </div>
                    <div className="inputGroup flex justify-center items-center">
                        <div className="text-lg font-bold mr-2 text-white w-[20%]">Starts At</div>
                        <input
                            className="p-2 rounded-xl bg-gray7 text-white w-[50vh]"
                            onChange={(e) => handleStartsDate(e)}
                            type="date"
                            id="postedAt"
                        />
                    </div>
                    <div className="inputGroup flex justify-center items-center">
                        <div className="text-lg font-bold mr-2 text-white w-[20%]">Ends At</div>
                        <input
                            className="p-2 rounded-xl bg-gray7 text-white w-[50vh]"
                            onChange={(e) => handleEndsDate(e)}
                            type="date"
                            id="deadline"
                        />
                    </div>
                </div>
                <div className="button mt-3">
                    <button onClick={addJob} className="p-2 rounded-xl bg-mainBgColor text-white w-[10vh]">
                        Post
                    </button>
                </div>
            </div>
        </>
    );
};

export default PostJob;