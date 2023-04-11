import React, {useContext} from "react";
import {Login, UserContext} from "../login/Login";
import {NavBar} from "../nav/NavBar";
import {isHidden} from "../customers/Customers";

export const Suppliter = ({hidden = false}: isHidden) => {
	const context = useContext(UserContext)
	if (context == null) return <Login />
	if(hidden) return <></>
	console.log("supplier")
	console.log(hidden)
	
	return (
		<>
			<NavBar />
			<p>Algo</p>
			<p>{context?.Nombre}</p>
		</>
	)
}