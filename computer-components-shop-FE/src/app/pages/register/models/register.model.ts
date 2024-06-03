export interface IRegister {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    passwordConfirm: string;
    otp: string
  }
  export interface ISendOTP {
    email: string;
  }
  export interface IVerify {
  
    email: string;
    otp: string
    
  }
  export interface IResponse{
    responseCode: string;
    responseMessage: string;
    responseData: string;
  }