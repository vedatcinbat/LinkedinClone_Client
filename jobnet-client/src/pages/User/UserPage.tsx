//@ts-ignore
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {User} from "@/types/types.ts";
import axios from "axios";

interface UserParams {
    userId: string;
}

const UserPage = () => {
    //@ts-ignore
    const { userId } = useParams<UserParams>();

    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        const baseUrl = `http://localhost:5087/api/users/${userId}/profile`;
            axios.get(`${baseUrl}`).then(res => {
                setUserData(res.data);
                console.log(userData);
                //@ts-ignore
            }).catch(err => {
                console.log(err);
                setUserData(null);
            });
    }, [])


    return(
        <>
            <div>UserPage</div>
        </>
    )
}


export default UserPage;