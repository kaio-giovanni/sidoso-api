import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity("administrator")
export class Admin {

    /* admin identification number */
    @PrimaryGeneratedColumn()
    id!: number;
    
    /* admin name */
    @Column({
        name: "name", type: "varchar", length: 80, nullable: false
    })
    name!: string;

    /* birth date */
    @Column({
        name: "birth", type: "date", nullable: false
    })
    birth!: Date;

    /* cpf - cadastro de pessoa fisica */
    @Column({
        name: "cpf", type: "varchar", length: 15, nullable: false, unique: true
    })
    cpf!: string;

    /* email */
    @Column({
        name: "email", type: "varchar", length: 60, nullable: false, unique: true
    })
    email!: string;

    /* password */
    @Column({
        name: "password", type: "varchar", length: 80, nullable: false, unique: false
    })
    password!: string;

    /* create date */
    @CreateDateColumn()
    create_at!: Date;

    /* updating date */
    @UpdateDateColumn()
    update_at!: Date;

    @BeforeInsert()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 8);
    }

    async checkPassword(noCryptpassword: string){
        return await bcrypt.compare(noCryptpassword, this.password);
    }

}