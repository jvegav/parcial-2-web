/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PacienteEntity } from './paciente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';

@Module({
    imports :[TypeOrmModule.forFeature([PacienteEntity])],
    providers: [PacientesService],
    controllers: [PacientesController]
})
export class PacientesModule {}
