import {IQuery} from "../interface/IQuery";
import {MessageSocket} from "../../message/MessageSocket";

export class Query<T> implements IQuery<T> {
	public async useQuery(url: string, message: MessageSocket<T>): Promise<MessageSocket<T>> {
		const ws = new WebSocket(url);
		const dataPromise = new Promise<MessageSocket<T>>((resolve, reject) => {
			try {
				ws.onopen = () => {
					ws.send(JSON.stringify(message));
				};
				
				ws.onmessage = (ev: MessageEvent) => {
					const data = JSON.parse(ev.data) as MessageSocket<T>;
					if (data.Status === 401) {
						window.location.href = "/login";
						localStorage.removeItem(".Session.DulcePastel.User");
						localStorage.removeItem(".Session.DulcePastel.Token");
					}
					resolve(data);
				};
			} catch (e) {
				reject(e);
			}
		});
		return await dataPromise;
	}
	
	message: MessageSocket<T> | null = null;
	url: string | null = null;
}