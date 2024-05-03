//@ts-ignore
import React, {useEffect, useState} from "react";
import {Company} from "@/types/types.ts";
import axios from "axios";

const SearchCompanyPage: React.FC = () => {
    const [currentCompany, setCurrentCompany] = useState<string | null>("");

    const [companyResponses, setCompanyResponses] = useState<Company[]>([]);

    const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentCompany(e.target.value);
        console.log(currentCompany);
    }

    useEffect(() => {
        if(currentCompany !== "" || currentCompany !== null || true) {
            const url = `http://localhost:5087/api/Company/${currentCompany}`;
            axios.get(url).then(res => {
                setCompanyResponses(res.data);
            });
        }
        console.log(companyResponses)
    }, [currentCompany]);

    return (
        <div className="w-full h-[90vh] flex justify-center mt-[5vh] text-navbarTextColor">
            <div className="mainContainer">
                <div className="inputArea">
                    <input className="text-xl w-[80vh] h-[10vh] p-2 text-mainBgColor" type="text" placeholder="Company Name" onChange={handleCompanyNameChange}/>
                </div>
                <div className="companiesResponse">

                </div>
            </div>
        </div>
    )
}


export default SearchCompanyPage;





