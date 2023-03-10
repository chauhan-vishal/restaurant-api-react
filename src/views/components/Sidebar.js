import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
	return (
		<nav id="sidebar" className="sidebar-wrapper sidebar-dark">
			<div className="sidebar-content" data-simplebar style={{ height: "calc(100% - 60px)" }}>
				<div className="sidebar-brand">
					<NavLink to="index.html">
						<img src="" height="24" className="logo-light-mode" alt="" />
						<img src="" height="24" className="logo-dark-mode" alt="" />
						<span className="sidebar-colored">
							<img src="" height="24" alt="" />
						</span>
					</NavLink>
				</div>

				<ul className="sidebar-menu">
					<li><NavLink to="/"><i className="ti ti-home me-2"></i>Dashboard</NavLink></li>
					<li><NavLink to="/Category"><i className="ti ti-home me-2"></i>Category</NavLink></li>
					<li><NavLink to="/"><i className="ti ti-home me-2"></i>Cuisine</NavLink></li>
					<li><NavLink to="/"><i className="ti ti-home me-2"></i>Sub Category</NavLink></li>

				</ul>
			</div>
		</nav>
	)
}
