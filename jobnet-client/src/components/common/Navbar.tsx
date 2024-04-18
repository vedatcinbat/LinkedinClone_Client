import React from "react";
import {Link, useLocation} from "react-router-dom";

const Navbar: React.FC = () => {
    const location = useLocation();

    const getTextColor = (path: string) => {
        if(path === location.pathname) {
            return "text-currentPageTextColor";
        }else {
            return "text-dark";
        }
    }
    return (
        <div className="text-navbarTextColor
        navbar flex justify-between items-center font-myriad
        smallPhone:text-xs smallPhone:p-1 smallPhone:bg-navbarBgColor smallPhone:h-[3vh]
        phone:text-sm phone:p-1 phone:bg-navbarBgColor phone:h-[4vh]
        tablet:text-md tablet:p-2 tablet:bg-navbarBgColor tablet:h-[5vh]
        laptop:text-lg laptop:p-3 laptop:bg-navbarBgColor laptop:h-[6vh]
        desktop:text-xl desktop:p-4 desktop:bg-navbarBgColor desktop:h-[8vh]"
        >
            <div className="logo">
                <div className="font-bold smallPhone:text-md phone:text-lg tablet:text-xl laptop:text-2xl desktop:text-3xl">JobSphere</div>
            </div>
            <div className="nav-links flex p-2 mr-2">
                <div className={`nav-link mr-6 ${getTextColor('/')}`}>
                    <Link to="/">Home</Link>
                </div>
                <div className={`nav-link mr-6 ${getTextColor('/login')}`}>
                    <Link to="/login">Login</Link>
                </div>
                <div className={`nav-link mr-6 ${getTextColor('/signup')}`}>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;