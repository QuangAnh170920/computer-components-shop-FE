
export interface ILogin {
    username:string
    password:string
}

export interface IUserProfile {
    username:string
    fullname:string
    avatar:string
    is_enterprise_root:boolean
    
}

export interface IAuthInfo { 
    user:IUserProfile
    accessToken: string 
    refreshToken: string
}
export interface IResponseLogin {
    responseCode: string;
    responseMessage: string;
    responseData: IAuthInfo;

}
export interface IRefreshToken {
    tokenRefresh:string

}

