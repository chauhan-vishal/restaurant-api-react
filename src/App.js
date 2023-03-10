import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import Sidebar from "./views/components/Sidebar";
import Footer from "./views/components/Footer";
import Topbar from "./views/components/Topbar";
import Categoies from "./views/Categories";

import "../src/resources/landrick/css/bootstrap.min.css"
import "../src/resources/landrick/css/simplebar.css"
import "../src/resources/landrick/css/style.css"
import "../src/resources/landrick/css/materialdesignicons.min.css"
import "../src/resources/landrick/css/tabler-icons.min.css"

import "../src/resources/landrick/js/bootstrap.bundle.min.js"
import "../src/resources/landrick/js/simplebar.min.js"
import "../src/resources/landrick/js/feather.min.js"
import "../src/resources/landrick/js/plugins.init.js"


function App() {

	return (
		<div className="App">
			<div className="page-wrapper landrick-theme toggled">
				<BrowserRouter>
					<Sidebar />

					<main className="page-content bg-light">
						<Topbar />

						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/Category" element={<Categoies />} />
						</Routes>

						<Footer />
					</main>
				</BrowserRouter>
			</div>
		</div>
	);
}


export default App;