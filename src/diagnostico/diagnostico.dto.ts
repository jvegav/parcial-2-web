/* eslint-disable prettier/prettier */
import { IsUUID, IsString, IsNotEmpty } from "class-validator";

export class DiagnosticoDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;
 
    @IsString()
    @IsNotEmpty()
    descripcion: string;
}
