import { BaseEntity } from "src/database/entities/base.entiy";
import { Entity } from "typeorm";

@Entity({name  : "tag"})

export class Tag  extends BaseEntity{}
