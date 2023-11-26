import { Model } from 'mongoose';
export interface IFullName {
  firstName: string;
  lastName: string;
}

export interface IAddress {
  street: string;
  city: string;
  country: string;
}

export interface IUser {
  userId: string;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
  isDelete: boolean;
}

export interface IUserMethods {
  isUserExist(id: string): Promise<IUser | null>;
}

export type UserModel = Model<IUser, Record<string, never>, IUserMethods>;
