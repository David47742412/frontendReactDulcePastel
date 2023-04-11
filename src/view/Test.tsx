import {useEffect, useState} from "react";
import {MessageSocket} from "../model/message/MessageSocket";
import {Document} from "../model/document/dto/Document";
import {GenericView} from "../model/viewData/dto/GenericView";

export const Test = () => {
	//eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEdWxjZXBhc3RlbCIsImp0aSI6IjY1MGRhMWJjLTUxNGMtNDFjNS04NDcyLTAzYTNkZGU3ZTMzOSIsImlhdCI6IjA0LzEwLzIwMjMgMTk6Mzk6MDkiLCJpZCI6IjAxIiwidXN1YXJpb0VtYWlsIjoiZGF2aWRAZ21haWwuY29tIiwiZXhwIjoxNjgxNzYwMzQ5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTI3IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzEyNyJ9.5f8EUhTWQ5uCIQV88BVsvp4rGjoeX4ENgmNzVwCOaAcXv4Xbr7M7nvy4TB1gdWmK
	const message = new MessageSocket<Document>();
	message.Token = "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEdWxjZXBhc3RlbCIsImp0aSI6IjY1MGRhMWJjLTUxNGMtNDFjNS04NDcyLTAzYTNkZGU3ZTMzOSIsImlhdCI6IjA0LzEwLzIwMjMgMTk6Mzk6MDkiLCJpZCI6IjAxIiwidXN1YXJpb0VtYWlsIjoiZGF2aWRAZ21haWwuY29tIiwiZXhwIjoxNjgxNzYwMzQ5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTI3IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzEyNyJ9.5f8EUhTWQ5uCIQV88BVsvp4rGjoeX4ENgmNzVwCOaAcXv4Xbr7M7nvy4TB1gdWmK";
	message.Data = [];
	message.Status = 2400;
	message.Message = "Find";
	
	const [tipoDoc, setTipoDoc] = useState<GenericView[]>();
	
	useEffect(() => {
		const ws = new WebSocket("wss://localhost:7104/document")
		ws.onopen = (ev: Event) => {
			ws.send(JSON.stringify(message));
		};
		ws.onmessage = (ev: MessageEvent) => {
			const response = JSON.parse(ev.data) as MessageSocket<GenericView>;
			console.log(response)
			setTipoDoc(response.Data);
		};
	}, []);
	
	return (
		<div key={0}>
			{tipoDoc?.map(dt => (
				<div key={dt.Value1}>
					<p>{dt.Value1}</p>
					<p>{dt.Value2}</p>
				</div>
			))}
		</div>
	)
};