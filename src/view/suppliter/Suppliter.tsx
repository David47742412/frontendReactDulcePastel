import React from "react";
import {Login} from "../login/Login";
import {NavBar} from "../nav/NavBar";

export const Suppliter = () => {

	if (localStorage.getItem(".Session.DulcePastel.") == null) return <Login />
	
	return (
		<>
			<NavBar />
			<p>Algo</p>
		</>
	)
}