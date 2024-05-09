//@ts-ignore
import React, {useEffect, useState} from "react";
import {Company} from "@/types/types.ts";
import axios from "axios";
import SearchCompanyBox from "@/components/company/SearchCompanyBox";

const SearchCompanyPage: React.FC = () => {
    const [currentCompany, setCurrentCompany] = useState<string>("");

    const [companyResponses, setCompanyResponses] = useState<Company[]>([]);

    const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setCurrentCompany(event.target.value);
    }


  useEffect(() => {
        if(currentCompany !== "" || currentCompany !== null) {
            const url = `http://localhost:5087/api/Company?companyName=${currentCompany}`;
            axios.get(url).then(res => {
                setCompanyResponses(res.data);
            });
        }
    }, [currentCompany]);

    return (
        <div className="w-full h-[90vh] flex justify-center mt-[5vh] text-navbarTextColor">
            <div className="mainContainer">
                <div className="inputArea">
                    <input className="text-xl w-[80vh] h-[10vh] p-2 text-mainBgColor" type="text" placeholder="Company Name" onChange={handleCompanyNameChange}/>
                </div>
                <div className="companiesResponse">
                    {companyResponses !== null ? (
                        companyResponses.map(company => (
                            <SearchCompanyBox key={company.companyId} company={company}/>
                        ))
                    ) : (
                        <div className="text-xl">...</div>
                    )}
                </div>
            </div>
        </div>
    )
}


export default SearchCompanyPage;





