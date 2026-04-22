import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VeriflyDto{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({default :"qodirberganovbotir@gmail.com"})
    email!:string;

      @IsString()
    @IsNotEmpty()
    @ApiProperty({default :"123456"})
    otp!:string;
}