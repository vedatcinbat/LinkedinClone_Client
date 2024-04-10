import React from "react";
import {Link} from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <div className="navbar flex justify-between items-center
        smallPhone:text-xs smallPhone:p-1 smallPhone:bg-purple-400 smallPhone:h-[3vh]
        phone:text-sm phone:p-1 phone:bg-yellow-300 phone:h-[4vh]
        tablet:text-md tablet:p-2 tablet:bg-yellow-400 tablet:h-[5vh]
        laptop:text-lg laptop:p-3 laptop:bg-red-300 laptop:h-[6vh]
        desktop:text-xl desktop:p-4 desktop:bg-red-400 desktop:h-[8vh]
        ">
            <div className="logo">
                <div>JobSphere</div>
            </div>
            <div className="nav-links flex p-2 mr-2">
                <div className="nav-link mr-2">
                    <Link to="/">Home</Link>
                </div>
                <div className="nav-link mr-2">
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;