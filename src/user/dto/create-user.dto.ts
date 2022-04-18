import { IsDate, IsDateString, IsEmail, IsEnum,IsString, Length,  } from "class-validator";
import { Gender } from "../entities/user.entity";


export class CreateUserDto {
    
    @IsString()
    @Length(4, 255)
    name: string;
    
    @IsString()
    address: string;

    @IsString()
    hash: string;

    @IsEmail()
    email: string;

    @IsDate()
    dob: Date;

    @IsEnum(Gender)
    gender: Gender;
}