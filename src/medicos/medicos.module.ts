/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoEntity } from './medico.entity';
import { MedicosController } from './medicos.controller';

@Module({
    imports :[TypeOrmModule.forFeature([MedicoEntity])],
    controllers: [MedicosController]
})
export class MedicosModule {}
