import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MaterialTable from 'material-table'

import $ from 'jquery'

import Customer_AddEditModal from './components/modals/Customer_AddEditModal'
import Customers_DeleteModal from './components/modals/Customer_DeleteEditModal'


export default function Customers() {
	let formData = new FormData();
	const [customers, setCustomers] = useState([])

	function fetchData() {
		fetch("http://localhost:2503/api/customer")
			.then(res => {
				return res.json()
			})
			.then(response => {
				const documents = response.document.map((item, index) => {
					item.serial = index + 1
					return item
				})
				setCustomers(documents)
			})

		}

	useEffect(() => {
		fetchData()
	}, [])

	const updateFormData = (e) => {
		const { name, value, type, checked } = e.target
		formData = ({
			...formData,
			[name]: (type === "checkbox") ? (checked) ? "active" : "inactive" : value
		})
	}



	function showAlert(flag, operation) {
		switch (operation) {
			case "add":
				(flag) ? alert("Customer Added Successfully") : alert("Error Occured");
				break;
			case "delete":
				(flag) ? alert("Customer Deleted Successfully") : alert("Error Occured");
				break;
		}

		if (flag) {
			// return (
			// 	<div className="alert alert-success alert-dismissible fade show" role="alert" style={{ position: "absolute", top: "100px", minWidth: "350px", left: "50%" }}>
			// 		<strong>Not done!</strong> wrong.
			// 		<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"> </button>
			// 	</div>
			// )
			//}
			//else {
			// return (
			// 	<div className="alert alert-success alert-dismissible fade show" role="alert">
			// 		<strong>Not done!</strong> wrong.
			// 		<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"> </button>
			// 	</div>
			// )
		}
	}

	const addCustomer = (e) => {
		console.log(formData)
		fetch("http://localhost:2503/api/customer/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData)
		})
			.then(response => response = response.json())
			.then(response => {
				console.log(response)
				if (response.success) {
					fetchData()
					showAlert(true, "add")
				}
				else {
					showAlert(false, "add")
				}
			})
	}

	function deleteCustomer() {
		const id = document.querySelector("#hdnCustomerId").value
		fetch("http://localhost:2503/api/customer/delete/" + id, {
			method: "DELETE",
			header: "accept: application/json",
		})
			.then(response => response = response.json())
			.then(response => {
				if (response.success) {
					fetchData()
					showAlert(true, "delete")
				}
				else {
					showAlert(false, "delete")
				}
			})
	}

	const updateCustomer = (e) => {
		fetch("http://localhost:2503/api/customer/update", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData)
		})
			.then(response => response = response.json())
			.then(response => {
				if (response.success) {
					fetchData()
					showAlert(true, "add")
				}
				else {
					showAlert(false, "add")
				}
			})
	}

	const toggleStatus = (customerId) => {
		fetch("http://localhost:2503/api/customer/update/status/" + customerId, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					fetchData()
				}
			})
	}

	const setModal = (option, item) => {
		document.querySelector("#option").innerHTML = option
		document.querySelector("#btnSubmit").innerHTML = option + "Customer"
		$("#btnSubmit").off()
		if (option == "Add") {
			clearModalValues()
			$("#btnSubmit").on("click", addCustomer)
		}
		else {
			updateModalValues(item)
			$("#btnSubmit").on("click", updateCustomer)
		}
	}

	const clearModalValues = () => {
		document.querySelector("#first").value = ""
		document.querySelector("#last").value = ""
		document.querySelector("#email").value = ""
		document.querySelector("#contact").value = ""
		//document.querySelector("#gender").value = ""
	//	document.querySelector("#date").value = ""
		document.querySelector("#status").checked = false
	}

	const updateModalValues = (customer) => {
		document.querySelector("#hdnCustomerId").value = customer._id
		document.querySelector("#first").value = customer.name.first
		document.querySelector("#last").value = customer.name.last
		document.querySelector("#email").value = customer.email
		document.querySelector("#contact").value = customer.contact
		//document.querySelector("#gender").value = customer.gender
		//document.querySelector("#date").value = customer.date
		document.querySelector("#status").checked = (customer.status === "active") ? true : false
	}

	const setDeleteModalProps = (customer) => {
		document.querySelector("#delete-name").innerHTML = customer.name.first + "  "+customer.name.last
		document.querySelector("#hdnCustomerId").value = customer._id
	}


	const imgStyle = {
		width: "120px",
		borderRadius: "10px"
	}

	const columns = [
		{
			title: "Sr. No", field: "serial"
		},
		{
			title: "Customer Name", render: customer => { return customer.name.first + " " + customer.name.last }, headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "Customer Email", field: "email", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "Customer Contact", field: "contact", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "Customer Gender", field: "gender", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		// {
		// 	title: "Date", field: "date", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		// },

		{
			title: "Status",
			render: item => {
				return (item.status == "active")
					? <button className="badge bg-soft-success rounded px-3 py-1" onClick={() => { toggleStatus(item._id) }}>Active</button>
					: <button className="badge bg-soft-danger rounded px-3 py-1" onClick={() => { toggleStatus(item._id) }}>Inactive</button>;
			}
		},
		{
			title: "Actions", render: (item) => {
				return <>
					<button className="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target={"#editCustomer"} onClick={() => { setModal("Edit", item) }}>
						<i className="ti ti-edit"></i>
					</button>
					<button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteCustomer"} onClick={() => { setDeleteModalProps(item) }}>
						<i className="ti ti-trash"></i>
					</button>
				</>
			}
		}
	];


	return (
		<div className="container-fluid">

			<div className="layout-specing">
				<div className="d-md-flex justify-content-between">
					<div>
						<h5 className="mb-0">Customer</h5>

						<nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
							<ul className="breadcrumb bg-transparent rounded mb-0 p-0">
								<li className="breadcrumb-item text-capitalize"><NavLink to="/">Dashboard</NavLink></li>
								<li className="breadcrumb-item text-capitalize active" aria-current="page">Customer</li>
							</ul>
						</nav>
					</div>

					<div className="mt-4 mt-sm-0">
						<NavLink to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editCustomer" onClick={() => { setModal('Add') }}>Add Customer</NavLink>
					</div>
				</div>

				<div className="row">
					<div className="col-12 mt-4">
						<div className="table-responsive shadow rounded">
							<MaterialTable
								data={customers}
								columns={columns}
								options={{
									pageSize: 10,
									search: false,
									toolbar: false,
									tableLayout: "fixed",
									headerStyle: {
										textAlign: "Center",
										fontWeight: "700",
										fontFamily: "Nunito",
										fontSize: "16px"
									},
									cellStyle: {
										textAlign: "Center"
									}
								}}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* AddEdit Customer Modal */}
			<Customer_AddEditModal master="Customer" updateFormData={updateFormData} />

			{/* Delete Customer Modal */}
			<Customers_DeleteModal master="Customer" handleClick={deleteCustomer} />
		</div>
	)
}