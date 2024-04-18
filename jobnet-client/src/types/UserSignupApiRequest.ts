export interface UserSignupApiRequest {
    firstname: string;
    lastname: string;
    hashedPassword: string;
    title: string | null;
    email: string;
    age: string;
    country: string;
    currentLanguage: string;
    profilePictureUrl: string | null;
    aboutMe: string | null;
    companyId: number | null;
}