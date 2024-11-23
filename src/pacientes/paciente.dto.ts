/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class PacienteDto {
    @IsUUID()
    id: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;
 
    @IsString()
    @IsNotEmpty()
    genero: string;
}
