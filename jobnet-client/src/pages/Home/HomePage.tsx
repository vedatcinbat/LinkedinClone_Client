import React from "react";
import PlatformAims from "../../components/home/BeforeLogin/PlatformAims.tsx";
import PlatformFeatures from "../../components/home/BeforeLogin/PlatformFeatures.tsx";
import JobsFeatures from "../../components/home/BeforeLogin/JobsFeatures.tsx";
import LetsSignup from "../../components/home/BeforeLogin/LetsSignup.tsx";

const HomePage: React.FC = () => {

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