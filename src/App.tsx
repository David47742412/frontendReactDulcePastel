import React from 'react';
import {Login} from "./view/login/Login";

const App = (): JSX.Element => {
/*
    useEffect(() => {wss://localhost:7104/auth/login
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
*/
    return (
        <>
           <Login />
        </>
    );
}

export default App;