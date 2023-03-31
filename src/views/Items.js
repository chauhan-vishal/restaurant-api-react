import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MaterialTable from 'material-table'

import $ from 'jquery'

import Item_AddEditModal from './components/modals/Item_AddEditModal'
import DeleteModal from './components/modals/DeleteModal'

export default function Items({ token }) {
	let formData = new FormData();
	const [items, setItems] = useState([])

	function fetchData() {
		fetch(process.env.REACT_APP_API_URL + "api/item", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": token
			}
		})
			.then(res => { return res.json() })
			.then(response => {
				const documents = response.document.map((item, index) => {
					item.serial = index + 1
					return item
				})
				setItems(documents)
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
				(flag) ? alert("Items Added Successfully") : alert("Error Occured");
				break;
			case "delete":
				(flag) ? alert("Items Deleted Successfully") : alert("Error Occured");
				break;
			case "edit":
				(flag) ? alert("Items Updated Successfully") : alert("Error Occured");
				break;
		}
	}

	const addItem = (e) => {
		fetch(process.env.REACT_APP_API_URL + "api/Item/new", {
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

	function deleteItem() {
		const id = document.querySelector("#hdnItemId").value
		fetch(process.env.REACT_APP_API_URL + "api/Item/delete/" + id, {
			method: "DELETE",
			headers: {
				"accept": "application/json",
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

	const updateItem = (e) => {
		fetch(process.env.REACT_APP_API_URL + "api/Item/update/", {
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
					showAlert(false, "edit")
				}
			})
	}

	const toggleStatus = (itemId) => {
		fetch(process.env.REACT_APP_API_URL + "api/item/update/status/" + itemId, {
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
		document.querySelector("#btnSubmit").innerHTML = option + " Item"
		$("#btnSubmit").off()
		if (option == "Add") {
			clearModalValues()
			$("#btnSubmit").on("click", addItem)
		}
		else {
			updateModalValues(item)
			$("#btnSubmit").on("click", updateItem)
		}
	}

	const clearModalValues = () => {
		document.querySelector("#name").value = ""
		document.querySelector("#desc").value = ""
		document.querySelector("#categoryId").value = ""
		document.querySelector("#price").value = ""
		document.querySelector("#qty").value = ""
		document.querySelector("#tagId").value = ""
		document.querySelector("#img").value = ""
	}

	const updateModalValues = (item) => {
		formData = ({
			...formData,
			itemId: item._id
		})


		document.querySelector("#hdnItemID").value = item._id
		document.querySelector("#name").value = item.name
		document.querySelector("#desc").value = item.name
		document.querySelector("#categoryId").value = item.categoryId._id
		document.querySelector("#price").value = item.price
		document.querySelector("#qty").value = item.qty
		document.querySelector("#tagId").value = item.tagId._id
		// document.querySelector("#img").value = employee.img
		document.querySelector("#status").checked = (item.status == "active") ? true : false;
	}

	const setDeleteModalProps = (item) => {
		document.querySelector("#delete-name").innerHTML = item.name
		document.querySelector("#hdnItemId").value = item._id
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
			title: "Item Name", field: "name", cellStyle: { textAlign: "Left" }
		},
		{
			title: "Item desceprrition", field: "desc", cellStyle: { textAlign: "Left" }
		},
		{
			title: "Category Name", field: "categoryId.name"
		},
		{
			title: "Price", field: "price", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "Qunty", field: "qty", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
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
					<button className="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target={"#editItem"} onClick={() => { setModal("Edit", item) }}>
						<i className="ti ti-edit"></i>
					</button>
					<button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteItem"} onClick={() => { setDeleteModalProps(item) }}>
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
						<h5 className="mb-0">Item</h5>

						<nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
							<ul className="breadcrumb bg-transparent rounded mb-0 p-0">
								<li className="breadcrumb-item text-capitalize"><NavLink to="/">Dashboard</NavLink></li>
								<li className="breadcrumb-item text-capitalize active" aria-current="page">Item</li>
							</ul>
						</nav>
					</div>

					<div className="mt-4 mt-sm-0">
						<NavLink to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editItem" onClick={() => { setModal('Add') }}>Add Item</NavLink>
					</div>
				</div>

				<div className="row">
					<div className="col-12 mt-4">
						<div className="table-responsive shadow rounded">
							<MaterialTable
								data={items}
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

			{/* AddEdit Item Modal */}
			<Item_AddEditModal master="Item" setImage={setImage} updateFormData={updateFormData} token={token}/>

			{/* Delete Item Modal */}
			<DeleteModal master="Item" handleClick={deleteItem} />
		</div>
	)
}