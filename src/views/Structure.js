import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./Dashboard";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Topbar from "./components/Topbar";
import Cusines from "./Cusines";
import Categories from "./Categories";
import Items from "./Items";
import Tags from "./Tags";
import Departments from "./Departments";
import Employees from "./Employees";
import Customers from "./Customers";
import Tables from "./Tables";
import Users from "./Users";
import Roles from "./Roles";
import Orders from "./Orders";
import Multiple from "./Multiple";



export default function Structure({ toggleLogin, token }) {
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
        <div className="page-wrapper landrick-theme toggled">
            <BrowserRouter>
                <Sidebar setActiveMenu={setActiveMenu} />

                <main className="page-content bg-light" id="mainDiv">
                    <Topbar toggleLogin={toggleLogin} />

                    <Routes>
                        <Route exact path="/" element={<Dashboard setActiveMenu={setActiveMenu} />} />
                        <Route exact path="/Cuisine" element={<Cusines token={token} />} />
                        <Route exact path="/Category" element={<Categories token={token} />} />
                        <Route exact path="/Item" element={<Items />} />
                        <Route exact path="/Tag" element={<Tags />} />
                        <Route exact path="/Department" element={<Departments />} />
                        <Route exact path="/Employee" element={<Employees />} />
                        <Route exact path="/Customer" element={<Customers />} />
                        <Route exact path="/Table" element={<Tables />} />
                        <Route exact path="/User" element={<Users />} />
                        <Route exact path="/Role" element={<Roles />} />
                        <Route exact path="/Order" element={<Orders />} />
                        <Route exact path="/Multiple" element={<Multiple />} />
                    </Routes>

                    <Footer />
                </main>
            </BrowserRouter>
        </div>
    )
}
