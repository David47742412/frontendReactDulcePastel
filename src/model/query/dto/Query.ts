import {IQuery} from "../interface/IQuery";
import {MessageSocket} from "../../message/MessageSocket";

export class Query<T> implements IQuery<T> {
	public async useQuery({url, message}: Query<T>): Promise<MessageSocket<T> | void> {
		try {
			const ws = new WebSocket(url as string);
			
			ws.onopen = () => {
				ws.send(JSON.stringify(message));
			}
			
			ws.onmessage = (ev: MessageEvent) => {
				const data = JSON.parse(ev.data) as MessageSocket<T>;
				if (data.Status === 401) {
					window.location.href = "/login";
					localStorage.removeItem(".Session.DulcePastel.User");
					localStorage.removeItem(".Session.DulcePastel.Token");
					return;
				}
				return data;
			}
		} catch (e) {
			throw e;
		}
	}
	message: MessageSocket<T> | null = null;
	url: string | null = null;
}