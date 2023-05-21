export enum Gender {
    Male = 'H',
    Female = 'F',
  }

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isActive: boolean;
    gender: Gender;
}
  