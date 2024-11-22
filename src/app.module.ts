import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicosService } from './medicos/medicos.service';
import { MedicosModule } from './medicos/medicos.module';

@Module({
  imports: [MedicosModule],
  controllers: [AppController],
  providers: [AppService, MedicosService],
})
export class AppModule {}
