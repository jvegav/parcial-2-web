/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicoEntity } from './medico.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errorrs/business-errors';

@Injectable()
export class MedicosService {

    constructor(
        @InjectRepository(MedicoEntity)
        private readonly medicoRepository: Repository<MedicoEntity>
    ){}

    async findAll(): Promise<MedicoEntity[]> {
        return await this.medicoRepository.find({ relations: ["pacientes"] });
    }


    async findOne(id: string): Promise<MedicoEntity> {
        const medico: MedicoEntity = await this.medicoRepository.findOne({where: {id}, relations: ["pacientes"] } );
        if (!medico)
          throw new BusinessLogicException("The medico with the given id was not found", BusinessError.NOT_FOUND);
        return medico;
    }

    async create(medico: MedicoEntity): Promise<MedicoEntity> {
        if(medico.especialidad.length <1)
            
            throw new BusinessLogicException("El medico necesita una especialidad", BusinessError.PRECONDITION_FAILED);
        if(medico.nombre.length <1)
            throw new BusinessLogicException("El medico necesita un nombre", BusinessError.PRECONDITION_FAILED);

        return await this.medicoRepository.save(medico);
    }

    async delete(id: string) {
        const medico: MedicoEntity = await this.medicoRepository.findOne({where:{id}});
        if (!medico)
            throw new BusinessLogicException("The medico with the given id was not found", BusinessError.NOT_FOUND);
        
        
        if(medico.pacientes.length>=1)
            throw new BusinessLogicException("The medico have one or more patients", BusinessError.PRECONDITION_FAILED);

        
        await this.medicoRepository.remove(medico);
    }




}
