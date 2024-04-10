import React from "react";
import PlatformAims from "../../components/home/BeforeLogin/PlatformAims.tsx";
import PlatformFeatures from "../../components/home/BeforeLogin/PlatformFeatures.tsx";
const HomePage: React.FC = () => {
    return (
        <>
            {/* What this platform want to achieve */}
            <PlatformAims />
            {/* What kind of features this platform has */}
            <PlatformFeatures />
        </>
    );
}

export default HomePage;