import {IUser} from "../interface/IUser";

export class User implements IUser {
    Id: string = "";
    Nombre: string = "";
    Apellido: string = "";
    Celular: string = "";
    NroDoc: string = "";
    Email: string = "";
    IdTipoDoc: string = "";
    IdEstado: string = "";
    Foto: string = "";
    Ocupacion: string = "";
    FchNacimiento: string = "";

}