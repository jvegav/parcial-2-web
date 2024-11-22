/* eslint-disable prettier/prettier */
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiagnosticoEntity } from "../diagnostico/diagnostico.entity";
import { MedicoEntity } from "../medicos/medico.entity";
import { PacienteEntity } from "../pacientes/paciente.entity";


export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [MedicoEntity, PacienteEntity, DiagnosticoEntity],
      synchronize: true,
      keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([MedicoEntity, PacienteEntity, DiagnosticoEntity]),
   ];