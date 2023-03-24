import React, { useState, useEffect } from 'react'

export default function User_AddEditModal({ master, updateFormData, employees, roles }) {

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
                                            <label className="form-label">Employee Name <span className="text-danger">*</span></label>
                                            <select name="employeeId" id='employeeId' className="form-select form-control" aria-label="Default select example" onChange={updateFormData}>
                                                <option defaultChecked value="" defaultValue>Open this select menu</option>
                                                {
                                                    employees && employees.map((employee, index) => {
                                                        return (
                                                            <option key={index} value={employee._id}>{employee.name.first} {employee.name.last}</option>
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
                                            <label className="form-label">User Name <span className="text-danger">*</span></label>
                                            <div className="form-icon position-relative">
                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                <input name="username" id="username" type="text" className="form-control ps-5" placeholder="User Name :" onChange={updateFormData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Password <span className="text-danger">*</span></label>
                                            <div className="form-icon position-relative">
                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                <input name="password" id="password" type="text" className="form-control ps-5" placeholder="Password :" onChange={updateFormData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Role <span className="text-danger">*</span></label>
                                            <select name="roleId" id='roleId' className="form-select form-control" aria-label="Default select example" onChange={updateFormData}>
                                                <option defaultChecked value="" defaultValue>Open this select menu</option>
                                                {
                                                    roles && roles.map((role, index) => {
                                                        return (
                                                            <option key={index} value={role._id}>{role.name}</option>
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
                                            <span className="form-label">Status</span>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="status" id="status" onChange={updateFormData} />
                                                <label className="form-check-label" htmlFor="status">Active</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" id="btnSubmit" className="btn btn-primary" data-bs-dismiss="modal">Add User</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
