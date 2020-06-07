import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Genre { // Genre: Masculino | Feminino
    Masculino = "M",
    Feminino = "F"
}

@Entity("pacientes")
export class Paciente {

    /* paciente identification number */
    @PrimaryGeneratedColumn()
    id!: number;

    /* paciente is active? */
    @Column({
        name: "is_active", type: "bit", default: "1", nullable: false
    })
    is_active!: boolean;

    /* paciente name */
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

    /* genre (sex) */
    @Column({
        name: "genre", type: "set", enum: Genre, default: [Genre.Masculino, Genre.Feminino], nullable: false
    })
    genre!: Genre;

    /* phone main */
    @Column({
        name: "phone_main", type: "varchar", length: 16, nullable: false, unique: false
    })
    phone_main!: string;

    /* phone secondary*/
    @Column({
        name: "phone_secondary", type: "varchar", length: 16, nullable: true, unique: false
    })
    phone_secondary?: string;

    /* email */
    @Column({
        name: "email", type: "varchar", length: 60, nullable: false, unique: true
    })
    email!: string;

    /* password */
    @Column({
        name: "password", type: "varchar", length: 20, nullable: false, unique: false
    })
    password!: string;

    /* create date */
    @Column({
        name: "create_at", type: "timestamp", nullable: false, unique: false, default: () => 'CURRENT_TIMESTAMP'
    })
    create_at!: Date;

    /* updating date */
    @Column({
        name: "update_at", type: "timestamp", nullable: true, unique: false
    })
    update_at!: Date;

}