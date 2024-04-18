export interface UserSignupRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordAgain: string;
    age: number;
    country: string;
    currentLanguage: string;
    gender: string;
}