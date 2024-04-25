// Request Types
//@ts-ignore
/*
* interface UserLoginRequest {
    email: string;
    password: string;
}
* */
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

// Request Type For Api Calls
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

export interface UserCredentials {
    email: string;
    password: string;
}

// Response Types




// Types
export interface AuthState {
    userId: number | null;
    isLoggedIn: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    expirationTime: number | null;
    loading: false | true;
    error: string | null;
}

import { CompanyIndustry, PostType, SkillIndustry } from './enums';

export interface User {
    userId: number;
    firstname?: string;
    lastname?: string;
    title?: string;
    hashedPassword?: string;
    email?: string;
    age?: number;
    country?: string;
    currentLanguage?: string;
    profilePictureUrl?: string;
    aboutMe?: string;
    isDeleted: boolean;
    companyId?: number | null;
    company?: Company | null;
    posts: Post[] | null;
    comments: Comment[] | null;
    experiences: Experience[] | null;
    educations: Education[] | null;
    skills: Skill[] | null;
    followers: Follow[] | null;
    following: Follow[] | null;
}

export interface Company {
    companyId: number;
    companyName: string;
    industry: CompanyIndustry;
    description?: string;
    employeeCount?: string;
    websiteUrl: string;
    logoUrl: string;
    foundedAt: Date;
    currentAvailableJobs?: Job[];
    talentManagers?: User[];
}

export interface Comment {
    commentId: number;
    content: string;
    commentedAt: Date;
    isDeleted: boolean;
    userId: number;
    user: User;
    postId: number;
    post: Post;
}

export interface Education {
    educationId: number;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date;
    userId: number;
    user: User;
    schoolId: number;
    school: School;
}

export interface Experience {
    experienceId: number;
    title: string;
    companyName: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    description: string;
    userId: number;
    user: User;
    companyId: number;
    company: Company;
}

export interface Follow {
    id: number;
    followerId: number;
    followerUser: User;
    followingId: number;
    followingUser: User;
    isDeleted: boolean;
}

export interface Job {
    jobId: number;
    jobTitle: string;
    jobType: string;
    jobEmployeeLevel: string;
    description: string;
    location: string;
    postedAt: Date;
    deadline: Date;
    publisherId: number;
    publisher: User;
    companyId?: number;
    company: Company;
    appliedUsers: User[] | null;
}

export interface Like {
    likeId: number;
    isDeleted: boolean;
    userId: number;
    user: User;
    postId: number;
    post: Post;
}

export interface Post {
    postId: number;
    isDeleted: boolean;
    userId: number;
    user: User;
    publishTime: Date;
    caption: string;
    postType: PostType;
    textContent?: string;
    imageContent?: string;
    imagesContent?: string;
    commentCount: number;
    likeCount: number;
    comments: Comment[] | null;
    likes: Like[] | null;
}

export interface School {
    schoolId: number;
    schoolName: string;
    location: string;
    establishedAt: Date;
    graduates: User[] | null;
}

export interface Skill {
    skillId: number;
    skillName: string;
    skillIndustry: SkillIndustry;
}

