/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PacienteEntity } from './paciente.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errorrs/business-errors';

@Injectable()
export class PacientesService {

    constructor(
        @InjectRepository(PacienteEntity)
        private readonly pacienteRepository: Repository<PacienteEntity>
    ){}

    async findAll(): Promise<PacienteEntity[]> {
        return await this.pacienteRepository.find({ relations: ["diagnosticos", "medicos"] });
    }


    async findOne(id: string): Promise<PacienteEntity> {
        const paciente: PacienteEntity = await this.pacienteRepository.findOne({where: {id}, relations: ["diagnosticos","medicos"] } );
        if (!paciente)
          throw new BusinessLogicException("The pacient with the given id was not found", BusinessError.NOT_FOUND);
        return paciente;
    }

    async create(paciente: PacienteEntity): Promise<PacienteEntity> {
        if(paciente.nombre.length <= 3)
            throw new BusinessLogicException("El paciente necesita un nombre de mas de tres caracteres", BusinessError.PRECONDITION_FAILED);
        
        return await this.pacienteRepository.save(paciente);
    }

    async delete(id: string) {
        const paciente: PacienteEntity = await this.pacienteRepository.findOne({where:{id}});
        if (!paciente)
            throw new BusinessLogicException("The pacient with the given id was not found", BusinessError.NOT_FOUND);
        
        if(paciente.diagnosticos.length > 0 )
            throw new BusinessLogicException("The pacient have one or more diagnosticos", BusinessError.PRECONDITION_FAILED);

        await this.pacienteRepository.remove(paciente);
    }



}


