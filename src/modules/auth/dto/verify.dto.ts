import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VeriflyDto{
    @IsEmail()
    @IsNotEmpty()
    email!:string;

      @IsString()
    @IsNotEmpty()
    otp!:string;
}