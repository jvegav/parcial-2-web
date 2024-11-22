import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicosService } from './medicos/medicos.service';
import { MedicosModule } from './medicos/medicos.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { DiagnosticosModule } from './diagnosticos/diagnosticos.module';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';

@Module({
  imports: [MedicosModule, PacientesModule, DiagnosticosModule, DiagnosticoModule],
  controllers: [AppController],
  providers: [AppService, MedicosService],
})
export class AppModule {}
