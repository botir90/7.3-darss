import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";

export class ArticleResponsedto {
@IsNumber()
@ApiProperty({default: 1})
id! : number
@IsString()
@ApiProperty({default :"HTM"})
title!:string;

@IsString()
@ApiProperty({default: "HTM"})
content!:string;


}
