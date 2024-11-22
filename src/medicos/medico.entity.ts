/* eslint-disable prettier/prettier */
import { PacienteEntity } from '../pacientes/paciente.entity';
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn} from 'typeorm'
@Entity()
export class MedicoEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre: string;

    @Column()
    especialidad: string;

    @Column()
    telefono: string;

    @ManyToMany(()=>PacienteEntity, paciente => paciente.medicos)
    @JoinColumn()
    pacientes: PacienteEntity[];



}
