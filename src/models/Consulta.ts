import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Profissional } from './Profissional';
import { Paciente } from './Paciente';

export enum CONSULTA_STATUS {
    MARCADA = "MARCADA",
    CONCLUIDA = "CONCLUÍDA",
    CANCELADA = "CANCELADA"
}

@Entity("consultas")
export class Consulta {
    
    /* consulta identification number */
    @PrimaryGeneratedColumn()
    id!: number;

    /* consulta title */
    @Column({
        name: "title", type: "varchar", length: 120, nullable: false
    })
    title!: string;

    /* photo consulta url */
    @Column({
        name: "photo_url", type: "varchar", length: 100, nullable: true
    })
    photo_url?: string;

    /* profissional */
    @ManyToOne(type => Profissional, profissional => profissional.id, { nullable: false, cascade: true })
    profissional!: Profissional;

    /* paciente */
    @ManyToOne(type => Paciente, paciente => paciente.id, { nullable: false, cascade: true })
    paciente!: Paciente;

    /* date of consulta */
    @Column({
        name: "date_c", type: "datetime", nullable: false
    })
    date!: Date;

    /* consulta address */
    @Column({
        name: "latitude", type: "varchar", nullable: false
    })
    latitude!: string;

    @Column({
        name: "longitude", type: "varchar", nullable: false
    })
    longitude!: string;

    /* consulta status */
    @Column({
        name: "status", type: "set", enum: CONSULTA_STATUS, default: [CONSULTA_STATUS.CANCELADA, CONSULTA_STATUS.CONCLUIDA, CONSULTA_STATUS.MARCADA], nullable: false
    })
    status!: CONSULTA_STATUS;

    /* consulta observation */
    @Column({
        name: "obs", type: "text", nullable: true
    })
    obs!: string;

    /* create date */
    @CreateDateColumn()
    create_at!: Date;

    /* updating date */
    @UpdateDateColumn()
    update_at!: Date;
   
}