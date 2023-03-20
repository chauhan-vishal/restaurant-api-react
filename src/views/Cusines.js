import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MaterialTable from 'material-table'

import EditCategoryModal from './components/modals/Category_AddEditModal'
import DeleteCategoryModal from './components/modals/Category_DeleteModal'

export default function Cuisines() {
	const [formData, setFormData] = useState({})
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
	}

	useEffect(() => {
		fetchData()
	}, [])

	const updateFormData = (event) => {
		const { name, value, type, checked } = event.target
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value
		})
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
		fetch("http://localhost:2503/api/cuisine/new", {
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

	function deleteCuisine(id) {
		fetch("http://localhost:2503/api/cuisine/delete/" + id, {
			method: "DELETE",
			header: "accept: application/json",
		})
			.then(response => response = response.json())
			.then(response => {
				// setCuisines(prevCategories => {
				// 	return prevCategories.filter(category => {
				// 		return category._id != id
				// 	})
				// })
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
		console.log(formData)
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
			title: "Category Name", field: "categoryId.name", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "Image",
			render: item => <img src={"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"} alt="Mas" style={imgStyle} />
		},
		{
			title: "Status",
			render: item => {
				return (item.status == "true")
					? <button className="badge bg-soft-success rounded px-3 py-1">Active</button>
					: <button className="badge bg-soft-danger rounded px-3 py-1">Inactive</button>;
			}
		},
		{
			title: "Actions", render: (item) => {
				return <>
					{/* <button className="btn btn-sm btn-primary me-2">
						<i className="ti ti-eye"></i>
					</button> */}
					<EditCategoryModal master={"Cuisine"} item={item} updateFormData={updateFormData} updateCuisine={updateCuisine} formData={formData} />
					<button className="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target={"#editCuisine" + item.serial}>
						<i className="ti ti-edit"></i>
					</button>
					<DeleteCategoryModal master={"Cuisine"} item={item} handleClick={deleteCuisine} />
					<button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteCuisine" + item.serial}>
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
						<NavLink to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCuisine">Add Cuisine</NavLink>
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

			{/* Add Cuisine Modal */}
			<div className="modal fade" id={"addCuisine"} tabIndex="-1" aria-labelledby="LoginForm-title" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content rounded shadow border-0">
						<div className="modal-header border-bottom">
							<h5 className="modal-title" id="LoginForm-title">Add Cuisine</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body p-4">
							<form method='POST' onSubmit={addCuisine}>
								<div className="bg-white rounded box-shadow" style={{ textAlign: "left", padding: "0px !important", fontSize: "1.2rem" }}>
									<div className="row">
										<div className="col-md-12">
											<div className="mb-3">
												<label className="form-label">Name <span className="text-danger">*</span></label>
												<div className="form-icon position-relative">
													<i data-feather="user" className="fea icon-sm icons"></i>
													<input name="name" id="name" type="text" className="form-control ps-5" placeholder="First Name :" onChange={updateFormData} />
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<div className="mb-3">
												<label className="form-label">Cuisine <span className="text-danger">*</span></label>
												<div className="mb-0">
													<select className="form-select form-control" name="categoryId" id="categoryId" aria-label="Default select example" onChange={updateFormData}>
														<option defaultValue={"Open"}>Open this select menu</option>
														{
															categories.map(category => {
																return (category.status == "active") ? <option value={category._id}>{category.name}</option> : '';
															})
														}
													</select>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<div className="mb-3">
												<label className="form-label">Description <span className="text-danger">*</span></label>
												<div className="form-icon position-relative">
													<i data-feather="user" className="fea icon-sm icons"></i>
													<textarea name="desc" id="desc" rows="4" className="form-control ps-5" placeholder="Your Message :" onChange={updateFormData}></textarea>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<div className="mb-3">
												<label className="form-label">Cuisine Name <span className="text-danger">*</span></label>
												<div className="form-icon position-relative">
													<i data-feather="user" className="fea icon-sm icons"></i>
													<input name="img" id="img" type="file" className="form-control" placeholder="First Name :" onChange={updateFormData} />
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<div className="mb-3">
												<span className="form-label">Status</span>
												<div className="form-check">
													<input className="form-check-input" type="checkbox" name="status" id="status" onChange={updateFormData} checked={formData.chkStatus} />
													<label className="form-check-label" htmlFor="status">Active</label>
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={addCuisine}>Add Cuisine</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}