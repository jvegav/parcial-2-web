/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { MedicosService } from './medicos.service';
import { MedicoDto } from './medico.dto';
import { MedicoEntity } from './medico.entity';
import { plainToInstance } from 'class-transformer';

@Controller('medicos')
@UseInterceptors(BusinessErrorsInterceptor)
export class MedicosController {
    constructor(private readonly medicosService : MedicosService){}

    @Get()
    async findAll(){
        return await this.medicosService.findAll()
    }

    @Get(':medicoId')
    async findOne(@Param('medicoId') medicoId: string) {
        return await this.medicosService.findOne(medicoId);
    }

    @Post()
    async create(@Body() medicoDTO: MedicoDto) {
        const medico: MedicoEntity = plainToInstance(MedicoEntity, medicoDTO);
        return await this.medicosService.create(medico);
    }

    @Delete(':medicoId')
    @HttpCode(204)
    async delete(@Param('medicoId') medicoId: string) {
        return await this.medicosService.delete(medicoId);
    }


}
