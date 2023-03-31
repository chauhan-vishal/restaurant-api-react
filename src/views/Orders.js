import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MaterialTable from 'material-table'

import $ from 'jquery'

import Order_AddEditModal from './components/modals/Order_AddEditModal'
import DeleteModal from './components/modals/DeleteModal'


export default function Orders({token}) {
	let formData = new FormData();
	const [orders, setOrders] = useState([])
	const [customers, setCustomers] = useState([])
	const [tables, setTables] = useState([])
	const [item, setItems] = useState([])


	function fetchData() {

		fetch(process.env.REACT_APP_API_URL + "api/order" ,{
			method: "GET",
			headers: {
				"content-type": "application/json",
				"x-access-token": token
			}
		})
			.then(res => { return res.json() })
			.then(response => {
				const documents = response.document.map((item, index) => {
					item.serial = index + 1
					return item
				})
				setOrders(documents)
			})
		fetch(process.env.REACT_APP_API_URL + "api/customer",{
			method: "GET",
			headers: {
				"content-type": "application/json",
				"x-access-token": token
			}
		})
			.then(res => res.json())
			.then(response => {
				setCustomers(response.document)
			})

		fetch(process.env.REACT_APP_API_URL + "api/table",{
			method: "GET",
			headers: {
				"content-type": "application/json",
				"x-access-token": token
			}
		})
			.then(res => res.json())
			.then(response => {
				setTables(response.document)
			})
		fetch(process.env.REACT_APP_API_URL + "api/item",{
			method: "GET",
			headers: {
				"content-type": "application/json",
				"x-access-token": token
			}
		})
			.then(res => res.json())
			.then(response => {
				setItems(response.document)
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

	// const setImage = (e) => {
	// 	const reader = new FileReader();
	// 	reader.readAsDataURL(e.target.files[0])

	// 	reader.onload = function () {
	// 		formData.img = reader.result
	// 	};
	// 	reader.onerror = function (error) {
	// 		console.log('Error: ', error);
	// 	};
	// }

	function showAlert(flag, operation) {
		switch (operation) {
			case "add":
				(flag) ? alert("Order Added Successfully") : alert("Error Occured");
				break;
			case "delete":
				(flag) ? alert("Order Deleted Successfully") : alert("Error Occured");
				break;
			case "edit":
				(flag) ? alert("Order Updated Successfully") : alert("Error Occured");
				break;
		}
	}

	const addOrder = (e) => {
		fetch(process.env.REACT_APP_API_URL + "api/order/new", {
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

	function deleteOrder() {
		const id = document.querySelector("#hdnOrderId").value
		fetch(process.env.REACT_APP_API_URL + "api/order/delete/" + id, {
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

	const updateOrder = (e) => {
		fetch(process.env.REACT_APP_API_URL + "api/order/update/", {
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

	const toggleStatus = (orderId) => {
		fetch(process.env.REACT_APP_API_URL + "api/order/update/status/" + orderId, {
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
		document.querySelector("#btnSubmit").innerHTML = option + " order"
		$("#btnSubmit").off()
		if (option == "Add") {
			clearModalValues()
			$("#btnSubmit").on("click", addOrder)
		}
		else {
			updateModalValues(item)
			$("#btnSubmit").on("click", updateOrder)
		}
	}

	const clearModalValues = () => {
		document.querySelector("#customerId").value = ""
		// document.querySelector("#contact").value = ""
		document.querySelector("#tableId").value = ""
		document.querySelector("#date").value = ""
		document.querySelector("#itemId").value = ""
		document.querySelector("#qty").value = ""
		document.querySelector("#amount").value = ""
		document.querySelector("#desc").value = ""
	}

	const updateModalValues = (order) => {
		formData = ({
			...formData,
			orderId: order._id
		})


		document.querySelector("#hdnOrderID").value = order._id
		document.querySelector("#customeId").value = order.customerId._id
		// document.querySelector("#contact").value = order.customerId.contact
		document.querySelector("#tableId").value = order.tableId._id
		document.querySelector("#date").value = order.date.split("T")[0]
		document.querySelector("#itemId").value = order.itemId._id
		document.querySelector("#qty").value = order.qty
		document.querySelector("#amount").value = order.amount
		document.querySelector("#desc").value = order.qty
	}

	const setDeleteModalProps = (order) => {
		// 	document.querySelector("#delete-name").innerHTML = order.name.first + " " + employee.name.last
		document.querySelector("#hdnOrderId").value = order._id
	}


	// const imgStyle = {
	// 	width: "120px",
	// 	borderRadius: "10px"
	// }

	const columns = [
		{
			title: "Sr. No", field: "serial"
		},
		{
			title: "Name", field: "customerId.name.first", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }
		},
		{
			title: "Contact", field: "customerId.contact", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }

		},
		{
			title: "Table", field: "tableId.tableNo", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }

		},
		{
			title: "date", field: "orderDate", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }

		},
		{
			title: "amount", field: "amount", headerStyle: { textAlign: "Left" }, cellStyle: { textAlign: "Left" }

		},
		{
			title: "Actions", render: (item) => {
				return <>
					<button className="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target={"#editOrder"} onClick={() => { setModal("Edit", item) }}>
						<i className="ti ti-edit"></i>
					</button>
					<button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteOrder"} onClick={() => { setDeleteModalProps(item) }}>
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
						<h5 className="mb-0">Order</h5>

						<nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
							<ul className="breadcrumb bg-transparent rounded mb-0 p-0">
								<li className="breadcrumb-item text-capitalize"><NavLink to="/">Dashboard</NavLink></li>
								<li className="breadcrumb-item text-capitalize active" aria-current="page">Order</li>
							</ul>
						</nav>
					</div>

					<div className="mt-4 mt-sm-0">
						<NavLink to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editOrder" onClick={() => { setModal('Add') }}>Add Order</NavLink>
					</div>
				</div>

				<div className="row">
					<div className="col-12 mt-4">
						<div className="table-responsive shadow rounded">
							<MaterialTable
								data={orders}
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

			{/* AddEdit Order Modal */}
			<Order_AddEditModal master="Order" updateFormData={updateFormData} customers={customers} tables={tables} items={item} />

			{/* Delete Order Modal */}
			<DeleteModal master="Order" handleClick={deleteOrder} />
		</div>
	)
}