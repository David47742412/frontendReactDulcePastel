import React from "react";
import {NavBar} from "../nav/NavBar";
import {User} from "../../model/user/dto/User";

export const Main = () => {
	const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_SESSION as string) as string) as User;
	console.log(user);
	return (
		<>
			{ user == null ? window.location.href = "/login" :
				<>
					<NavBar />
					<h1>{user!.Nombre}</h1>
					<h1>{user!.Apellido}</h1>
				</>
			}
		</>
	)
}