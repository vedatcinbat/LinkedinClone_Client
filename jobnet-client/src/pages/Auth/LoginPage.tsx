import React from "react"
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const LoginPage: React.FC = () => {

    return (
        <div className="loginContainer
        flex justify-center items-center
        w-full bg-mainBgColor border border-formBorderColor overflow-hidden rounded-lg
        smallPhone:h-[97vh] smallPhone:text-xs smallPhone:px-1 smallPhone:py-1 smallPhone:rounded-lg
        phone:h-[96vh] phone:text-sm phone:px-2 phone:py-2 phone:rounded-lg
        tablet:h-[95vh] tablet:text-md tablet:px-3 tablet:py-3 tablet:rounded-lg
        laptop:h-[94vh] laptop:text-lg laptop:px-4 laptop:py-4 laptop:rounded-xl
        desktop:h-[92vh] desktop:text-xl desktop:px-5 desktop:py-5 desktop:rounded-2xl
        ">
            <div className="loginForm border border-formBtnHoverColor bg-formBgColor w-[80vh] h-[40vh] rounded-xl p-3 flex flex-col justify-around">
                <div className="emailpasswordContainer flex flex-col justify-between h-[20vh]">
                    <div className="firstNameContainer">
                        <Input className="h-[8vh] rounded-xl" type="email" id="email" placeholder="Email"/>
                    </div>
                    <div className="passwordContainer">
                        <Input className="h-[8vh] rounded-xl" type="password" id="password" placeholder="Password"/>
                    </div>
                </div>
                <div className="loginButtonContainer flex justify-center items-center">
                    <Button
                        className="w-[25%] p-4 rounded-xl text-formBtnTextColor bg-formBtnColor hover:text-formBtnHoverTextColor hover:bg-formBtnHoverColor">Login</Button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;