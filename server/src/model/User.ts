import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Listing } from "./Listing"
import { IsEmail, IsNotEmpty } from "class-validator"
@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  first_name: string

  @Column()
  @IsNotEmpty()
  last_name: string

  @Column({ nullable: true })
  middle_name: string

  @Column()
  @IsNotEmpty()
  username: string

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Column()
  @IsNotEmpty()
  phone: string

  @Column()
  @IsNotEmpty()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
  
  @OneToMany(() => Listing, (listing) => listing.user)
  listings: Listing[]

}
