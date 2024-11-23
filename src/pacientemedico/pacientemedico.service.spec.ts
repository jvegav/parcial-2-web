/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PacientemedicoService } from './pacientemedico.service';
import { PacienteEntity } from '../pacientes/paciente.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicoEntity } from '../medicos/medico.entity';
import { BusinessError } from '../shared/errorrs/business-errors';

describe('PacientemedicoService', () => {
  let service: PacientemedicoService;
  let pacienteRepository: Repository<PacienteEntity>;
  let medicoRepository: Repository<MedicoEntity>;

  beforeEach(async () => {
    
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacientemedicoService,
        {
          provide: getRepositoryToken(PacienteEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(MedicoEntity),
          useClass: Repository,
        },
      ],
    }).compile();


    service = module.get<PacientemedicoService>(PacientemedicoService);
    pacienteRepository = module.get<Repository<PacienteEntity>>(getRepositoryToken(PacienteEntity));
    medicoRepository = module.get<Repository<MedicoEntity>>(getRepositoryToken(MedicoEntity));

   
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should add a medico to a paciente', async () => {
    const medico = { id: 'medico1' } as MedicoEntity;
    const paciente = { id: 'paciente1', medicos: [] } as PacienteEntity;

    jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(medico);
    jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue({ ...paciente, medicos: [] });
    jest.spyOn(pacienteRepository, 'save').mockResolvedValue({ ...paciente, medicos: [medico] });

    const result = await service.addMedicoToPaciente('medico1', 'paciente1');

    expect(result.medicos).toContain(medico);
    expect(pacienteRepository.save).toHaveBeenCalledWith({ ...paciente, medicos: [medico] });
  });

  it('should throw an exception if medico does not exist', async () => {
    jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(null);

    await expect(service.addMedicoToPaciente('soy increible', 'paciente1')).rejects.toMatchObject({
      type: BusinessError.NOT_FOUND,
      message: 'The medico with the given id was not found'
      
    });
  });




  
});
