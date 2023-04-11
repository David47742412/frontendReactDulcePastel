import {
    ChangeEvent,
    FC,
    FormEvent,
    useState
} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../style/Login/loginStyle.css";
import { User } from "../../model/user/dto/User";
import { MessageSocket } from "../../model/message/MessageSocket";

export const Login: FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    
    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        try {
            const ws = new WebSocket("wss://localhost:7104/auth/login");
            ws.onopen = () => {
                const user = {
                    email: formData.email,
                    password: formData.password
                }
                ws.send(JSON.stringify(user));
            };
            ws.onmessage = async (ev: MessageEvent) => {
                const userData = JSON.parse(ev.data) as MessageSocket<User>;
                if (userData.Status === 200) {
                    localStorage.setItem(".Session.DulcePastel.User", JSON.stringify(userData.Data[0]));
                    localStorage.setItem(".Session.DulcePastel.Token", userData.Token);
                    window.location.href = "/";
                }
            };
            ws.onclose = () => {};
        } catch (e) {
            throw e;
        }
    };
    return (
        <>
            {localStorage.getItem(".Session.DulcePastel.User") && localStorage.getItem(".Session.DulcePastel.Token") ? window.location.href = "/" :
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <h1>Dulce Pastel</h1>
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
                        <label htmlFor="floatingPassword">Password</label>
                        <br></br>
                    </div>
                    <input type="submit" value="Log in"></input>
                    <p>
                        Don't have an account? Sign up
                    </p>
                </div>
            </form>
            }
            <h1 className="logo"> </h1>
        </>
    );
};
