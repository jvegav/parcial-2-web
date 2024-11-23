/* eslint-disable prettier/prettier */

import { Test, TestingModule } from "@nestjs/testing";
import { DiagnosticoService } from "./diagnostico.service";
import { Repository } from "typeorm";
import { DiagnosticoEntity } from "./diagnostico.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BusinessError } from "../shared/errorrs/business-errors";


describe('Diagnostico Service', () => {
    let service: DiagnosticoService;
    let diagnosticoRepository: Repository<DiagnosticoEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DiagnosticoService,
                {
                    provide: getRepositoryToken(DiagnosticoEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<DiagnosticoService>(DiagnosticoService);
        diagnosticoRepository = module.get<Repository<DiagnosticoEntity>>(getRepositoryToken(DiagnosticoEntity));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Debe estar definido', () => {
        expect(service).toBeDefined();
    });

    it('findAll: debe retornar todos los diagnósticos con sus pacientes', async () => {
        const mockDiagnosticos = [
            { id: '1', descripcion: 'Diagnóstico 1', pacientes: [] },
            { id: '2', descripcion: 'Diagnóstico 2', pacientes: [] },
        ] as DiagnosticoEntity[];
    
        jest.spyOn(diagnosticoRepository, 'find').mockResolvedValue(mockDiagnosticos);
    
        const result = await service.findAll();
        expect(result).toEqual(mockDiagnosticos);
        expect(diagnosticoRepository.find).toHaveBeenCalledWith({ relations: ['pacientes'] });
    });

    it('findOne: debe retornar un diagnóstico por su ID', async () => {
        const mockDiagnostico = { id: '1', descripcion: 'Diagnóstico detallado', pacientes: [] } as DiagnosticoEntity;
    
        jest.spyOn(diagnosticoRepository, 'findOne').mockResolvedValue(mockDiagnostico);
    
        const result = await service.findOne('1');
        expect(result).toEqual(mockDiagnostico);
        expect(diagnosticoRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' }, relations: ['pacientes'] });
    });

    it('findOne: debe lanzar una excepción si el diagnóstico no existe', async () => {
        jest.spyOn(diagnosticoRepository, 'findOne').mockResolvedValue(undefined);
    
        await expect(service.findOne('1')).rejects.toMatchObject({
            type: BusinessError.NOT_FOUND,
            message: 'The diagnostico with the given id was not found'
            
          });
    });


    it('create: debe crear un diagnóstico', async () => {
        const mockDiagnostico = { id: '1', descripcion: 'Diagnóstico con más de 200 caracteres...'.repeat(5), pacientes: [] } as DiagnosticoEntity;
    
        jest.spyOn(diagnosticoRepository, 'save').mockResolvedValue(mockDiagnostico);
    
        const result = await service.create(mockDiagnostico);
        expect(result).toEqual(mockDiagnostico);
        expect(diagnosticoRepository.save).toHaveBeenCalledWith(mockDiagnostico);
    });
    

    it('create: debe lanzar una excepción si la descripción tiene menos de 200 caracteres', async () => {
        const mockDiagnostico = { id: '1', descripcion: 'Descripción corta', pacientes: [] } as DiagnosticoEntity;


        await expect(service.create(mockDiagnostico)).rejects.toMatchObject({
            type: BusinessError.PRECONDITION_FAILED,
            message: 'El diagnostico necesita una descripcion de mas de 200 caracteres'
            
          });
    });
    
    it('delete: debe eliminar un diagnóstico por su ID', async () => {
        const mockDiagnostico = { id: '1', descripcion: 'Diagnóstico detallado', pacientes: [] } as DiagnosticoEntity;
    
        jest.spyOn(diagnosticoRepository, 'findOne').mockResolvedValue(mockDiagnostico);
        jest.spyOn(diagnosticoRepository, 'remove').mockResolvedValue(undefined);
    
        await service.delete('1');
        expect(diagnosticoRepository.remove).toHaveBeenCalledWith(mockDiagnostico);
    });
    

    it('delete: debe lanzar una excepción si el diagnóstico no existe', async () => {
        jest.spyOn(diagnosticoRepository, 'findOne').mockResolvedValue(undefined);
    
        
        await expect(service.delete('1')).rejects.toMatchObject({
            type: BusinessError.NOT_FOUND,
            message: 'The diagnostico with the given id was not found'
            
          });
    });
    

    
    
    

})