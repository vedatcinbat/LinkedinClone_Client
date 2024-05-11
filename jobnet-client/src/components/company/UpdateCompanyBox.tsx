import {Company} from "@/types/types.ts";
import React from "react";

interface CompanyProps {
    company: Company;
    key: number;
    setCurrentCompanyId: (companyId: number) => void;
}

const UpdateCompanyBox: React.FC<CompanyProps> = ({company, key, setCurrentCompanyId}) => {
    return (
        <div key={key}
             onClick={() => setCurrentCompanyId(company.companyId)}
             className="companyResponse bg-sidebarBorderColor p-2 mb-2 mt-2 rounded-xl cursor-pointer">
            <div className="companyName text-3xl text-gray1">{company.companyName}</div>
            <div className="companyDescription text-md text-gray5">{company.description}</div>
            <div className="companyDescription text-md text-gray5">Employee Count : {company.employeeCount}</div>
            <div className="companyDescription text-lg text-gray5">Found : {company.foundedAt.toString()}</div>
            <div className="companyDescription text-lg text-gray5">Work here
                : {company.talentManagers?.length}</div>
        </div>
    )
}

export default UpdateCompanyBox