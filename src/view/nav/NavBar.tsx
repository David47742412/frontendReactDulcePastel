import 'bootstrap/dist/css/bootstrap.css';
import '../../style/Login/loginStyle.css'
import 'bootstrap/dist/js/bootstrap'
import '../../style/nav/navStyle.css'
import { Link } from 'react-router-dom';
import {User} from "../../model/user/dto/User";
// @ts-ignore
import img from "../../style/nav/img/imgLogo.png";
export const NavBar = () => {
	
	const user = JSON.parse(localStorage.getItem(".Session.DulcePastel.User") as string) as User;
	const token = localStorage.getItem(".Session.DulcePastel.Token") as string;
	
	const onClick = () => {
		localStorage.removeItem(".Session.DulcePastel.Token");
		localStorage.removeItem(".Session.DulcePastel.User");
		window.location.href = "/"
	}
	
	return (
		<>
			{
				user == null && token == null ? window.location.href = "/login" :
				<>
				<div>
					<nav className="navbar navbar-expand-lg bg-body-tertiary">
						<div className="container-fluid">
							<img src={img} className="img-fluid imgLogo" alt="img logo" />
							<Link className="navbar-brand" to="/">
								{/*<!--<img src="/public/favicon.ico" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />-->*/}
									DulcePastel
							</Link>
							<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
									data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
									aria-label="Toggle navigation">
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
						<img src={user?.Foto} className="rounded-5 rounded-circle imgUser" alt="img user" />
						<button className="rounded-5 rounded-circle border imgUser" onClick={onClick}>
							<img src="https://cdn.icon-icons.com/icons2/1769/PNG/512/4115235-exit-logout-sign-out_114030.png" className="rounded-5 rounded-circle border border-white logoutMove imgUser" alt="img logout" />
						</button>
					</nav>
				</div>
				</>
			}
		</>
	)
}

