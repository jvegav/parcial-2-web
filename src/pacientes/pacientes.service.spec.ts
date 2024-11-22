/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PacientesService } from './pacientes.service';
import { Repository } from 'typeorm';
import { PacienteEntity } from './paciente.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/typeorm-testing-config';
import { BusinessError } from '../shared/errorrs/business-errors';

describe('PacienteService', () => {
  let service: PacientesService;
  let repository: Repository<PacienteEntity>;
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PacientesService],
    }).compile();
 
    service = module.get<PacientesService>(PacientesService);
    repository = module.get<Repository<PacienteEntity>>(getRepositoryToken(PacienteEntity));
  });
   
  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  it('create should throw an exception if the name is 3 characters or less', async () => {
    const paciente: PacienteEntity= {
      id: '1',
      nombre: 'An',
      genero: 'Femenino',
      medicos: [],
      diagnosticos:[]
      
    } 

    await expect(service.create(paciente)).rejects.toMatchObject({
      type: BusinessError.PRECONDITION_FAILED,
      message: 'El paciente necesita un nombre de mas de tres caracteres'
      
    });
  });

  it('create should save a patient successfully when data is valid', async () => {
    const paciente: PacienteEntity= {
      id: '1',
      nombre: 'Pedro',
      genero: 'Masculino',
      medicos: [],
      diagnosticos:[]
      
    } 

    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValueOnce(paciente);

    const result = await service.create(paciente);

    expect(result).toEqual(paciente);
    expect(saveSpy).toHaveBeenCalledWith(paciente);
  });
});

