import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MaterialTable from 'material-table'

import $ from 'jquery'

import Category_AddEditModal from './components/modals/Category_AddEditModal'
import Category_DeleteModal from './components/modals/Category_DeleteModal'


export default function Categories() {
	let formData = new FormData();
	const [categories, setCategories] = useState([])
	const [cuisines, setCuisines] = useState([])

	function fetchData() {
		fetch("http://localhost:2503/api/category")
			.then(res => {
				return res.json()
			})
			.then(response => {
				const documents = response.document.map((item, index) => {
					item.serial = index + 1
					return item
				})
				setCategories(documents)
			})

			fetch("http://localhost:2503/api/cuisine")
			.then(res => {
				return res.json()
			})
			.then(response => {
				setCuisines(response.document)
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
				(flag) ? alert("Category Added Successfully") : alert("Error Occured");
				break;
			case "delete":
				(flag) ? alert("Category Deleted Successfully") : alert("Error Occured");
				break;				
			case "edit":
				(flag) ? alert("Category Edited Successfully") : alert("Error Occured");
				break;
		}
	}

	const addCategory = (e) => {
		fetch("http://localhost:2503/api/category/new", {
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

	function deleteCategory() {
		const id = document.querySelector("#hdnCategoryId").value
		fetch("http://localhost:2503/api/category/delete/" + id, {
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

	const updateCategory = (e) => {
		fetch("http://localhost:2503/api/category/update", {
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

	const toggleStatus = (categoryId) => {
		fetch("http://localhost:2503/api/category/update/status/" + categoryId, {
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
		document.querySelector("#btnSubmit").innerHTML = option + " category"
		$("#btnSubmit").off()
		if (option == "Add") {
			clearModalValues()
			$("#btnSubmit").on("click", addCategory)
		}
		else {
			updateModalValues(item)
			$("#btnSubmit").on("click", updateCategory)
		}
	}

	const clearModalValues = () => {
		document.querySelector("#name").value = ""
		document.querySelector("#desc").value = ""
		document.querySelector("#cuisineId").value = ""
		document.querySelector("#img").value = ""
		document.querySelector("#status").checked = false
	}

	const updateModalValues = (category) => {
		formData = ({
			...formData,
			categoryId: category._id
		})
		document.querySelector("#hdnCategoryID").value = category._id
		document.querySelector("#name").value = category.name
		document.querySelector("#desc").value = category.desc
		document.querySelector("#cuisineId").value = category.cuisineId._id
		// document.querySelector("#img").value = ""
		document.querySelector("#status").checked = (category.status === "active") ? true : false
	}

	const setDeleteModalProps = (category) => {
		document.querySelector("#delete-name").innerHTML = category.name
		document.querySelector("#hdnCategoryId").value = category._id
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
			title: "Category Name", field: "name", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title:"Category Desc", field:"desc", headerStyle: {textAlign:"Left"}, cellStyle :{textAlign:"Left"}
		},
		{
			title: "Image",
			render: item => <img src={item.img} style={imgStyle} />
		},
		{
			title: "Cuisine Name", field: "cuisineId.name"
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
					<button className="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target={"#CategoryModal"} onClick={() => { setModal("Edit", item) }}>
						<i className="ti ti-edit"></i>
					</button>
					<button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteCategory"} onClick={() => { setDeleteModalProps(item) }}>
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
						<h5 className="mb-0">Category</h5>

						<nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
							<ul className="breadcrumb bg-transparent rounded mb-0 p-0">
								<li className="breadcrumb-item text-capitalize"><NavLink to="/">Dashboard</NavLink></li>
								<li className="breadcrumb-item text-capitalize active" aria-current="page">Category</li>
							</ul>
						</nav>
					</div>

					<div className="mt-4 mt-sm-0">
						<NavLink to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#CategoryModal" onClick={() => { setModal('Add') }}>Add Category</NavLink>
					</div>
				</div>

				<div className="row">
					<div className="col-12 mt-4">
						<div className="table-responsive shadow rounded">
							<MaterialTable
								data={categories}
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

			{/* AddEdit Category Modal */}
			<Category_AddEditModal master="Category" updateFormData={updateFormData} setImage={setImage} cuisines={cuisines}  />

			{/* Delete Category Modal */}
			<Category_DeleteModal master="Category" handleClick={deleteCategory} />
		</div>
	)
}