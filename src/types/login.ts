export interface ILogin {
  username?: string;
  password?: string;
}

export interface IRegister {
  username?: string;
  password?: string;
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
}