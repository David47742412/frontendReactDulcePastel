import {ChangeEvent, createContext, FC, FormEvent, useState} from "react";
import { User } from "../../model/user/dto/User";
import 'bootstrap/dist/css/bootstrap.css'
import {MessageSocket} from "../../model/message/MessageSocket";
import {Main} from "../main/Main";

export let UserContext = createContext<User | null>(null);

export const Login: FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    
    const [user, setUser] = useState<User | null>(null);
    
    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target;
        setFormData({...formData, [name]: value});
    };
    
    const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        try {
            const ws = new WebSocket("wss://localhost:7104/auth/login");
            ws.onopen = () => {
                const loginData = {
                    email: formData.email,
                    password: formData.password
                };
                ws.send(JSON.stringify(loginData));
            };
            ws.onmessage = async (ev: MessageEvent) => {
                const userData = JSON.parse(ev.data) as MessageSocket<User>;
                if (userData.Status === 200) {
                    const newUser = userData.Data[0];
                    newUser.Token = userData.Token;
                    setUser(newUser);
                }
            };
            ws.onclose = () => {};
        } catch (e) {
            throw e;
        }
    };
    
    if (user != null) localStorage.setItem(".Dulcepastel.Token.", user.Token);
    
    return (
        <UserContext.Provider value={user} >
            { user ? [<Main />] :
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                    />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <label htmlFor="floatingPassword">Contraseña</label>
                </div>
                <button type="submit" className="btn btn-outline-primary">
                    Ingresar
                </button>
            </form>
            }
            {}
        </UserContext.Provider>
    );
};