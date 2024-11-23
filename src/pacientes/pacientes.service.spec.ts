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
  let pacienteRepository: Repository<PacienteEntity>;
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PacientesService],
    }).compile();
 
    service = module.get<PacientesService>(PacientesService);
    pacienteRepository = module.get<Repository<PacienteEntity>>(getRepositoryToken(PacienteEntity));
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

    const saveSpy = jest.spyOn(pacienteRepository, 'save').mockResolvedValueOnce(paciente);

    const result = await service.create(paciente);

    expect(result).toEqual(paciente);
    expect(saveSpy).toHaveBeenCalledWith(paciente);
  });



  it('findAll: debe retornar todos los pacientes con sus relaciones', async () => {
    const mockPacientes = [
        { id: '1', nombre: 'Paciente 1', diagnosticos: [], medicos: [] },
        { id: '2', nombre: 'Paciente 2', diagnosticos: [], medicos: [] },
    ] as PacienteEntity[];

    jest.spyOn(pacienteRepository, 'find').mockResolvedValue(mockPacientes);

    const result = await service.findAll();
    expect(result).toEqual(mockPacientes);
    expect(pacienteRepository.find).toHaveBeenCalledWith({ relations: ['diagnosticos', 'medicos'] });
});


it('findOne: debe retornar un paciente por su ID', async () => {
    const mockPaciente = { id: '1', nombre: 'Paciente 1', diagnosticos: [], medicos: [] } as PacienteEntity;

    jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(mockPaciente);

    const result = await service.findOne('1');
    expect(result).toEqual(mockPaciente);
    expect(pacienteRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' }, relations: ['diagnosticos', 'medicos'] });
});

it('findOne: debe lanzar una excepción si el paciente no existe', async () => {
    jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(undefined);

    await expect(service.findOne('1')).rejects.toMatchObject({
      type: BusinessError.NOT_FOUND,
      message: 'The pacient with the given id was not found'
      
    });
});


it('delete: debe eliminar un paciente sin diagnosticos', async () => {
    const mockPaciente = { id: '1', nombre: 'Paciente 1', diagnosticos: [], medicos: [] } as PacienteEntity;

    jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(mockPaciente);
    jest.spyOn(pacienteRepository, 'remove').mockResolvedValue(undefined);

    await service.delete('1');
    expect(pacienteRepository.remove).toHaveBeenCalledWith(mockPaciente);
});

it('delete: debe lanzar una excepción si el paciente no existe', async () => {
    jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(undefined);

    await expect(service.delete('1')).rejects.toMatchObject({
      type: BusinessError.NOT_FOUND,
      message: 'The pacient with the given id was not found'
      
    });

    
});

it('delete: debe lanzar una excepción si el paciente tiene diagnosticos', async () => {
    const mockPaciente = {
        id: '1',
        nombre: 'Paciente 1',
        diagnosticos: [{ id: 'diag1', descripcion: 'Diagnóstico' }],
        medicos: [],
    } as PacienteEntity;

    jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(mockPaciente);

    

    await expect(service.delete('1')).rejects.toMatchObject({
      type: BusinessError.PRECONDITION_FAILED,
      message: 'The pacient have one or more diagnosticos'
      
    });
});
});

