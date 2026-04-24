import { BaseEntity } from "src/database/entities/base.entiy";
import { Article } from "src/modules/article/entities/article.entity";
import { Auth } from "src/modules/auth/entities/auth.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

@Entity({name  : "tag"})

export class Tag  extends BaseEntity{
    @Column({ unique : true})
name! : string


@ManyToOne(() => Auth , (user) => user.tags  , {nullable : false})
@JoinColumn({name : "user_id"})
createdBy! : Auth


@ManyToMany(()=> Article , (article )=> article.tags)
articles! :Article[]
}



