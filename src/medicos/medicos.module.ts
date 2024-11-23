/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoEntity } from './medico.entity';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicoEntity])],
  controllers: [MedicosController],
  providers: [MedicosService],
  exports: [MedicosService], 
})
export class MedicosModule {}
