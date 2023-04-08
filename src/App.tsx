import React, {useEffect, useState} from 'react';
import {GenericView} from "./model/utility/GenericView";

const App = (): JSX.Element => {
    const [datos, setDatos] = useState<GenericView[]>([]);

    useEffect(() => {
        const ws = new WebSocket("wss://localhost:7154/ws");
        ws.onopen = () => {
            console.log("connected");
            ws.send("connect");
        };

        ws.onmessage = (event: MessageEvent) => {
            console.log("message received");
            setDatos(JSON.parse(event.data));
        };

        ws.onclose = () => {
            console.log("disconnected");
        };
    }, []);

    return (
        <>
            {datos.map(d => (
                <h1 key={d.Value1}>{d.Value2}</h1>
            ))}
        </>
    );
}

export default App;