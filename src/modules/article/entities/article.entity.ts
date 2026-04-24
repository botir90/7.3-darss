

import { BaseEntity } from "src/database/entities/base.entiy";
import { Auth } from "src/modules/auth/entities/auth.entity";
import { Tag } from "src/modules/tag/entities/tag.entity";
import { Column, Entity, JoinColumn, ManyToMany } from "typeorm";


@Entity({name: "article" })
export class Article extends BaseEntity{
 
    @Column()
    title!:string

    @Column()
    content!: string;

    @Column() 
    backgroundimagr! : string
//// reliation
@ManyToMany(() => Auth , (user) => user.articles )
@JoinColumn({name : "user_id"})
author! : Auth


@ManyToMany(()=> Tag , (tag )=> tag.articles)
@JoinColumn({name : "tag_id"})
tags! :Tag
}

