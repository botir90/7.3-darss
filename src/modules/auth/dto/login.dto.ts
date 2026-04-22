import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isNotEmpty, IsString, Matches } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({default :"aligmail.com"})
    email!:string;

    @IsString()
    @Matches(/[a-zA-Z\d@$!%*?&]{8,20}/)
    @ApiProperty({default :"ali1234"})
    password!:string;
}
