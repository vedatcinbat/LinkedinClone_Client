import React, {useState, useEffect} from "react";
import axios from "axios";
import {Company} from "@/types/types.ts";
import {useParams} from "react-router-dom";
interface CompanyParams {
    companyId: string;
}


const CompanyPage: React.FC = () => {
    //@ts-ignore
    const { companyId } = useParams<CompanyParams>();

    const [companyData, setCompanyData] = useState<Company | null>(null);
    const reqUrl = `http://localhost:5087/api/Company/${companyId}`;

    useEffect(() => {
        axios.get(`${reqUrl}`).then(res => {
            setCompanyData(res.data);
            console.log(res.data)
        }).catch(err => {
            console.log(err);
            setCompanyData(null);
        });
    }, [])

    return(
        <>
            {companyData === null ? (
                <>
                    <div>Company Data Not Found</div>
                </>
                ) : (
                <>
                    <div className="text-alertSuccess2BgColor">Company : {companyData?.companyName}</div>
                </>
                )}
        </>
    );
}

export default CompanyPage;