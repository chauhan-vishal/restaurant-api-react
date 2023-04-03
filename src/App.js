import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginContext from "./context/LoginContext"

import Login from "./views/Login";
import Structure from "./views/Structure";

import "../src/resources/landrick/css/bootstrap.min.css"
import "../src/resources/landrick/css/simplebar.css"
import "../src/resources/landrick/css/style.css"
import "../src/resources/landrick/css/materialdesignicons.min.css"
import "../src/resources/landrick/css/tabler-icons.min.css"
import "../src/resources/landrick/select2/css/select2.min.css"
import "../src/resources/landrick/select2/css/select2-bootstrap4.min.css"

import "../src/resources/landrick/js/bootstrap.bundle.min.js"
import "../src/resources/landrick/js/simplebar.min.js"
import "../src/resources/landrick/js/feather.min.js"
import "../src/resources/landrick/js/plugins.init.js"
import select2 from "../src/resources/landrick/select2/js/select2.full"
import "../src/resources/landrick/js/themeapp.js"

function App() {

	const [isLogIn, setIsLogIn] = useState(false)
	const token = useRef("");

	// const loadJS = () =>{
	// 	bootstrap()
	// 	simplebar()
	// 	feather()
	// 	plugins()
	// 	select2()
	// 	themeapp()
	// }

	async function toggleLogin(result, token) {
		await setIsLogIn(!isLogIn)
		if (isLogIn == true) {
			window.sessionStorage.setItem("token", "")
			window.sessionStorage.setItem("isLogIn", false)

			alert("Log Out Success")
		}
		else {
			window.sessionStorage.setItem("token", token)
			window.sessionStorage.setItem("isLogIn", !isLogIn)

			alert("Login Success")
		}
	}

	useEffect(() => {

		// loadJS()
		select2()

		if (window.sessionStorage.getItem("isLogIn") == "true") {
			setIsLogIn(true)
			token.current = window.sessionStorage.getItem("token")
		}
	}, [])

	return (
		<div className="App">
			{isLogIn ? <Structure toggleLogin={toggleLogin} token={token.current} /> : <Login toggleLogin={toggleLogin} />}
		</div>
	);
}


export default App;