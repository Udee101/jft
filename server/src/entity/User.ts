import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IsEmail } from "class-validator"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false })
    first_name: string

    @Column({nullable: false })
    last_name: string

    @Column({nullable: true })
    middle_name: string

    @Column({nullable: false })
    username: string

    @Column({nullable: false })
    @IsEmail()
    email: string

    @Column({nullable: false })
    phone: string

    @Column({nullable: false })
    password: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updayted_at: Date

}
