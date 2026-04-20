

import { BaseEntity } from "src/database/entities/base.entiy";
import { RoleUser } from "src/shared/enums/roles.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



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


}
