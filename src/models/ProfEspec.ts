import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Profissional } from './Profissional';
import { Especialidade } from './Especialidade';

/* Join da tabela profissional e especialidade */
@Entity("prof_especialidade")
export class ProfEspec {

    /* identification number */
    @PrimaryGeneratedColumn()
    id!: number;

    /* Profissional */
    @ManyToOne(type => Profissional, profissional => profissional.id , { nullable: false })
    profissional!: Profissional;

    @ManyToOne(type => Especialidade, especialidade => especialidade.id, { nullable: false })
    especialidade!: Especialidade;

}