/* eslint-disable prettier/prettier */
import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { PacientemedicoService } from './pacientemedico.service';


@Controller('pacientes')
@UseInterceptors(BusinessErrorsInterceptor)
export class PacientemedicoController {
    constructor(private readonly pacienteMedicoService: PacientemedicoService){}

    @Post(':pacienteId/medicos/:medicoId')
    async addArtworkMuseum(@Param('pacienteId') pacienteId: string, @Param('medicoId') medicoId: string){
        return await this.pacienteMedicoService.addMedicoToPaciente(medicoId, pacienteId);
    }


}
