/* eslint-disable prettier/prettier */

import { Test, TestingModule } from "@nestjs/testing";
import { MedicoEntity } from "./medico.entity";
import { Repository } from "typeorm";
import { MedicosService } from "./medicos.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BusinessError } from "../shared/errorrs/business-errors";

describe('MedicosService', () => {
    let service: MedicosService;
    let medicoRepository: Repository<MedicoEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MedicosService,
                {
                    provide: getRepositoryToken(MedicoEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<MedicosService>(MedicosService);
        medicoRepository = module.get<Repository<MedicoEntity>>(getRepositoryToken(MedicoEntity));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Debe estar definido', () => {
        expect(service).toBeDefined();
    });


    it('findAll: debe retornar todos los médicos con sus pacientes', async () => {
        const mockMedicos = [
            { id: '1', nombre: 'Dr. Pérez', especialidad: 'Cardiología', pacientes: [] },
        ] as MedicoEntity[];
    
        jest.spyOn(medicoRepository, 'find').mockResolvedValue(mockMedicos);
    
        const result = await service.findAll();
        expect(result).toEqual(mockMedicos);
        expect(medicoRepository.find).toHaveBeenCalledWith({ relations: ['pacientes'] });
    });

    it('findOne: debe retornar un médico por su ID', async () => {
        const mockMedico = { id: '1', nombre: 'Dr. Pérez', especialidad: 'Cardiología', pacientes: [] } as MedicoEntity;
    
        jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(mockMedico);
    
        const result = await service.findOne('1');
        expect(result).toEqual(mockMedico);
        expect(medicoRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' }, relations: ['pacientes'] });
    });

    it('findOne: debe lanzar una excepción si el médico no existe', async () => {
        jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(undefined);


        await expect(service.findOne('1')).rejects.toMatchObject({
            type: BusinessError.NOT_FOUND,
            message: 'The medico with the given id was not found'
            
          });
    });

    it('create: debe crear un médico', async () => {
        const mockMedico = { id: '1', nombre: 'Dr. Pérez', especialidad: 'Cardiología', pacientes: [] } as MedicoEntity;
    
        jest.spyOn(medicoRepository, 'save').mockResolvedValue(mockMedico);
    
        const result = await service.create(mockMedico);
        expect(result).toEqual(mockMedico);
        expect(medicoRepository.save).toHaveBeenCalledWith(mockMedico);
    });

    it('create: debe lanzar una excepción si falta la especialidad', async () => {
        const mockMedico = { id: '1', nombre: 'Dr. Pérez', especialidad: '', pacientes: [] } as MedicoEntity;

        await expect(service.create(mockMedico)).rejects.toMatchObject({
            type: BusinessError.PRECONDITION_FAILED,
            message: 'El medico necesita una especialidad'
          });
    });


    it('delete: debe eliminar un médico sin pacientes asignados', async () => {
        const mockMedico = { id: '1', nombre: 'Dr. Pérez', especialidad: 'Cardiología', pacientes: [] } as MedicoEntity;
    
        jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(mockMedico);
        jest.spyOn(medicoRepository, 'remove').mockResolvedValue(undefined);
    
        await service.delete('1');
        expect(medicoRepository.remove).toHaveBeenCalledWith(mockMedico);
    });

    it('delete: debe lanzar una excepción si el médico tiene pacientes asignados', async () => {
        const mockMedico = { id: '1', nombre: 'Dr. Pérez', especialidad: 'Cardiología', pacientes: [{ id: '2' }] } as MedicoEntity;
    
        jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(mockMedico);

        await expect(service.delete('1')).rejects.toMatchObject({
            type: BusinessError.PRECONDITION_FAILED,
            message: 'The medico have one or more patients'
          });


    });
    
    
    


    
    
    
    

    
    
    
});
