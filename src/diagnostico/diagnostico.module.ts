/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DiagnosticoEntity } from './diagnostico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticoService } from './diagnostico.service';

@Module({
    imports :[TypeOrmModule.forFeature([DiagnosticoEntity])],
    providers: [DiagnosticoService]
})
export class DiagnosticoModule {}
