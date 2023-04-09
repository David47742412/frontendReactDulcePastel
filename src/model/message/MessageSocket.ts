export class MessageSocket<T> {
    Message: string = "";
    Status: number = 0;
    Data: T[] = [];
    Token: string = "";

    constructor(messageSocket: MessageSocket<T>) {
        this.Message = messageSocket.Message;
        this.Status = messageSocket.Status;
        this.Data = messageSocket.Data;
        this.Token = messageSocket.Token;
    }

}