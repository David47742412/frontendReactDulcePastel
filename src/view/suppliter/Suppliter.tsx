import React from "react";
import {NavBar} from "../nav/NavBar";
import {User} from "../../model/user/dto/User";

export const Suppliter = () => {
	
	const user = JSON.parse(localStorage.getItem(".Session.DulcePastel.User") as string) as User;
	const token = localStorage.getItem(".Session.DulcePastel.Token") as string;
	
	if (user == null && token == null) window.location.href = "/login";
	
	return (
		<>
			<NavBar />
			<p>Algo</p>
		</>
	)
}