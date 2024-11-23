/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoEntity } from 'src/medicos/medico.entity';
import { MedicosService } from 'src/medicos/medicos.service';
import { PacienteEntity } from 'src/pacientes/paciente.entity';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { PacientemedicoController } from './pacientemedico.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PacienteEntity, MedicoEntity])],
 providers: [PacientesService, MedicosService],
 controllers: [PacientemedicoController],
})
export class PacientemedicoModule {
    
}
