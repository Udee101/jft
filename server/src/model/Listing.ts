import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm"
import { User } from "./User"
import { IsEmail, IsNotEmpty, IsUrl } from "class-validator"

@Entity('listings')
export class Listing {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  title: string
  
  @Column()
  @IsNotEmpty()
  tags: string
  
  @Column()
  @IsNotEmpty()
  company: string
  
  @Column()
  @IsNotEmpty()
  location: string

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string
  
  @Column()
  @IsUrl()
  @IsNotEmpty()
  website: string
  
  @Column()
  @IsNotEmpty()
  description: string
  
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
  
  @ManyToOne(() => User, (user) => user.listings, {
    onDelete: "RESTRICT",
    cascade: ["update"]
  })
  user: User
}
