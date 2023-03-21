import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MaterialTable from 'material-table'


import $ from 'jquery'

import User_AddEditModal from './components/modals/User_AddEditModal'
import User_DeleteModal from './components/modals/User_DeleteModal'



export default function Users() {
	let formData = new FormData();
	const [users, setUsers] = useState([])

	function fetchData() {
		fetch("http://localhost:2503/api/user")
			.then(res => {
				return res.json()
			})
			.then(response => {
				const documents = response.document.map((item, index) => {
					item.serial = index + 1
					return item
				})
				setUsers(documents)
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
				(flag) ? alert("User Added Successfully") : alert("Error Occured");
				break;
			case "delete":
				(flag) ? alert("User Deleted Successfully") : alert("Error Occured");
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

	const addUser = (e) => {
		console.log(formData)
		fetch("http://localhost:2503/api/user/new", {
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

	function deleteUser() {
		const id = document.querySelector("#hdnUserId").value
		fetch("http://localhost:2503/api/user/delete/" + id, {
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

	const updateUser = (e) => {
		fetch("http://localhost:2503/api/user/update", {
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

	const toggleStatus = (userId) => {
		fetch("http://localhost:2503/api/user/update/status/" + userId, {
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
		document.querySelector("#btnSubmit").innerHTML = option + "User"
		$("#btnSubmit").off()
		if (option == "Add") {
			clearModalValues()
			$("#btnSubmit").on("click", addUser)
		}
		else {
			updateModalValues(item)
			$("#btnSubmit").on("click", updateUser)
		}
	}

	const clearModalValues = () => {
		document.querySelector("#employeeId").value = ""
		document.querySelector("#username").value = ""
		document.querySelector("#password").value = ""
		document.querySelector("#roleId").value = ""
		document.querySelector("#status").checked = false
	}

	const updateModalValues = (user) => {
		document.querySelector("#hdnUserId").value = user._id
		document.querySelector("#employeeId").value = user.employeeId._id
		document.querySelector("#username").value = user.username
		document.querySelector("#password").value = user.password
		document.querySelector("#roleId").value = user.roleId._id
		document.querySelector("#status").checked = (user.status === "active") ? true : false
	}

	const setDeleteModalProps = (user) => {
		document.querySelector("#delete-name").innerHTML = user.username
		document.querySelector("#hdnUserId").value = user._id
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
			title: "Employee Name", render: user => { return user.employeeId.name.first + " " + user.employeeId.name.last }, headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "Username", field: "email", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "Password", field: "contact", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "Role", field: "gender", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
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
					<button className="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target={"#editUser"} onClick={() => { setModal("Edit", item) }}>
						<i className="ti ti-edit"></i>
					</button>
					<button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteUser"} onClick={() => { setDeleteModalProps(item) }}>
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
						<h5 className="mb-0">User</h5>

						<nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
							<ul className="breadcrumb bg-transparent rounded mb-0 p-0">
								<li className="breadcrumb-item text-capitalize"><NavLink to="/">Dashboard</NavLink></li>
								<li className="breadcrumb-item text-capitalize active" aria-current="page">User</li>
							</ul>
						</nav>
					</div>

					<div className="mt-4 mt-sm-0">
						<NavLink to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editUser" onClick={() => { setModal('Add') }}>Add User</NavLink>
					</div>
				</div>

				<div className="row">
					<div className="col-12 mt-4">
						<div className="table-responsive shadow rounded">
							<MaterialTable
								data={users}
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

			{/* AddEdit User Modal */}
			<User_AddEditModal master="User" updateFormData={updateFormData} />

			{/* Delete User Modal */}
			<User_DeleteModal master="User" handleClick={deleteUser} />
		</div>
	)
}