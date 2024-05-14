import {Company} from "@/types/types.ts";
import React from "react";
import {Link} from "react-router-dom";

interface CompanyProps {
    company: Company;

}

const SearchCompanyBox: React.FC<CompanyProps> = ({company}) => {
    const baseUrl = "http://localhost:5173/companies";
    return (
        <Link to={`${baseUrl}/${(company.companyId)}`}>
            <div key={company.companyId}
                 className="companyResponse bg-sidebarBorderColor p-2 mb-2 mt-2 rounded-xl cursor-pointer">
                <div className="companyName text-3xl text-gray1">{company.companyName}</div>
                <div className="companyDescription text-md text-gray5">{company.description}</div>
                <div className="companyDescription text-md text-gray5">Employee Count : {company.employeeCount}</div>
                <div className="companyDescription text-lg text-gray5">Found : {company.foundedAt.toString()}</div>
                <div className="companyDescription text-lg text-gray5">Work here
                    : {company.talentManagers?.length}</div>
                <div className="openJobs">AvailableJobs : {company.currentAvailableJobs?.length}</div>
            </div>
        </Link>
    )
}

export default SearchCompanyBox