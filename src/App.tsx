import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import {Suppliter} from "./view/suppliter/Suppliter";
import {Customers as Custom} from "./view/customers/Customers";
import { Main } from './view/main/Main';
import React from "react";
import {Login} from "./view/login/Login";

const App = (): JSX.Element => {
    return (
        <div>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/clientes" element={<Custom />} />
                        <Route path="/proveedores" element={<Suppliter />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;