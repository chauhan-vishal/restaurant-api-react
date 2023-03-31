import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MaterialTable from 'material-table'

import $ from 'jquery'

import Role_AddEditModal from './components/modals/Role_AddEditModal'
import DeleteModal from "./components/modals/DeleteModal"


export default function Roles({token}) {
	let formData = new FormData();
	const [roles, setRoles] = useState([])

	function fetchData() {
		fetch(process.env.REACT_APP_API_URL+"api/role"
		,{
			method: "GET",
			headers: {
				"content-type": "application/json",
				"x-access-token": token
			}
		})
			.then(res => {
				return res.json()
			})
			.then(response => {
				const documents = response.document.map((item, index) => {
					item.serial = index + 1
					return item
				})
				setRoles(documents)
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
				(flag) ? alert("Role Added Successfully") : alert("Error Occured");
				break;
			case "delete":
				(flag) ? alert("Role Deleted Successfully") : alert("Error Occured");
				break;
			case "edit":
				(flag) ? alert("Role Updated Successfully") : alert("Error Occured");
				break;
		}
	}

	const addRole = (e) => {
		fetch(process.env.REACT_APP_API_URL+"api/role/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": token

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
					alert(response.msg)
					showAlert(false, "add")
				}
			})
	}

	function deleteRole() {
		const id = document.querySelector("#hdnRoleId").value
		fetch(process.env.REACT_APP_API_URL+"api/role/delete/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": token

			},
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

	const updateRole = (e) => {
		fetch(process.env.REACT_APP_API_URL+"api/role/update", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": token

			},
			body: JSON.stringify(formData)
		})
			.then(response => response = response.json())
			.then(response => {
				if (response.success) {
					fetchData()
					showAlert(true, "edit")
				}
				else {
					alert(response.msg)
					showAlert(false, "edit")
				}
			})
	}

	const toggleStatus = (roleId) => {
		fetch(process.env.REACT_APP_API_URL+"api/role/update/status/" + roleId, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": token

				

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
		document.querySelector("#btnSubmit").innerHTML = option + " Role"
		$("#btnSubmit").off()
		if (option == "Add") {
			clearModalValues()
			$("#btnSubmit").on("click", addRole)
		}
		else {
			updateModalValues(item)
			$("#btnSubmit").on("click", updateRole)
		}
	}

	const clearModalValues = () => {
		document.querySelector("#name").value = ""
		document.querySelector("#desc").value = ""
		document.querySelector("#status").checked = false
	}

	const updateModalValues = (role) => {
		formData = ({
			...formData,
			roleId: role._id,
		})
		document.querySelector("#name").value = role.name
		document.querySelector("#desc").value = role.desc
		document.querySelector("#status").checked = (role.status === "active") ? true : false
	}

	const setDeleteModalProps = (role) => {
		document.querySelector("#delete-name").innerHTML = "Role Name " + role.name
		document.querySelector("#hdnRoleId").value = role._id
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
			title: "Role Name", field: "name", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "Descripition", field: "desc", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},

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
					<button className="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target={"#editRole"} onClick={() => { setModal("Edit", item) }}>
						<i className="ti ti-edit"></i>
					</button>
					<button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteRole"} onClick={() => { setDeleteModalProps(item) }}>
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
						<h5 className="mb-0">Role</h5>

						<nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
							<ul className="breadcrumb bg-transparent rounded mb-0 p-0">
								<li className="breadcrumb-item text-capitalize"><NavLink to="/">Dashboard</NavLink></li>
								<li className="breadcrumb-item text-capitalize active" aria-current="page">Role</li>
							</ul>
						</nav>
					</div>

					<div className="mt-4 mt-sm-0">
						<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editRole" onClick={() => { setModal('Add') }}>Add Role</button>
					</div>
				</div>

				<div className="row">
					<div className="col-12 mt-4">
						<div className="table-responsive shadow rounded">
							<MaterialTable
								data={roles}
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

			{/* AddEdit Role Modal */}
			<Role_AddEditModal master="Role" updateFormData={updateFormData} />

			{/* Delete Role Modal */}
			<DeleteModal master="Role" handleClick={deleteRole} />
		</div>
	)
}