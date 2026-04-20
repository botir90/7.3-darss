import { IsEmail, IsNotEmpty, isNotEmpty, IsString, Matches, MaxLength, MinLength  } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @MinLength(3,{message:"kamida 3 ta harf bo'lsin"})
    @MaxLength(50,{message:"kopi bilan 50 ta harf bo'lsin"})
    username!:string;

    @IsEmail()
    @IsNotEmpty()
    email!:string;

    @IsString()
    @Matches(/[a-zA-Z\d@$!%*?&]{8,20}/)
    password!:string;
}
