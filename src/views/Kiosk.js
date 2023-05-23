import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Kiosk({ token }) {

    const [orders, setOrdes] = useState()

    function fetchData() {
        fetch(process.env.REACT_APP_API_URL + "api/order", {
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
                const documents = response.document.map((order, index) => {
                    order.serial = index + 1
                    return order
                })
                setOrdes(documents)
            })

    }

    useEffect(() => {
        fetchData()
    }, [])

    const updatedOrderStatus = (orderId, status) => {
        fetch(process.env.REACT_APP_API_URL + "api/order/update/status/" + orderId + "/" + status, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "x-access-token": token
            }
        })
            .then(res => {
                return res.json()
            })
            .then(response => {
                alert(response.msg)
            })

    }

    const imgStyle = {
        width: "120px",
        borderRadius: "10px"
    }

    const columns = [
        {
            title: "Sr. No", field: "serial",
        },
        {
            title: "Customer", field: "customerId.name"
        },
        {
            title: "Table No", field: "tableId.tableNo"
        },
        {
            title: "Items", cellStyle: { textAlign: "Left" }, render: order => {
                return order.items.map((item, index) => {
                    return <div key={index}> <b>Item :</b> {item.name} x {item.count}</div>
                })
            }
        },
        {
            title: "Order Status", render: (order) => {
                return (
                    <div className="mb-3">
                        <div className="form-icon position-relative">
                            <select name="role" className="form-select form-control" aria-label="Default select example" defaultValue={order.orderStatus} required onChange={(e) => { updatedOrderStatus(order._id, e.target.value) }}>
                                <option key="1" value="ordered"> Ordered</option>
                                <option key="2" value="preparing">Preparing</option>
                                <option key="3" value="finished">Finished</option>
                                <option key="4" value="rejected">Reject</option>
                            </select>
                        </div>
                    </div>
                )
            }
        }
    ];


    return (
        <div className="container-fluid">

            <div className="layout-specing">
                <div className="d-md-flex justify-content-between">
                    <div>
                        <h5 className="mb-0">Orders</h5>

                        <nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
                            <ul className="breadcrumb bg-transparent rounded mb-0 p-0">
                                <li className="breadcrumb-item text-capitalize"><NavLink to="/">Dashboard</NavLink></li>
                                <li className="breadcrumb-item text-capitalize active" aria-current="page">Orders</li>
                            </ul>
                        </nav>
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
        </div>
    )
}
