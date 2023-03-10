import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Customer from './components/Customer'





export default function Customers() {
	const [Customers, setCustomers] = useState(null)

	useEffect(() => {
		fetch("http://localhost:2503/api/cutomer")
			.then(res => {
				return res.json()
			})
			.then(data => {
				setCustomers(data.document)
			})
	}, [])


	return (
		<div className="container-fluid">
			<div className="layout-specing">
				<div className="d-md-flex justify-content-between">
					<div>
						<h5 className="mb-0">Customer</h5>

						<nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
							<ul className="breadcrumb bg-transparent rounded mb-0 p-0">
								<li className="breadcrumb-item text-capitalize"><NavLink to="index.html">Landrick</NavLink></li>
								<li className="breadcrumb-item text-capitalize active" aria-current="page">Customer</li>
							</ul>
						</nav>
					</div>

					<div className="mt-4 mt-sm-0">
						<NavLink to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-product">Customer</NavLink>
					</div>
				</div>

				<div className="row">
					<div className="col-12 mt-4">
						<div className="table-responsive shadow rounded">
							<table className="table table-center bg-white mb-0" id="table">
								<thead>
									<tr>
										<th className="border-bottom p-3">Sr. No.</th>
										<th className="text-center border-bottom p-3" style={{ minWidth: "150px" }}>Image</th>
										<th className="border-bottom p-3" style={{ minWidth: "200px" }}>Customer Name</th>
										<th className="text-center border-bottom p-3">Status</th>
										<th className="text-end border-bottom p-3" style={{ minWidth: "200px" }}></th>
									</tr>
								</thead>
								<tbody>
									{
										Customers &&
										Customers.map((cust, index) => {
											return <Customer key={index} customer={cust} index={index} />
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

