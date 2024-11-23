/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DiagnosticoEntity } from './diagnostico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticoService } from './diagnostico.service';
import { DiagnosticoController } from './diagnostico.controller';

@Module({
    imports :[TypeOrmModule.forFeature([DiagnosticoEntity])],
    providers: [DiagnosticoService],
    controllers: [DiagnosticoController]
})
export class DiagnosticoModule {}
