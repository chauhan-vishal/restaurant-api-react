import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MaterialTable from 'material-table'

import $ from 'jquery'

import Employee_AddEditModal from './components/modals/Employee_AddEditModal'
import Category_DeleteModal from './components/modals/Category_DeleteModal'


export default function Employees() {
	let formData = new FormData();
	const [employees, setEmployees] = useState([])

	function fetchData() {

		fetch("http://localhost:2503/api/employee")
			.then(res => { return res.json() })
			.then(response => {
				const documents = response.document.map((item, index) => {
					item.serial = index + 1
					return item
				})
				setEmployees(documents)
			})
	}

	useEffect(() => {
		fetchData()
	}, [])

	const setFormData = () => {
		return (
			{
				...formData,
				first: document.querySelector("#first").value,
				last: document.querySelector("#last").value,
				gender:
					(document.querySelector("#rbdMale").checked) ? "M" :
						(document.querySelector("#rbdFemale").checked) ? "F" :
							(document.querySelector("#rbdOther").checked) ? "O" : "",
				contact: document.querySelector("#contact").value,
				email: document.querySelector("#email").value,
				street: document.querySelector("#street").value,
				city: document.querySelector("#city").value,
				state: document.querySelector("#state").value,
				country: document.querySelector("#country").value,
				pincode: document.querySelector("#pincode").value,
				dob: document.querySelector("#dob").value,
				doj: document.querySelector("#doj").value,
				departmentId: document.querySelector("#departmentId").value,
				salary: document.querySelector("#salary").value,
				da: document.querySelector("#da").value,
				bonus: document.querySelector("#bonus").value,
				status: document.querySelector("#status").checked
			}
		)
	}

	const setImage = (e) => {
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0])

		reader.onload = function () {
			formData.img = reader.result
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
	}

	function showAlert(flag, operation) {
		switch (operation) {
			case "add":
				(flag) ? alert("Employee Added Successfully") : alert("Error Occured");
				break;
			case "delete":
				(flag) ? alert("Employee Deleted Successfully") : alert("Error Occured");
				break;
			case "edit":
				(flag) ? alert("Employee Updated Successfully") : alert("Error Occured");
				break;
		}
	}

	const addEmployee = (e) => {
		formData = setFormData();
		fetch("http://localhost:2503/api/employee/new", {
			method: "POST",
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

	function deleteEmployee() {
		const id = document.querySelector("#hdnEmployeeId").value
		fetch("http://localhost:2503/api/employee/delete/" + id, {
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

	const updateEmployee = (e) => {
		formData = setFormData();

		fetch("http://localhost:2503/api/employee/update/", {
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
					showAlert(true, "edit")
				}
				else {
					showAlert(false, "edit")
				}
			})
	}

	const toggleStatus = (employeeId) => {
		fetch("http://localhost:2503/api/employee/update/status/" + employeeId, {
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
		document.querySelector("#btnSubmit").innerHTML = option + " Employee"
		$("#btnSubmit").off()
		if (option == "Add") {
			clearModalValues()
			$("#btnSubmit").on("click", addEmployee)
		}
		else {
			updateModalValues(item)
			$("#btnSubmit").on("click", updateEmployee)
		}
	}

	const clearModalValues = () => {
		document.querySelector("#first").value = ""
		document.querySelector("#last").value = ""
		document.querySelector("#rbdMale").checked = true
		document.querySelector("#departmentId").value = ""
		document.querySelector("#contact").value = ""
		document.querySelector("#email").value = ""
		document.querySelector("#dob").value = ""
		document.querySelector("#doj").value = ""
		document.querySelector("#street").value = ""
		document.querySelector("#city").value = ""
		document.querySelector("#state").value = ""
		document.querySelector("#country").value = ""
		document.querySelector("#pincode").value = ""
		document.querySelector("#salary").value = ""
		document.querySelector("#da").value = ""
		document.querySelector("#bonus").value = ""
		document.querySelector("#img").value = ""
		document.querySelector("#status").checked = false
	}

	const updateModalValues = (employee) => {
		formData = ({
			...formData,
			employeeId: employee._id
		})

		const gender = { "M": "rbdMale", "F": "rbdFemale", "O": "rbdOther" }

		document.querySelector("#hdnEmployeeID").value = employee._id
		document.querySelector("#first").value = employee.name.first
		document.querySelector("#last").value = employee.name.last
		document.querySelector("#" + gender[employee.gender]).checked = true
		document.querySelector("#departmentId").value = employee.departmentId._id
		document.querySelector("#contact").value = employee.contact
		document.querySelector("#email").value = employee.email
		document.querySelector("#dob").value = employee.dob.split("T")[0]
		document.querySelector("#doj").value = employee.doj.split("T")[0]
		document.querySelector("#street").value = employee.address.street
		document.querySelector("#city").value = employee.address.city
		document.querySelector("#state").value = employee.address.state
		document.querySelector("#country").value = employee.address.country
		document.querySelector("#pincode").value = employee.address.pincode
		document.querySelector("#salary").value = employee.salary
		document.querySelector("#da").value = employee.allowances.da
		document.querySelector("#bonus").value = employee.allowances.bonus
		// document.querySelector("#img").value = employee.img
		document.querySelector("#status").checked = (employee.status == "active") ? true : false;
	}

	const setDeleteModalProps = (employee) => {
		document.querySelector("#delete-name").innerHTML = employee.name.first + " " + employee.name.last
		document.querySelector("#hdnEmployeeId").value = employee._id
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
			title: "Employee Name", render: (emp) => { return emp.name.first + " " + emp.name.last }, headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "Department Name", field: "departmentId.name"
		},
		{
			title: "Image",
			render: item => <img src={item.img} style={imgStyle} />
		},
		{
			title: "Gender",
			render: emp => {
				return (emp.gender == "M")
					? <img src="" alt="male" className="img-fluid avatar avatar-ex-sm rounded-circle" />
					: <img src="" alt="female" className="img-fluid avatar avatar-ex-sm rounded-circle" />;
			}
		},
		{
			title: "Status",
			render: emp => {
				return (emp.status == "active")
					? <button className="badge bg-soft-success rounded px-3 py-1" onClick={() => { toggleStatus(emp._id) }}>Active</button>
					: <button className="badge bg-soft-danger rounded px-3 py-1" onClick={() => { toggleStatus(emp._id) }}>Inactive</button>;
			}
		},
		{
			title: "Actions", render: (item) => {
				return <>
					<button className="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target={"#editEmployee"} onClick={() => { setModal("Edit", item) }}>
						<i className="ti ti-edit"></i>
					</button>
					<button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteEmployee"} onClick={() => { setDeleteModalProps(item) }}>
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
						<h5 className="mb-0">Employee</h5>

						<nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
							<ul className="breadcrumb bg-transparent rounded mb-0 p-0">
								<li className="breadcrumb-item text-capitalize"><NavLink to="/">Dashboard</NavLink></li>
								<li className="breadcrumb-item text-capitalize active" aria-current="page">Employee</li>
							</ul>
						</nav>
					</div>

					<div className="mt-4 mt-sm-0">
						<NavLink to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editEmployee" onClick={() => { setModal('Add') }}>Add Employee</NavLink>
					</div>
				</div>

				<div className="row">
					<div className="col-12 mt-4">
						<div className="table-responsive shadow rounded">
							<MaterialTable
								data={employees}
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

			{/* AddEdit Employee Modal */}
			<Employee_AddEditModal master="Employee" setImage={setImage} setFormData={setFormData} />

			{/* Delete Employee Modal */}
			<Category_DeleteModal master="Employee" handleClick={deleteEmployee} />
		</div>
	)
}