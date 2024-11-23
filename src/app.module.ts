/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicosModule } from './medicos/medicos.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';
import { PacientemedicoModule } from './pacientemedico/pacientemedico.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticoEntity } from './diagnostico/diagnostico.entity';
import { PacienteEntity } from './pacientes/paciente.entity';
import { MedicoEntity } from './medicos/medico.entity';

@Module({
  imports: [MedicosModule, PacientesModule, DiagnosticoModule, PacientemedicoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Josuevega78.',
      database: 'parcial2',
      entities: [MedicoEntity, PacienteEntity, DiagnosticoEntity, PacienteEntity],

      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
