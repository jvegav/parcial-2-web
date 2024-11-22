/* eslint-disable prettier/prettier */
import { DiagnosticoEntity } from '../diagnostico/diagnostico.entity';
import { MedicoEntity } from '../medicos/medico.entity';
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class PacienteEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre: string;

    @Column()
    genero: string;

    @ManyToMany(()=> MedicoEntity, medicos=> medicos.pacientes)
    medicos : MedicoEntity[];

    @ManyToMany(()=>DiagnosticoEntity, diagnosticos => diagnosticos.pacientes)
    @JoinColumn()
    diagnosticos: DiagnosticoEntity[];
}
