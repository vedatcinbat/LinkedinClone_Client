export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    accessToken: string;
    refreshToken: string;
}