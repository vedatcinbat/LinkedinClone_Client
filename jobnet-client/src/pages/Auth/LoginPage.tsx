import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/auth/authThunks.ts";
import { UserCredentials } from "@/types/types.ts";
import { useLocation } from "react-router-dom";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import {setLoading} from "@/redux/auth/authSlice.ts";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    //@ts-ignore
    let isLoading = useSelector((state) => state.auth.loading);
    // @ts-ignore
    const isErrorExists = useSelector((state) => state.auth.error);

    const [formData, setFormData] = useState<UserCredentials>({ email: '', password: '' });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setFormData(prevState => {
            return {
                ...prevState,
                [e.target.id]: e.target.value
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //@ts-ignore
        dispatch(loginUser(formData));
        location.pathname = "/";
    };

    return (
        <>
            <div
                className="loginContainer flex justify-center items-center w-full bg-mainBgColor border border-formBorderColor overflow-hidden rounded-lg smallPhone:h-[97vh] smallPhone:text-xs smallPhone:px-1 smallPhone:py-1 smallPhone:rounded-lg phone:h-[96vh] phone:text-sm phone:px-2 phone:py-2 phone:rounded-lg tablet:h-[95vh] tablet:text-md tablet:px-3 tablet:py-3 tablet:rounded-lg laptop:h-[94vh] laptop:text-lg laptop:px-4 laptop:py-4 laptop:rounded-xl desktop:h-[92vh] desktop:text-xl desktop:px-5 desktop:py-5 desktop:rounded-2xl">
                <form onSubmit={handleSubmit}
                      className="loginForm border border-formBtnHoverColor bg-formBgColor w-[80vh] h-[40vh] rounded-xl p-3 flex flex-col justify-around">
                    <div className="emailpasswordContainer flex flex-col justify-between h-[20vh]">
                        <div className="firstNameContainer">
                            <Input value={formData.email} onChange={handleChange} className="h-[8vh] rounded-xl"
                                   type="email" id="email" placeholder="Email"/>
                        </div>
                        <div className="passwordContainer">
                            <Input value={formData.password} onChange={handleChange} className="h-[8vh] rounded-xl"
                                   type="password" id="password" placeholder="Password"/>
                        </div>
                    </div>
                    <div className="loginButtonContainer flex justify-center items-center">
                        <Button type="submit"
                                className="w-[25%] p-4 rounded-xl text-formBtnTextColor bg-formBtnColor hover:text-formBtnHoverTextColor hover:bg-formBtnHoverColor">Login</Button>
                    </div>
                </form>
                {isErrorExists && (
                    <div className="absolute bottom-2 right-2">
                        <Alert className="bg-alertErrorBgColor text-alertErrorTextColor">
                            <RocketIcon className="h-4 w-4"/>
                            <AlertTitle>Login Failed</AlertTitle>
                            <AlertDescription>Email or Password is Wrong</AlertDescription>
                        </Alert>
                    </div>
                )}
            </div>
        </>
    );
}

export default LoginPage;