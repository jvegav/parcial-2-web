import { Test, TestingModule } from '@nestjs/testing';
import { PacientemedicoService } from './pacientemedico.service';

describe('PacientemedicoService', () => {
  let service: PacientemedicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacientemedicoService],
    }).compile();

    service = module.get<PacientemedicoService>(PacientemedicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
