

import { BaseEntity } from "src/database/entities/base.entiy";
import { Column, Entity } from "typeorm";


@Entity({name: "article" })
export class Article extends BaseEntity{
 
    @Column()
    title!:string

    @Column()
    content!: string;

    @Column() 
    backgroundimagr! : string


}

