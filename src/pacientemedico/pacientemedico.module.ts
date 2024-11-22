/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoEntity } from 'src/medicos/medico.entity';
import { MedicosService } from 'src/medicos/medicos.service';
import { PacienteEntity } from 'src/pacientes/paciente.entity';
import { PacientesService } from 'src/pacientes/pacientes.service';

@Module({
    imports: [TypeOrmModule.forFeature([PacienteEntity, MedicoEntity])],
 providers: [PacientesService, MedicosService],
})
export class PacientemedicoModule {
    
}
