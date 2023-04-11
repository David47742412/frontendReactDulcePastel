import React from "react";
import {NavBar} from "../nav/NavBar";
import {User} from "../../model/user/dto/User";

export const Main = () => {
	
	const user = JSON.parse(localStorage.getItem(".Session.DulcePastel.User") as string) as User;
	const token = localStorage.getItem(".Session.DulcePastel.Token") as string;
	
	if (user == null && token == null) window.location.href = "/login";
	
	return (
		<>
			<NavBar />
			<h1>{user!.Nombre}</h1>
			<h1>{user!.Apellido}</h1>
		</>
	)
}