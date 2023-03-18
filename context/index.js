import React, { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {
	const [username, setUsername] = useState("");
	const [secret, setSecret] = useState("");
	const [email, setEmail] = useState("");

	const value = {
		username,
		setUsername,
		secret,
		setSecret,
		email,
		setEmail
	};

	return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
