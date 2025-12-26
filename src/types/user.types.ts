export interface ILogin {
  phone?: string;
  extension?: string;
}

export interface IRegister {
  username?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}

export interface IUser {
  id?: number | string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  provider?: "credentials" | "google" | "otp";
}