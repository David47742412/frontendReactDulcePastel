import 'bootstrap/dist/css/bootstrap.css';
import '../../style/Login/loginStyle.css'
import 'bootstrap/dist/js/bootstrap'
import '../../style/nav/navStyle.css'
import { Link } from 'react-router-dom';
import {User} from "../../model/user/dto/User";
export const NavBar = () => {
	
	const user = JSON.parse(localStorage.getItem(".Session.DulcePastel.User") as string) as User;
	const token = localStorage.getItem(".Session.DulcePastel.Token") as string;
	
	if (user == null && token == null) window.location.href = "/login";
	return (
		<>
			<div>
				<nav className="navbar navbar-expand-lg bg-body-tertiary">
					<div className="container-fluid">
						<Link className="navbar-brand" to="/">
							{/*<!--<img src="/public/favicon.ico" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />-->*/}
								DulcePastel
						</Link>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
								data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
								aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNavDropdown">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link className="nav-link" to="/clientes">Clientes</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/proveedores">Proveedores</Link>
								</li>
							</ul>
						</div>
					</div>
					<span className="navbar-tex textNameUser">
							{user!.Nombre}
					</span>
					<img src={user?.Foto} className="rounded-5 rounded-circle border border-white imgUser" alt="img user" />
				</nav>
			</div>
		</>
	)
}

