import React, { useState } from 'react';
import axios from 'axios';
import {UserSignupRequest} from "@/types/types.ts";
import {UserSignupApiRequest} from "@/types/types.ts";
import {CoreApiPath} from "@/types/enums.ts";
import { Button } from "../../../components/ui/button.tsx"
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert.tsx"
import { Input } from "../../../components/ui/input.tsx"
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
            setSignupRequest(initialSignupRequest);
            setShowAlerts(true);
            setTimeout(() => {
                setShowAlerts(false);
            }, 2000);
        } catch (error) {
            // @ts-ignore
            if (error.response && error.response.status === 400) {
                setApiResponseStatus('Bad Request');
                setShowAlerts(true);
                setTimeout(() => {
                    setShowAlerts(false);
                }, 2000);
                setSignupRequest(initialSignupRequest);
            } else {
                console.error('Error creating user:', error);
                // Handle other errors here
            }
        }
    };

    return (
        <div
            className="signupContainer w-[100%] h-[90vh] flex justify-center align-center items-center font-bold font-arial bg-mainBgColor border border-formBorderColor overflow-hidden rounded-lg">
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
            <div className="signupForm bg-formBgColor border border-formBorderColor overflow-hidden
            flex flex-col mt-2 gap-2
            smallPhone:w-[20vh] smallPhone:h-[50vh] smallPhone:p-2 smallPhone:rounded-md
            phone:w-[40vh] phone:h-[50vh] phone:p-4 phone:rounded-md
            tablet:w-[60vh] tablet:h-[80vh] tablet:p-2 tablet:rounded-lg
            laptop:w-[80vh] laptop:h-[85vh] laptop:p-2 laptop:rounded-xl
            desktop:w-[90vh] desktop:max-h-[80vh] desktop:p-3 desktop:rounded-2xl
            ">
                <div className="fullName flex justify-between w-full h-[8vh]">
                    <div className="w-full flex-1 mr-2 flex justify-center items-center gap-1.5 text-formTextColor">
                        <Input value={signupRequest.firstname} onChange={handleInputChange} className="h-[8vh] rounded-xl" type="text" id="firstname" placeholder="Firstname"/>
                    </div>
                    <div className="w-full flex-1 flex justify-center items-center gap-1.5 text-formTextColor">
                        <Input value={signupRequest.lastname} onChange={handleInputChange} className="h-[8vh] rounded-xl" type="text" id="lastname" placeholder="Lastname"/>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input value={signupRequest.email} onChange={handleInputChange} className="h-[8vh] rounded-xl" type="email" id="email" placeholder="Email"/>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input value={signupRequest.password} onChange={handleInputChange} className="h-[8vh] rounded-xl" type="text" id="password" placeholder="Password"/>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input value={signupRequest.passwordAgain} onChange={handleInputChange} className="h-[8vh] rounded-xl" type="text" id="passwordAgain" placeholder="Password Again"/>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input value={signupRequest.age} onChange={handleInputChange} className="h-[8vh] rounded-xl" type="number" id="age" placeholder="Age"/>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input value={signupRequest.country} onChange={handleInputChange} className="h-[8vh] rounded-xl" type="text" id="country" placeholder="Country"/>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input value={signupRequest.currentLanguage} onChange={handleInputChange} className="h-[8vh] rounded-xl" type="text" id="currentLanguage" placeholder="Current Language"/>
                </div>
                <div className="w-full flex justify-center items-center gap-1.5 text-formTextColor">
                    <Input value={signupRequest.gender} onChange={handleInputChange} className="h-[8vh] rounded-xl" type="text" id="gender" placeholder="Gender"/>
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