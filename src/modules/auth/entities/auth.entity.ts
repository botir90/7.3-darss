

import { BaseEntity } from "src/database/entities/base.entiy";
import { Article } from "src/modules/article/entities/article.entity";
import { Tag } from "src/modules/tag/entities/tag.entity";
import { RoleUser } from "src/shared/enums/roles.enum";
import { Column , Entity, OneToMany,} from "typeorm";



@Entity({ name: "auth" })
export class Auth extends BaseEntity {


    @Column()
    username!: string

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({type:"enum",enum:RoleUser,default:RoleUser.USER})
    role!: RoleUser

    @Column({nullable:true})
    otp?: string;

    @Column({ type: "bigint" ,nullable:true})
    otpTime?: number;

////// relations ////// 
 @OneToMany(() => Article , (artticle) => artticle.author)
 articles!:Article[]

 @OneToMany(() => Tag , (tag) => tag.createdBy)
 tags!: Tag
}
