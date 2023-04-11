import {MessageSocket} from "../../message/MessageSocket";

export interface IQuery<T> {
	url: string | null;
	message: MessageSocket<T> | null;
}