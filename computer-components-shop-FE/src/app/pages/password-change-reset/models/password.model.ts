export interface ISendOTP {
    identityContent: string;
}
export interface IResponse {
    responseCode: string;
    responseMessage: string;
    responseData: string;

}
export interface IChangePassword {
    otp: string;
    email: string;
    password: string;
    confirmPassword: string;
}