import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MaterialTable from 'material-table'

import $ from 'jquery'

import Cuisine_AddEditModal from './components/modals/Cuisine_AddEditModal'
import Cuisine_DeleteModal from './components/modals/Cuisine_DeleteModal'


export default function Cuisnes() {
	let formData = new FormData();
	const [cuisines, setCuisines] = useState([])
	const [categories, setCategories] = useState([])

	function fetchData() {
		fetch("http://localhost:2503/api/cuisine")
			.then(res => {
				return res.json()
			})
			.then(response => {
				const documents = response.document.map((item, index) => {
					item.serial = index + 1
					return item
				})
				setCuisines(documents)
			})


		fetch("http://localhost:2503/api/category")
			.then(res => res.json())
			.then(res => {
				// console.log(res.document)
				setCategories(res.document)
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
				(flag) ? alert("Cuisine Added Successfully") : alert("Error Occured");
				break;
			case "delete":
				(flag) ? alert("Cuisine Deleted Successfully") : alert("Error Occured");
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

	const addCuisine = (e) => {
		console.log(formData)
		fetch("http://localhost:2503/api/cuisine/new", {
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

	function deleteCuisine() {
		const id = document.querySelector("#hdnCuisineId").value
		fetch("http://localhost:2503/api/cuisine/delete/" + id, {
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

	const updateCuisine = (e) => {
		fetch("http://localhost:2503/api/cuisine/update", {
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

	const toggleStatus = (cuisineId) => {
		fetch("http://localhost:2503/api/cuisine/update/status/" + cuisineId, {
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
		document.querySelector("#btnSubmit").innerHTML = option + " Cuisine"
		$("#btnSubmit").off()
		if (option == "Add") {
			clearModalValues()
			$("#btnSubmit").on("click", addCuisine)
		}
		else {
			updateModalValues(item)
			$("#btnSubmit").on("click", updateCuisine)
		}
	}

	const clearModalValues = () => {
		document.querySelector("#name").value = ""
		document.querySelector("#desc").value = ""
		document.querySelector("#categoryId").value = ""
		// document.querySelector("#img").value = ""
		document.querySelector("#status").checked = false
	}

	const updateModalValues = (cuisine) => {
		formData = ({
			...formData,
			categoryId: cuisine._id
		})
		document.querySelector("#hdnCuisineId").value = cuisine._id
		document.querySelector("#name").value = cuisine.name
		document.querySelector("#desc").value = cuisine.desc
		document.querySelector("#categoryId").value = cuisine.categoryId._id
		console.log(cuisine)
		document.querySelector("#status").checked = (cuisine.status === "active") ? true : false
	}

	const setDeleteModalProps = (cuisine) => {
		document.querySelector("#delete-name").innerHTML = cuisine.name
		document.querySelector("#hdnCuisineId").value = cuisine._id
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
			title: "Cuisine Name", field: "name", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "Category Name", field: "name", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "Image",
			render: item => <img src={item.img} style={imgStyle} />
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
					<button className="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target={"#editCuisine"} onClick={() => { setModal("Edit", item) }}>
						<i className="ti ti-edit"></i>
					</button>
					<button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteCuisine"} onClick={() => { setDeleteModalProps(item) }}>
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
						<h5 className="mb-0">Cuisine</h5>

						<nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
							<ul className="breadcrumb bg-transparent rounded mb-0 p-0">
								<li className="breadcrumb-item text-capitalize"><NavLink to="/">Dashboard</NavLink></li>
								<li className="breadcrumb-item text-capitalize active" aria-current="page">Cuisine</li>
							</ul>
						</nav>
					</div>

					<div className="mt-4 mt-sm-0">
						<NavLink to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editCuisine" onClick={() => { setModal('Add') }}>Add Cuisine</NavLink>
					</div>
				</div>

				<div className="row">
					<div className="col-12 mt-4">
						<div className="table-responsive shadow rounded">
							<MaterialTable
								data={cuisines}
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

			{/* AddEdit Cuisine Modal */}
			<Cuisine_AddEditModal master="Cuisine" updateFormData={updateFormData} setImage={setImage} categories={categories} />

			{/* Delete Cuisine Modal */}
			<Cuisine_DeleteModal master="Cuisine" handleClick={deleteCuisine} />
		</div>
	)
}