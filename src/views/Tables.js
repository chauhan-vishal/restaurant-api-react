import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MaterialTable from 'material-table'

import $ from 'jquery'
import Table_AddEditModal from './components/modals/Table_AddEditModal'
import Tables_DeleteModal from './components/modals/Table_DeleteEditModal'

export default function Tables({token}) {
	let formData = new FormData();
	const [tables, setTables] = useState([])

	function fetchData() {
		fetch(process.env.REACT_APP_API_URL+"api/table",{
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
				setTables(documents)
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
				(flag) ? alert("Table Added Successfully") : alert("Error Occured");
				break;
			case "delete":
				(flag) ? alert("Table Deleted Successfully") : alert("Error Occured");
				break;
			case "edit":
				(flag) ? alert("Table Updated Successfully") : alert("Error Occured");
				break;
		}
	}

	const addTable = (e) => {
		fetch(process.env.REACT_APP_API_URL+"api/table/new", {
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

	function deleteTable() {
		const id = document.querySelector("#hdnTableId").value
		fetch(process.env.REACT_APP_API_URL+"api/table/delete/" + id, {
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

	const updateTable = (e) => {
		fetch(process.env.REACT_APP_API_URL+"api/table/update", {
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

	const toggleStatus = (tableId) => {
		fetch(process.env.REACT_APP_API_URL+"api/table/update/status/" + tableId, {
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
		document.querySelector("#btnSubmit").innerHTML = option + " Table"
		$("#btnSubmit").off()
		if (option == "Add") {
			clearModalValues()
			$("#btnSubmit").on("click", addTable)
		}
		else {
			updateModalValues(item)
			$("#btnSubmit").on("click", updateTable)
		}
	}

	const clearModalValues = () => {
		document.querySelector("#tableNo").value = ""
		document.querySelector("#noOfSeat").value = ""
		document.querySelector("#status").checked = false
	}

	const updateModalValues = (table) => {
		formData = ({
			...formData,
			tableId: table._id,
		})
		document.querySelector("#tableNo").value = table.tableNo
		document.querySelector("#noOfSeat").value = table.noOfSeat
		document.querySelector("#status").checked = (table.status === "active") ? true : false
	}

	const setDeleteModalProps = (table) => {
		document.querySelector("#delete-name").innerHTML = "Table No. " + table.tableNo
		document.querySelector("#hdnTableId").value = table._id
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
			title: "Table Number", field: "tableNo", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "No of Seats", field: "noOfSeat", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
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
					<button className="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target={"#editTable"} onClick={() => { setModal("Edit", item) }}>
						<i className="ti ti-edit"></i>
					</button>
					<button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteTable"} onClick={() => { setDeleteModalProps(item) }}>
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
						<h5 className="mb-0">Table</h5>

						<nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
							<ul className="breadcrumb bg-transparent rounded mb-0 p-0">
								<li className="breadcrumb-item text-capitalize"><NavLink to="/">Dashboard</NavLink></li>
								<li className="breadcrumb-item text-capitalize active" aria-current="page">Table</li>
							</ul>
						</nav>
					</div>

					<div className="mt-4 mt-sm-0">
						<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editTable" onClick={() => { setModal('Add') }}>Add Table</button>
					</div>
				</div>

				<div className="row">
					<div className="col-12 mt-4">
						<div className="table-responsive shadow rounded">
							<MaterialTable
								data={tables}
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

			{/* AddEdit Table Modal */}
			<Table_AddEditModal master="Table" updateFormData={updateFormData} />

			{/* Delete Table Modal */}
			<Tables_DeleteModal master="Table" handleClick={deleteTable} />
		</div>
	)
}