import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateArticleDto {

@IsString()
@ApiProperty({default :"HTM"})
title!:string;

@IsString()
@ApiProperty({default: "HTM"})
content!:string;


}
