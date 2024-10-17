import { Column, Entity, PrimaryColumn } from "typeorm"
import { randomUUID } from 'crypto'

export interface IUser {
    id_user: string
    name: string
    email: string
    password: string
}

@Entity('users')
export class User implements IUser {
    @PrimaryColumn("varchar")
    id_user: string

    @Column("varchar")
    name: string

    @Column("varchar")
    email: string

    @Column("varchar")
    password: string

    constructor(name: string, email: string, password: string) {
        this.id_user = randomUUID()
        this.name = name
        this.email = email
        this.password = password
    }
}