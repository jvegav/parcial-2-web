/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicoEntity } from '../medicos/medico.entity';
import { PacienteEntity } from '../pacientes/paciente.entity';
import { BusinessError, BusinessLogicException } from '../shared/errorrs/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class PacientemedicoService {

    constructor(
        @InjectRepository(PacienteEntity)
        private readonly pacienteRepository: Repository<PacienteEntity>,
    
        @InjectRepository(MedicoEntity)
        private readonly medicoRepository: Repository<MedicoEntity>
    ) {}


    async addMedicoToPaciente(medicoId: string, pacienteId: string): Promise<PacienteEntity> {
        const medico: MedicoEntity = await this.medicoRepository.findOne({where: {id: medicoId}});
        if (!medico)
          throw new BusinessLogicException("The medico with the given id was not found", BusinessError.NOT_FOUND);
      
        const paciente: PacienteEntity = await this.pacienteRepository.findOne({where: {id: pacienteId}, relations: ["medicos", "diagnosticos"]})
        if (!paciente)
          throw new BusinessLogicException("The paciente with the given id was not found", BusinessError.NOT_FOUND);
        

        if(paciente.medicos.length >=5)
            throw new BusinessLogicException("The paciente no puede tener mas de 5 medicos asignados", BusinessError.NOT_FOUND);

        paciente.medicos = [...paciente.medicos, medico];
        return await this.pacienteRepository.save(paciente);
      }
}
