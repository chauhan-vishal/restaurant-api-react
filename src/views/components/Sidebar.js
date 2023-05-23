import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ role, setActiveMenu }) {

	return (
		<nav id="sidebar" className="sidebar-wrapper sidebar-dark">
			<div className="sidebar-content" data-simplebar style={{ height: "calc(100% - 60px)" }}>
				<div className="sidebar-brand">
					<NavLink to="/">
						<img src="" height="24" className="logo-light-mode" alt="" />
						<img src="" height="24" className="logo-dark-mode" alt="" />
						<span className="sidebar-colored">
							<img src="" height="24" alt="" />
						</span>
					</NavLink>
				</div>

				<ul className="sidebar-menu">
					<li onClick={() => { setActiveMenu('/') }}><NavLink to="/"><i className="ti ti-home me-2"></i>Dashboard</NavLink></li>
					{
						role == "Admin" ? (
							<>
								<li onClick={() => { setActiveMenu('/Cuisine') }}><NavLink to="/Cuisine"><i className="ti ti-home me-2"></i>Cuisine</NavLink></li>
								<li onClick={() => { setActiveMenu('/Category') }}><NavLink to="/Category"><i className="ti ti-home me-2"></i>Category</NavLink></li>
								<li onClick={() => { setActiveMenu('/Item') }}><NavLink to="/Item"><i className="ti ti-home me-2"></i>Item</NavLink></li>
								<li onClick={() => { setActiveMenu('/Tag') }}><NavLink to="/Tag"><i className="ti ti-home me-2"></i>Tag</NavLink></li>
								<li onClick={() => { setActiveMenu('/Department') }}><NavLink to="/Department"><i className="ti ti-home me-2"></i>Department</NavLink></li>
								<li onClick={() => { setActiveMenu('/Employee') }}><NavLink to="/Employee"><i className="ti ti-home me-2"></i>Employee</NavLink></li>
								<li onClick={() => { setActiveMenu('/Customer') }}><NavLink to="/Customer"><i className="ti ti-home me-2"></i>Customer</NavLink></li>
								<li onClick={() => { setActiveMenu('/Role') }}><NavLink to="/Role"><i className="ti ti-home me-2"></i>Role</NavLink></li>
								<li onClick={() => { setActiveMenu('/Table') }}><NavLink to="/Table"><i className="ti ti-home me-2"></i>Table</NavLink></li>
								<li onClick={() => { setActiveMenu('/User') }}><NavLink to="/User"><i className="ti ti-home me-2"></i>User</NavLink></li>
								<li onClick={() => { setActiveMenu('/Order') }}><NavLink to="/Order"><i className="ti ti-home me-2"></i>Orders</NavLink></li></>
						) : (
							<>
								<li onClick={() => { setActiveMenu('/Kiosk') }}><NavLink to="/Kiosk"><i className="ti ti-home me-2"></i>Kiosk</NavLink></li>
							</>
						)
					}

				</ul>
			</div>
		</nav >
	)
}
