import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Consulta } from '../models/Consulta';

export enum PAGAMENTO_STATUS {
    EM_ANALISE    = "001",
    CONFIRMADO    = "002",
    NAO_REALIZADO = "003",
    REEMBOLSO     = "004"
}

@Entity("pagamento_consultas")
export class PagConsulta {

    /* pagamento identification number */
    @PrimaryGeneratedColumn()
    id!: number;

    /* consulta id */
    @ManyToOne(type => Consulta, consulta => consulta.id, { nullable: false })
    consulta!: Consulta;

    /* price of consulta */
    @Column({
        name: "price", type: "decimal", nullable: false
    })
    price!: number;

    /* pay value */
    @Column({
        name: "pay_value", type: "decimal", nullable: false
    })
    pay_value!: number;

    /* discount */
    @Column({
        name: "discount", type: "decimal", nullable: true
    })
    discount?: number;

    /* status */
    @Column({
        name: "status", type: "set", enum: PAGAMENTO_STATUS, 
        default: PAGAMENTO_STATUS.NAO_REALIZADO, nullable: false
    })
    status!: string;

    /* create date */
    @CreateDateColumn()
    create_at!: Date;

    /* updating date */
    @UpdateDateColumn()
    update_at!: Date;
}
