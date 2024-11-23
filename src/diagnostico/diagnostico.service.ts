/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiagnosticoEntity } from './diagnostico.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errorrs/business-errors';

@Injectable()
export class DiagnosticoService {

    constructor(
        @InjectRepository(DiagnosticoEntity)
        private readonly diagnosticoRepository: Repository<DiagnosticoEntity>
    ){}

    async findAll(): Promise<DiagnosticoEntity[]> {
        
        return await this.diagnosticoRepository.find({relations:['pacientes']});
    }


    async findOne(id: string): Promise<DiagnosticoEntity> {
        const diagnostico: DiagnosticoEntity = await this.diagnosticoRepository.findOne({where: {id}, relations: ["pacientes"] } );
        if (!diagnostico)
            throw new BusinessLogicException("The diagnostico with the given id was not found", BusinessError.NOT_FOUND);
        return diagnostico;
    }

    async create(diagnostico: DiagnosticoEntity): Promise<DiagnosticoEntity> {
        console.log(diagnostico)
        if(diagnostico.descripcion.length < 200)
            throw new BusinessLogicException("El diagnostico necesita una descripcion de mas de 200 caracteres", BusinessError.PRECONDITION_FAILED);
        
        return await this.diagnosticoRepository.save(diagnostico);
    }

    async delete(id: string) {
        const diagnostico: DiagnosticoEntity = await this.diagnosticoRepository.findOne({where:{id}});
        if (!diagnostico)
            throw new BusinessLogicException("The diagnostico with the given id was not found", BusinessError.NOT_FOUND);
        await this.diagnosticoRepository.remove(diagnostico);
    }


}
