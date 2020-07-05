import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity("profissoes")
export class Profissao {

    /* profissao identification number */
    @PrimaryGeneratedColumn()
    id!: number;

    /* profissao name */
    @Column({
        name: "name", type: "varchar", length: 80, nullable: false, unique: true
    })
    name!: string;

    /* create date */
    @CreateDateColumn()
    create_at!: Date;

    /* updating date */
    @UpdateDateColumn()
    update_at!: Date;

}