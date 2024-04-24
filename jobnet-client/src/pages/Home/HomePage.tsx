import React from "react";
import PlatformAims from "../../components/home/BeforeLogin/PlatformAims.tsx";
import PlatformFeatures from "../../components/home/BeforeLogin/PlatformFeatures.tsx";
import JobsFeatures from "../../components/home/BeforeLogin/JobsFeatures.tsx";
import LetsSignup from "../../components/home/BeforeLogin/LetsSignup.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
const HomePage: React.FC = () => {

    const currentUserData = useSelector((state: RootState) => state.user.currentUser);
    const currentAuthData = useSelector((state: RootState) => state.auth);
    console.log(currentUserData);
    console.log(currentAuthData);

    return (
        <div className="p-2 gap-2">
            <PlatformAims />
            <PlatformFeatures />
            <JobsFeatures />
            <LetsSignup />
        </div>
    );
}

export default HomePage;