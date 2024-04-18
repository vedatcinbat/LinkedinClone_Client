import React, { useState } from 'react';
import axios from 'axios';
import {UserSignupRequest} from "../../types/UserSignupRequest.ts";
import {UserSignupApiRequest} from "../../types/UserSignupApiRequest.ts";
import {CoreApiPath} from "../../types/CoreApiUris.ts";
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
//@ts-ignore
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {RocketIcon} from "@radix-ui/react-icons";

const SignupPage: React.FC = () => {
    const initialSignupRequest: UserSignupRequest = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordAgain: '',
        age: 0,
        country: '',
        currentLanguage: '',
        gender: '',
    };

    const [signupRequest, setSignupRequest] = useState<UserSignupRequest>(initialSignupRequest);
    const [showAlerts, setShowAlerts] = useState<boolean>(false);
    const [apiResponseStatus, setApiResponseStatus] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setSignupRequest(prevState => {
            return {
                ...prevState,
                [event.target.id]: event.target.value
            };
        });
    };

    const createUser = async () => {
        console.log(signupRequest);
        if (signupRequest.password !== signupRequest.passwordAgain) {
            alert('Passwords do not match');
            return;
        }
        if (
            signupRequest.firstname === '' ||
            signupRequest.lastname === '' ||
            signupRequest.email === '' ||
            signupRequest.password === '' ||
            signupRequest.passwordAgain === '' ||
            signupRequest.age === 0 ||
            signupRequest.country === '' ||
            signupRequest.currentLanguage === '' ||
            signupRequest.gender === ''
        ) {
            alert('Please fill all fields');
            return;
        }

        const signupApiRequest: UserSignupApiRequest = {
            firstname: signupRequest.firstname,
            lastname: signupRequest.lastname,
            hashedPassword: signupRequest.password,
            title: null,
            email: signupRequest.email,
            age: signupRequest.age.toString(),
            country: signupRequest.country,
            currentLanguage: signupRequest.currentLanguage,
            profilePictureUrl: null,
            aboutMe: null,
            companyId: null,
        };

        try {
            const response = await axios.post(`${CoreApiPath.url}/api/users/createUser`, signupApiRequest);
            setApiResponseStatus(response.data.statusText);
            setShowAlerts(true);
            setTimeout(() => {
                setShowAlerts(false);
            }, 3000);
        } catch (error) {
            // @ts-ignore
            if (error.response && error.response.status === 400) {
                setApiResponseStatus('Bad Request');
                setShowAlerts(true);
                setTimeout(() => {
                    setShowAlerts(false);
                }, 3000);
            } else {
                console.error('Error creating user:', error);
                // Handle other errors here
            }
        }
    };

    return (
        <div
            className="signupContainer w-[100%] h-[90vh] flex justify-center align-center items-center font-bold font-arial  bg-light-white">
            <div className="alerts absolute bottom-2 right-2">
                {showAlerts && (
                    <div>
                        {apiResponseStatus === 'Bad Request' ? (
                            <Alert className="bg-alertErrorBgColor text-alertErrorTextColor">
                                <RocketIcon className="h-4 w-4" />
                                <AlertTitle>Bad Request</AlertTitle>
                                <AlertDescription>
                                    User already exists with this email.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <Alert className="bg-alertSuccessBgColor text-alertSuccessTextColor">
                                <RocketIcon className="h-4 w-4" />
                                <AlertTitle>Successful</AlertTitle>
                                <AlertDescription>
                                    User created successfully.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                )}
            </div>
            <div className="signupForm bg-formBgColor border border-formBorderColor
            flex flex-col mt-2 gap-2 justify-between
            smallPhone:w-[20vh] smallPhone:h-[50vh] smallPhone:p-2 smallPhone:rounded-md
            phone:w-[40vh] phone:h-[50vh] phone:p-4 phone:rounded-md
            tablet:w-[60vh] tablet:h-[80vh] tablet:p-6 tablet:rounded-lg
            laptop:w-[80vh] laptop:h-[80vh] laptop:p-8 laptop:rounded-xl
            desktop:w-[90vh] desktop:h-[90vh] desktop:p-10 desktop:rounded-2xl
            ">
                <div className="fullName flex justify-between w-full">
                    <div className="w-full flex-1 mr-2 flex justify-center items-center gap-1.5 text-formTextColor">
                        <Input onChange={handleInputChange} className="p-8 rounded-xl" type="text" id="firstname" placeholder="Firstname"/>
                    </div>
                    <div className="w-full flex-1 flex justify-center items-center gap-1.5 text-formTextColor">
                        <Input onChange={handleInputChange} className="p-8 rounded-xl" type="text" id="lastname" placeholder="Lastname"/>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input onChange={handleInputChange} className="p-8 rounded-xl" type="email" id="email" placeholder="Email"/>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input onChange={handleInputChange} className="p-8 rounded-xl" type="text" id="password" placeholder="Password"/>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input onChange={handleInputChange} className="p-8 rounded-xl" type="text" id="passwordAgain" placeholder="Password Again"/>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input onChange={handleInputChange} className="p-8 rounded-xl" type="number" id="age" placeholder="Age"/>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input onChange={handleInputChange} className="p-8 rounded-xl" type="text" id="country" placeholder="Country"/>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input onChange={handleInputChange} className="p-8 rounded-xl" type="text" id="currentLanguage" placeholder="Current Language"/>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input onChange={handleInputChange} className="p-8 rounded-xl" type="text" id="gender" placeholder="Gender"/>
                </div>
                <div className="inputArea flex justify-center items-center p-1">
                    <Button onClick={createUser}
                            className="
                            w-[25%] p-4 rounded-xl text-formBtnTextColor bg-formBtnColor
                            hover:text-formBtnHoverTextColor hover:bg-formBtnHoverColor"
                    >
                        Signup
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;