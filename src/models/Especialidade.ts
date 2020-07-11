import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Profissao } from './Profissao';

/* Área de especialidade do profissional */
@Entity("especialidades")
export class Especialidade {

    /* especialidade identification number */
    @PrimaryGeneratedColumn()
    id!: number;

    /* especialidade name */
    @Column({
        name: "name", type: "varchar", length: 80, nullable: false
    })
    name!: string;

    /* especialidade description */
    @Column({
        name: "description", type: "varchar", length: 160, nullable: false
    })
    description!: string;

    /* Profissao */
    @ManyToOne(type => Profissao, profissao => profissao.id , { nullable: false })
    profissao!: Profissao;

    /* create date */
    @CreateDateColumn()
    create_at!: Date;

    /* updating date */
    @UpdateDateColumn()
    update_at!: Date;

}