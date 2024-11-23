/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoEntity } from 'src/medicos/medico.entity';
import { PacienteEntity } from 'src/pacientes/paciente.entity';
import { PacientemedicoController } from './pacientemedico.controller';
import { PacientemedicoService } from './pacientemedico.service';

@Module({
    imports: [TypeOrmModule.forFeature([PacienteEntity, MedicoEntity])],
    providers: [PacientemedicoService],
    controllers: [PacientemedicoController],
    exports: [PacientemedicoService], // Opcional si este servicio será usado en otros módulos
})
export class PacientemedicoModule {}