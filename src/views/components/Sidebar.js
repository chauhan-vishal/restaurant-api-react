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
					<li><NavLink to="/Cuisine"><i className="ti ti-home me-2"></i>Cuisine</NavLink></li>
					<li><NavLink to="/SubCategory"><i className="ti ti-home me-2"></i>SubCategory</NavLink></li>
					<li><NavLink to="/Item"><i className="ti ti-home me-2"></i>Item</NavLink></li>
					<li><NavLink to="/Department"><i className="ti ti-home me-2"></i>Department</NavLink></li>
					<li><NavLink to="/Employee"><i className="ti ti-home me-2"></i>Employee</NavLink></li>
					<li><NavLink to="/Customer"><i className="ti ti-home me-2"></i>Customer</NavLink></li>
					<li><NavLink to="/Table"><i className="ti ti-home me-2"></i>Table</NavLink></li>		
					<li><NavLink to="/User"><i className="ti ti-home me-2"></i>User</NavLink></li>
					<li><NavLink to="/Order"><i className="ti ti-home me-2"></i>Orders</NavLink></li>



				</ul>
			</div>
		</nav>
	)
}
