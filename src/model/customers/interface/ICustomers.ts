import {Customers} from "../dto/Customers";
import {MessageSocket} from "../../message/MessageSocket";

export interface ICustomers {
    Id: string;
    Nombre: string;
    Apellido: string;
    TipoDocId: string;
    NroDoc: string;
    TelFijo: string;
    Direccion: string;
    Celular: string;
    Email: string;
    FNacimiento: string;

    Assign(message: string, customers: Customers | any): MessageSocket<Customers | any>;

    Crud(message: MessageSocket<Customers>): () => void;
}