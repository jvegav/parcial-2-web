/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoEntity } from './medico.entity';

@Module({
    imports :[TypeOrmModule.forFeature([MedicoEntity])]
})
export class MedicosModule {}
