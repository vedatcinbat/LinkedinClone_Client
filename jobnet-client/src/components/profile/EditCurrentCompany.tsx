//@ts-ignore
import React, {useEffect, useState} from "react";
import {Company} from "@/types/types.ts";
import axios from "axios";
import UpdateCompanyBox from "@/components/company/UpdateCompanyBox.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {updateUserProfile} from "@/redux/user/userThunks.ts";
//@ts-ignore
const EditCurrentCompany = ({setEditCompanyPopup, setMessagePopupText, setShowMessagePopup}) => {

    const [companyResponses, setCompanyResponses] = useState<Company[]>();
    const [currentCompany, setCurrentCompany] = useState<string>("");
    const [currentCompanyId, setCurrentCompanyId] = useState<number>(0);
    const userAuthData = useSelector((state: RootState) => state.auth);
    const token = userAuthData.accessToken;
    const dispatch = useDispatch();
    const currentUserId = useSelector((state: RootState) => state.auth.userId);


    useEffect(() => {
        if(currentCompany !== "" || currentCompany !== null) {
            const url = `http://localhost:5087/api/Company?companyName=${currentCompany}`;
            axios.get(url).then(res => {
                setCompanyResponses(res.data);
            });
        }
    }, [currentCompany]);

    const UpdateCurrentUserCompany = () => {
        const url = `http://localhost:5087/api/users/work/${currentCompanyId}`;
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
            .then(() => {
                // Dispatch action to update current user company information
                // @ts-ignore
                dispatch(updateUserProfile(currentUserId));

                setEditCompanyPopup(false);
                setMessagePopupText(`Now you are working at CompanyId : ${currentCompanyId}`)
                setShowMessagePopup(true);

                setTimeout(() => {
                    setShowMessagePopup(false);
                }, 4000);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="absolute top-2 right-2 bg-mainBgColor text-white rounded-lg p-2 cursor-pointer" onClick={() => setEditCompanyPopup(false)}>Close</div>
            <div className="mainContainer flex flex-col justify-center items-center w-full mt-2">
                <div className="header">
                    <div className="text-2xl font-bold">Companies</div>
                </div>
                <div className="companyLists w-full">
                    <div className="companyNameInput flex justify-center items-center gap-4 mt-2">
                        <input className="p-2 rounded-lg" type="text" placeholder="CompanyName..." onChange={(e) => setCurrentCompany(e.target.value)}/>
                        <div className="bg-gray8 text-white p-2 text-xs w-[15vh] text-center">Current CompanyId: {currentCompanyId}</div>
                        <button onClick={UpdateCurrentUserCompany} className="p-2 bg-mainBgColor text-white rounded-xl">Set Current Company</button>
                    </div>
                    <div className="companiesResponse p-2 h-[80vh] overflow-y-scroll scrollbar-hidden flex flex-col justify-between">
                        {companyResponses !== null ? (
                            companyResponses?.map(company => (
                                <UpdateCompanyBox key={company.companyId} company={company} setCurrentCompanyId={setCurrentCompanyId} />
                            ))
                        ) : (
                            <div className="text-xl">...</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCurrentCompany;