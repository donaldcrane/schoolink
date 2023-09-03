export interface CreateUserData {
  email: string;
  password: string;
  phone: string;
  name: string;
  flag: string;
}

export interface UserData {
  id?: number;
  email: string;
  password: string;
  name: string;
  dob: string;
  photo: string;
  gender: string;
  phone: string;
}

export interface LoginData {
  email: string;
  password: string;
}
