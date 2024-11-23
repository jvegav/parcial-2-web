/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { PacienteDto } from './paciente.dto';
import { PacienteEntity } from './paciente.entity';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('pacientes')
export class PacientesController {
    constructor(private readonly pacientesService : PacientesService){}

    @Get()
    async findAll(){
        return await this.pacientesService.findAll()
    }

    @Get(':pacienteId')
    async findOne(@Param('pacienteId') pacienteId: string) {
        return await this.pacientesService.findOne(pacienteId);
    }

    @Post()
    async create(@Body() pacienteDTO: PacienteDto) {
        const paciente: PacienteEntity = plainToInstance(PacienteEntity, pacienteDTO);
        return await this.pacientesService.create(paciente);
    }

    @Delete(':pacienteId')
    @HttpCode(204)
    async delete(@Param('pacienteId') pacienteId: string) {
        return await this.pacientesService.delete(pacienteId);
    }



}


