import {ICustomers} from "../interface/ICustomers";
import {User} from "../../user/dto/User";
import {MessageSocket} from "../../message/MessageSocket";
import {GenericView} from "../../viewData/dto/GenericView";

export class Customers implements ICustomers {
    TelFijo: string = "";
    Apellido: string = "";
    Celular: string = "";
    Direccion: string = "";
    Email: string = "";
    FNacimiento: string = "";
    Id: string = "";
    Nombre: string = "";
    NroDoc: string = "";
    TipoDocId: string = "";

    Crud(message: MessageSocket<Customers>): () => void {
        const url = process.env.REACT_APP_URL_API;
        const ws = new WebSocket(`${url}/customers`)
        ws.onopen = () => {
            ws.send(JSON.stringify(message));
        }
        ws.onmessage = (ev: MessageEvent) => {
            const response = ev.data as MessageSocket<GenericView>;
            if (response.Status === 401) {
                localStorage.removeItem(process.env.REACT_APP_SESSION as string);
                window.location.href = "/login";
            }
        }
        return (): void => {
            ws.close();
        };
    }

    Assign(message: string, customers: Customers): MessageSocket<Customers > {
        const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_SESSION as string) as string) as User;
        const messageSocket = new MessageSocket<Customers>();
        messageSocket.Token = user.Token;
        messageSocket.Data = [customers]
        messageSocket.Message = message;
        return messageSocket;
    }

}
