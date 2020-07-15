import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity("associados")
export class Associado {
    
    /* associado identification number */
    @PrimaryGeneratedColumn()
    id!: number;

    /* associado name */
    @Column({
        name: "name", type: "varchar", length: 120, nullable: false
    })
    name!: string;

    /* is active ? */
    @Column({
        name: "is_active", type: "boolean", default: "1", nullable: false
    })
    is_active!: boolean;

    /* CNPJ */
    @Column({
        name: "cnpj", type: "varchar", length: 20, nullable: false, unique: true
    })
    cnpj!: string;

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
        name: "email", type: "varchar", length: 60, nullable: true, unique: true
    })
    email?: string;

    /* associado address */
    @Column({
        name: "latitude", type: "varchar", length: 80, nullable: false
    })
    latitude!: string;

    @Column({
        name: "longitude", type: "varchar", length: 80, nullable: false
    })
    longitude!: string;

    /* associado logo */
    @Column({
        name: "logo", type: "varchar", length: 80, nullable: true
    })
    logo?: string;

    /* create date */
    @CreateDateColumn()
    create_at!: Date;

    /* updating date */
    @UpdateDateColumn()
    update_at!: Date;
   
}