import {Customers} from "../dto/Customers";
import {MessageSocket} from "../../message/MessageSocket";

export interface ICustomers {
    Id: string;
    Nombre: string;
    Apellido: string;
    TipoDocId: string;
    NroDoc: string;
    Direccion: string;
    Celular: string;
    telFijo: string;
    Email: string;
    FNacimiento: Date;

    Assign(message: string, customers: Customers): MessageSocket<Customers>;

    Crud(message: MessageSocket<Customers>): void;
}