/* eslint-disable prettier/prettier */
import { IsUUID, IsString, IsNotEmpty } from "class-validator";

export class MedicoDto {
    @IsUUID()
    id: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;
 
    @IsString()
    @IsNotEmpty()
    especialidad: string;

    @IsString()
    @IsNotEmpty()
    telefono: string;
}
