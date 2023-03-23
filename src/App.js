import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import Sidebar from "./views/components/Sidebar";
import Footer from "./views/components/Footer";
import Topbar from "./views/components/Topbar";
import Cusines from "./views/Cusines";
import Categories from "./views/Categories";
import Items from "./views/Items";
import Tags from "./views/Tags";
import Departments from "./views/Departments";
import Employees from "./views/Employees";
import Customers from "./views/Customers";
import Tables from "./views/Tables";
import Users from "./views/Users";
import Orders from "./views/Orders";


import "../src/resources/landrick/css/bootstrap.min.css"
import "../src/resources/landrick/css/simplebar.css"
import "../src/resources/landrick/css/style.css"
import "../src/resources/landrick/css/materialdesignicons.min.css"
import "../src/resources/landrick/css/tabler-icons.min.css"
import "../src/resources/landrick/select2/css/select2.min.css"

import "../src/resources/landrick/js/bootstrap.bundle.min.js"
import "../src/resources/landrick/js/simplebar.min.js"
import "../src/resources/landrick/js/feather.min.js"
import "../src/resources/landrick/js/plugins.init.js"
import "../src/resources/landrick/select2/js/select2.full"
// import "../src/resources/landrick/js/theme-app.js"

function App() {
	const [activeMenu, setActiveMenu] = useState(window.location.pathname.substring(window.location.pathname.lastIndexOf('/')))

	//Admin Menu
	function activateSidebarMenu() {
		if (activeMenu !== "" && document.getElementById("sidebar")) {
			var menuItems = document.querySelectorAll('#sidebar a');

			for (var i = 1, len = menuItems.length; i < len; i++) {


				if (menuItems[i].getAttribute("href") === activeMenu) {
					menuItems[i].parentElement.classList.add("active");

					if (menuItems[i].closest(".sidebar-submenu")) {
						menuItems[i].closest(".sidebar-submenu").classList.add("d-block");
					}
					if (menuItems[i].closest(".sidebar-dropdown")) {
						menuItems[i].closest(".sidebar-dropdown").classList.add("active");
					}
				}
				else {
					menuItems[i].parentElement.classList.remove("active");
				}
			}
		}
	}

	useEffect(() => {
		activateSidebarMenu()
	}, [activeMenu])

	return (
		<div className="App">
			<div className="page-wrapper landrick-theme toggled">
				<BrowserRouter>
					<Sidebar setActiveMenu={setActiveMenu} />

					<main className="page-content bg-light" id="mainDiv">
						<Topbar />

						<Routes>
							<Route exact path="/" element={<Dashboard setActiveMenu={setActiveMenu} />} />
							<Route exact path="/Tag" element={<Tags />} />
							<Route exact path="/Cuisine" element={<Cusines />} />
							<Route exact path="/Category" element={<Categories />} />
							<Route exact path="/Item" element={<Items />} />
							<Route exact path="/Department" element={<Departments />} />
							<Route exact path="/Employee" element={<Employees />} />
							<Route exact path="/Customer" element={<Customers />} />
							<Route exact path="/Table" element={<Tables />} />
							<Route exact path="/User" element={<Users />} />
							<Route exact path="/Order" element={<Orders />} />
						</Routes>

						<Footer />
					</main>
				</BrowserRouter>
			</div>
		</div>
	);
}


export default App;