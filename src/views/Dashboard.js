import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Dashboard() {

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
					<div className="col mt-4" style={{width: "auto"}}>
						<NavLink to="#!" className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
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
					<div className="col mt-4"  style={{width: "auto"}}>
						<NavLink to="#!" className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
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
					<div className="col mt-4" style={{width: "auto"}}>
						<NavLink to="#!" className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
							<div className="d-flex align-items-center">
								<div className="icon text-center rounded-pill">
									<i className="ti ti-home me-2 fs-4 mb-0"></i>
								</div>
								<div className="flex-1 ms-3">
									<h6 className="mb-0 text-muted">Sub Categories</h6>
									<p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="4589">10</span></p>
								</div>
							</div>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	)
}
