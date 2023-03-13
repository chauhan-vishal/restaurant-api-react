import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { NavLink } from 'react-router-dom'


import Category from './components/Category'

export default function Categories() {
	const [categories, setCategories] = useState([])

	useEffect(() => {
		console.log("16")
		fetch("http://localhost:2503/api/category")
			.then(res => {
				return res.json()
			})
			.then(response => {
				setCategories(response.document)
			})
	}, [])

	const columns = [
		{
			name: "Sr. No.",
			selector: (row, index) => "#" + (index + 1)
		},
		{
			name: "Image",
			selector: row => ""
		},
		{
			name: "Category Name",
			selector: row => row.name
		},
		{
			name: "Status",
			selector: row => row.status
		},
		{
			name: "Actions",
			selector: row => <>
				<NavLink to="invoice.html" className="btn btn-sm btn-primary">View</NavLink>
				<NavLink to="#" className="btn btn-sm btn-soft-success ms-2">Edit</NavLink>
				<NavLink to="#" className="btn btn-sm btn-soft-danger ms-2">Delete</NavLink>
			</>
		}
	];

	return (
		<div className="container-fluid">
			<div className="layout-specing">
				<div className="d-md-flex justify-content-between">
					<div>
						<h5 className="mb-0">Category</h5>

						<nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
							<ul className="breadcrumb bg-transparent rounded mb-0 p-0">
								<li className="breadcrumb-item text-capitalize"><NavLink to="index.html">Landrick</NavLink></li>
								<li className="breadcrumb-item text-capitalize active" aria-current="page">Category</li>
							</ul>
						</nav>
					</div>

					<div className="mt-4 mt-sm-0">
						<NavLink to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-product">Add Category</NavLink>
					</div>
				</div>

				<div className="row">
					<div className="col-12 mt-4">
						<div className="table-responsive shadow rounded">
							<DataTable
								columns={columns}
								data={categories}
								pagination
								highlightOnHover
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

}