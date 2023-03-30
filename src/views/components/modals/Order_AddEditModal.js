import React, { useEffect } from 'react'

export default function Order_AddEditModal({ master, updateFormData, customers, tables, items }) {

    console.log(customers)

    return (
        <div className="modal fade" id={"edit" + master} tabIndex="-1" aria-labelledby="LoginForm-title" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded shadow border-0">
                    <div className="modal-header border-bottom">
                        <h5 className="modal-title" id="LoginForm-title"> <label id="option">Add</label> {master}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4">
                        <form method='POST' encType="multipart/form-data">
                            <div className="bg-white rounded box-shadow" style={{ textAlign: "left", padding: "0px !important", fontSize: "1.2rem" }}>
                                <input type="hidden" id="hdnCategoryID" />
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Customer name <span className="text-danger">*</span></label>
                                            <select name="customerId" id='customerId' className="form-select form-control" aria-label="Default select example" onChange={updateFormData}>
                                                <option defaultChecked value="" defaultValue>Open this select menu</option>
                                                {
                                                    customers && customers.map((customer, index) => {
                                                        return (
                                                            <option key={index} value={customer._id}>{customer.name.first} {customer.name.last} ({customer.contact})</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Table No <span className="text-danger">*</span></label>
                                            <select name="tableId" id='tableId' className="form-select form-control" aria-label="Default select example" onChange={updateFormData}>
                                                <option defaultChecked value="" defaultValue>Open this select menu</option>
                                                {
                                                    tables && tables.map((table, index) => {
                                                        return (
                                                            <option key={index} value={table._id}>{table.tableNo}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Order Date <span className="text-danger">*</span></label>
                                            <div className="form-icon position-relative">
                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                <input name="date" id="date" type="date" className="form-control " onChange={updateFormData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Item <span className="text-danger">*</span></label>
                                            <select name="itemId" id='itemId' className="form-select form-control" aria-label="Default select example" onChange={updateFormData}>
                                                <option defaultChecked value="" defaultValue>Open this select menu</option>
                                                {
                                                    items && items.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item._id}>{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Description <span className="text-danger">*</span></label>
                                            <div className="form-icon position-relative">
                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                <textarea name="desc" id="desc" rows="4" className="form-control ps-5" placeholder="Description :" onChange={updateFormData} ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Amount <span className="text-danger">*</span></label>
                                            <div className="form-icon position-relative">
                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                <input name="amount" id="amount" type="text" className="form-control ps-5" placeholder="Amount :" onChange={updateFormData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">qty <span className="text-danger">*</span></label>
                                            <div className="form-icon position-relative">
                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                <input name="qty" id="qty" type="text" className="form-control ps-5" placeholder="QTy :" onChange={updateFormData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" id="btnSubmit" className="btn btn-primary" data-bs-dismiss="modal">Add Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
