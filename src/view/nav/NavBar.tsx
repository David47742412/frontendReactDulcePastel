import 'bootstrap/dist/css/bootstrap.css';
import '../../style/Login/loginStyle.css'
import { Link } from 'react-router-dom';
export const NavBar = () => {
	
	return (
		<>
			<div>
				<nav className="navbar navbar-expand-lg bg-body-tertiary">
					<div className="container-fluid">
						<Link className="navbar-brand" to="/">Dulcepastel</Link>
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
				</nav>
			</div>
		</>
	)
}

