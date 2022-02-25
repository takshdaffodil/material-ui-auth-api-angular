export interface APIUser {
  payload: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    cpassword: string;
    acceptTerms: boolean;
  };
}

export interface LoginUserData {
  payload: {
    email: string;
    password: string;
  };
}
