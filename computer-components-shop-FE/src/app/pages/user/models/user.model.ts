export interface IUser {
    id: number
    fullName:string
    dateOfBirth: string
    gender: string
    email: string
    mobile: number
}

export interface IResponse {
    responseCode: string;
    responseMessage: string;
    responseData: any;

}

export interface IChangePassword {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string
}