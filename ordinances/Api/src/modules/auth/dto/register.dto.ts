import { IsString, IsEmail, MinLength, IsBoolean } from 'class-validator';

// export enum Gender {
//     Male = 'H',
//     Female = 'F',
// } 


export class RegisterDto {
    @IsString()
    readonly firstName: string;
    
    @IsString()
    readonly lastName: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(8)
    readonly password: string;

    // @IsBoolean()
    // readonly isAdmin: boolean;

    // @IsBoolean()
    // readonly isActive: boolean;

    // @IsString()
    // readonly gender: Gender;

}