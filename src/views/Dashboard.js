import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'


export default function Dashboard({setActiveMenu}) {

	useEffect(()=>{
		setActiveMenu('/')
	},[])

	return (
	<div className="container-fluid">
		<div className="layout-specing">
				<div className="d-md-flex justify-content-between align-items-center">
					<h5 className="mb-0">Dashboard</h5>

					<nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
						<ul className="breadcrumb bg-transparent rounded mb-0 p-0">
							<li className="breadcrumb-item text-capitalize"><NavLink to="index.html">Landrick</NavLink></li>
							<li className="breadcrumb-item text-capitalize active" aria-current="page">Dashboard</li>
						</ul>
					</nav>
				</div>

				<div className="row row-cols-xl-5 row-cols-md-2 row-cols-1">
					<div className="col mt-4"  style={{width: "auto"}} onClick={() => { setActiveMenu('/Cuisine') }}>
						<NavLink to="/Cuisine" className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
							<div className="d-flex align-items-center">
								<div className="icon text-center rounded-pill">
									<i className="ti ti-home me-2 fs-4 mb-0"></i>
								</div>
								<div className="flex-1 ms-3">
									<h6 className="mb-0 text-muted">Cuisine</h6>
									<p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="4589">8</span></p>
								</div>
							</div>
						</NavLink>
					</div>
					<div className="col mt-4" style={{width: "auto"}} onClick={() => { setActiveMenu('/Category') }}>
						<NavLink to="/Category" className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
							<div className="d-flex align-items-center">
								<div className="icon text-center rounded-pill">
									<i className="ti ti-home me-2 fs-4 mb-0"></i>
								</div>
								<div className="flex-1 ms-3">
									<h6 className="mb-0 text-muted">Categories</h6>
									<p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="4589">5</span></p>
								</div>
							</div>
						</NavLink>
					</div>
					<div className="col mt-4" style={{width: "auto"}} onClick={() => { setActiveMenu('/Item') }}>
						<NavLink to="/Item" className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
							<div className="d-flex align-items-center">
								<div className="icon text-center rounded-pill">
									<i className="ti ti-home me-2 fs-4 mb-0"></i>
								</div>
								<div className="flex-1 ms-3">
									<h6 className="mb-0 text-muted">Items</h6>
									<p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="4589">10</span></p>
								</div>
							</div>
						</NavLink>
					</div>
					<div className="col mt-4" style={{width: "auto"}} onClick={() => { setActiveMenu('/Tag') }}>
						<NavLink to="/Tag" className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
							<div className="d-flex align-items-center">
								<div className="icon text-center rounded-pill">
									<i className="ti ti-home me-2 fs-4 mb-0"></i>
								</div>
								<div className="flex-1 ms-3">
									<h6 className="mb-0 text-muted">Tags</h6>
									<p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="4589">25</span></p>
								</div>
							</div>
						</NavLink>
					</div>
					<div className="col mt-4" style={{width: "auto"}} onClick={() => { setActiveMenu('/Department') }}>
						<NavLink to="/Department" className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
							<div className="d-flex align-items-center">
								<div className="icon text-center rounded-pill">
									<i className="ti ti-home me-2 fs-4 mb-0"></i>
								</div>
								<div className="flex-1 ms-3">
									<h6 className="mb-0 text-muted">Departments</h6>
									<p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="4589">20</span></p>
								</div>
							</div>
						</NavLink>
					</div>
					<div className="col mt-4" style={{width: "auto"}} onClick={() => { setActiveMenu('/Employee') }}>
						<NavLink to="/Employee" className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
							<div className="d-flex align-items-center">
								<div className="icon text-center rounded-pill">
									<i className="ti ti-home me-2 fs-4 mb-0"></i>
								</div>
								<div className="flex-1 ms-3">
									<h6 className="mb-0 text-muted">Employees</h6>
									<p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="4589">10</span></p>
								</div>
							</div>
						</NavLink>
					</div>
					<div className="col mt-4" style={{width: "auto"}} onClick={() => { setActiveMenu('/Customer') }}>
						<NavLink to="/Customer" className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
							<div className="d-flex align-items-center">
								<div className="icon text-center rounded-pill">
									<i className="ti ti-home me-2 fs-4 mb-0"></i>
								</div>
								<div className="flex-1 ms-3">
									<h6 className="mb-0 text-muted">Customers</h6>
									<p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="4589">520</span></p>
								</div>
							</div>
						</NavLink>
					</div>
					<div className="col mt-4" style={{width: "auto"}} onClick={() => { setActiveMenu('/Role') }}>
						<NavLink to="/Role" className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
							<div className="d-flex align-items-center">
								<div className="icon text-center rounded-pill">
									<i className="ti ti-home me-2 fs-4 mb-0"></i>
								</div>
								<div className="flex-1 ms-3">
									<h6 className="mb-0 text-muted">Roles</h6>
									<p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="4589">30</span></p>
								</div>
							</div>
						</NavLink>
					</div>
					<div className="col mt-4" style={{width: "auto"}} onClick={() => { setActiveMenu('/Table') }}>
						<NavLink to="/Table" className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
							<div className="d-flex align-items-center">
								<div className="icon text-center rounded-pill">
									<i className="ti ti-home me-2 fs-4 mb-0"></i>
								</div>
								<div className="flex-1 ms-3">
									<h6 className="mb-0 text-muted">Tables</h6>
									<p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="4589">450</span></p>
								</div>
							</div>
						</NavLink>
					</div>
					<div className="col mt-4" style={{width: "auto"}} onClick={() => { setActiveMenu('/User') }}>
						<NavLink to="/User" className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
							<div className="d-flex align-items-center">
								<div className="icon text-center rounded-pill">
									<i className="ti ti-home me-2 fs-4 mb-0"></i>
								</div>
								<div className="flex-1 ms-3">
									<h6 className="mb-0 text-muted">Users</h6>
									<p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="4589">62</span></p>
								</div>
							</div>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	)
}
