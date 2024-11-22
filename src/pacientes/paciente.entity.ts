/* eslint-disable prettier/prettier */
import { MedicoEntity } from 'src/medicos/medico.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm'
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
}