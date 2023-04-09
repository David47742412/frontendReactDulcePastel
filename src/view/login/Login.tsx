import {ChangeEvent, FC, FormEvent, useState, createContext, useContext, Dispatch, SetStateAction} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import {User} from "../../model/user/dto/User";
import {MessageSocket} from "../../model/message/MessageSocket";

interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => null,
})

export const Login: FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { setUser } = useContext(UserContext);

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        try {
            const ws = new WebSocket("wss://localhost:7104/auth/login");
            console.log("antes")
            ws.onopen = () => {
                const loginData = {
                    email: formData.email,
                    password: formData.password
                }
                console.log("enviado")
                ws.send(JSON.stringify(loginData));
            }
            ws.onmessage = async (ev: MessageEvent) => {
                const userData = JSON.parse(ev.data) as MessageSocket<User>;
                const data = new MessageSocket<User>(userData);
                console.log("reciviendo")
                console.log(data)
                if (data.Status === 200)
                    setUser(userData.Data[0]);
            }
            ws.onclose = () => {console.log("cerrando")}
        } catch (e) {
            throw e;
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} placeholder="name@example.com" required />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating">
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} placeholder="Password" required />
                    <label htmlFor="floatingPassword">Contraseña</label>
                </div>
                <button type="submit" className="btn btn-outline-primary">Ingresar</button>
            </form>
        </>
    );
}