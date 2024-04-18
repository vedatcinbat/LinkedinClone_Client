import * as React from 'react';
import {UserSignupRequest} from "../../types/UserSignupRequest.ts";
import {UserSignupApiRequest} from "../../types/UserSignupApiRequest.ts";
import {CoreApiPath} from "../../types/CoreApiUris.ts";
import {useState} from "react";
import axios from "axios";

const SignupPage: React.FC = () => {

    const UserSignupApiRequest: UserSignupApiRequest = {
        firstname: "",
        lastname: "",
        hashedPassword: "",
        title: null,
        email: "",
        age: "0",
        country: "",
        currentLanguage: "",
        profilePictureUrl: null,
        aboutMe: null,
        companyId: null
    }

    const UserSignupRequest: UserSignupRequest = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordAgain: "",
        age: 0,
        country: "",
        currentLanguage: "",
        gender: "",
    }

    const [signupRequest, setSignupRequest] = useState<UserSignupRequest>(UserSignupRequest);
    const [signupApiRequest, setSignupApiRequest] = useState<UserSignupApiRequest>(UserSignupApiRequest);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setSignupRequest(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const createUser = () => {
        if(signupRequest.password !== signupRequest.passwordAgain){
            alert("Passwords do not match");
            return;
        }
        if(signupRequest.firstname === '' || signupRequest.lastname === '' || signupRequest.email === '' || signupRequest.password === '' || signupRequest.passwordAgain === '' || signupRequest.age === 0 || signupRequest.country === '' || signupRequest.currentLanguage === '' || signupRequest.gender === '') {
            alert("Please fill all fields");
            return;
        }
        setSignupApiRequest({
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
            companyId: null
        });

        axios.post(`${CoreApiPath.url}/api/users/createUser`, signupApiRequest)
            .then(res => {
                console.log(res.data);
                alert("User created successfully");
            }).catch(e => {
                console.log(e);
        })



    };


    return (
        <div className="signupContainer w-[100%] h-[90vh] flex justify-center align-center items-center font-bold font-arial  bg-light-white">
            <div className="signupForm bg-light-dark
            flex flex-col justify-center mt-2
            smallPhone:w-[20vh] smallPhone:h-[50vh] smallPhone:p-2 smallPhone:rounded-md
            phone:w-[40vh] phone:h-[50vh] phone:p-4 phone:rounded-md
            tablet:w-[60vh] tablet:h-[80vh] tablet:p-6 tablet:rounded-md
            laptop:w-[80vh] laptop:h-[80vh] laptop:p-8 laptop:rounded-md
            desktop:w-[90vh] desktop:h-[90vh] desktop:p-12 desktop:rounded-md
            ">
                <div className="inputArea flex justify-between items-center p-1">
                    <label className="text-light-white mr-2
                    smallPhone:text-xs
                    phone:text-sm
                    tablet:text-md
                    laptop:text-lg
                    desktop:text-xl
                    w-[40%]
                    ">Firstname</label>
                    <input onChange={handleInputChange} name="firstname" type="text" className="p-3 w-full rounded-lg"/>
                </div>
                <div className="inputArea flex justify-between items-center p-1">
                    <label className="text-light-white mr-2
                    smallPhone:text-xs
                    phone:text-sm
                    tablet:text-md
                    laptop:text-lg
                    desktop:text-xl
                    w-[40%]
                    ">Lastname</label>
                    <input onChange={handleInputChange} type="text" name="lastname" className="p-3 w-full rounded-lg"/>
                </div>
                <div className="inputArea flex justify-between items-center p-1">
                    <label className="text-light-white mr-2
                    smallPhone:text-xs
                    phone:text-sm
                    tablet:text-md
                    laptop:text-lg
                    desktop:text-xl
                    w-[40%]
                    ">Email</label>
                    <input onChange={handleInputChange} type="email" name="email" className="p-3 w-full rounded-lg"/>
                </div>
                <div className="inputArea flex justify-between items-center p-1">
                    <label className="text-light-white mr-2
                    smallPhone:text-xs
                    phone:text-sm
                    tablet:text-md
                    laptop:text-lg
                    desktop:text-xl
                    w-[40%]
                    ">Password</label>
                    <input onChange={handleInputChange} type="text" name="password" className="p-3 w-full rounded-lg"/>
                </div>
                <div className="inputArea flex justify-between items-center p-1">
                    <label className="text-light-white mr-2
                    smallPhone:text-xs
                    phone:text-sm
                    tablet:text-md
                    laptop:text-lg
                    desktop:text-xl
                    w-[40%]
                    ">Password Again</label>
                    <input onChange={handleInputChange} type="text" name="passwordAgain"
                           className="p-3 w-full rounded-lg "/>
                </div>
                <div className="inputArea flex justify-between items-center p-1">
                    <label className="text-light-white mr-2
                    smallPhone:text-xs
                    phone:text-sm
                    tablet:text-md
                    laptop:text-lg
                    desktop:text-xl
                    w-[40%]
                    ">Age</label>
                    <input onChange={handleInputChange} type="number" name="age" className="p-3 w-full rounded-lg "/>
                </div>
                <div className="inputArea flex justify-between items-center p-1">
                    <label className="text-light-white mr-2
                    smallPhone:text-xs
                    phone:text-sm
                    tablet:text-md
                    laptop:text-lg
                    desktop:text-xl
                    w-[40%]
                    ">Country</label>
                    <input onChange={handleInputChange} type="text" name="country" className="p-3 w-full rounded-lg"/>
                </div>
                <div className="inputArea flex justify-between items-center p-1">
                    <label className="text-light-white mr-2
                    smallPhone:text-xs
                    phone:text-sm
                    tablet:text-md
                    laptop:text-lg
                    desktop:text-xl
                    w-[40%]
                    ">Current Language</label>
                    <input onChange={handleInputChange} type="text" name="currentLanguage"
                           className="p-3 w-full rounded-lg"/>
                </div>
                <div className="inputArea flex justify-between items-center p-1">
                    <label className="text-light-white mr-2
                    smallPhone:text-xs
                    phone:text-sm
                    tablet:text-md
                    laptop:text-lg
                    desktop:text-xl
                    w-[40%]
                    ">Gender</label>
                    <input onChange={handleInputChange} type="text" name="gender" className="p-3 w-full rounded-lg"/>
                </div>
                <div className="inputArea flex justify-center items-center p-1">
                    <button onClick={createUser}
                            className="w-[30%] h-[8vh] p-2 bg-light-primary text-light-dark rounded-lg">Signup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;