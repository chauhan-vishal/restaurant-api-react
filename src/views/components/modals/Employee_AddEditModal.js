import React, { useEffect, useState } from 'react'

export default function Employee_AddEditModal({ master, setImage }) {
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        fetch("http://localhost:2503/api/department/")
            .then(res => res.json())
            .then(res => {
                setDepartments(res.document)
            })
    }, [])


    return (
        <div className="modal fade" id={"edit" + master} tabIndex="-1" aria-labelledby="LoginForm-title" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content rounded shadow border-0">
                    <div className="modal-header border-bottom">
                        <h5 className="modal-title" id="LoginForm-title"> <label id="option">Add</label> {master}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4">
                        <div className="container-fluid px-0">
                            <input type="hidden" id="hdnEmployeeID" />
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">First Name <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="first" id="first" type="text" className="form-control ps-5" placeholder="First Name :" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Gender <span className="text-danger">*</span></label>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <div className="form-check mb-0 me-3" style={{ display: "inline-block" }}>
                                                <input className="form-check-input" type="radio" name="gender" value="M" id="rbdMale" />
                                                <label className="form-check-label" htmlFor="rbdMale">Male</label>
                                            </div>
                                            <div className="form-check mb-0 me-3" style={{ display: "inline-block" }}>
                                                <input className="form-check-input" type="radio" name="gender" value="F" id="rbdFemale" />
                                                <label className="form-check-label" htmlFor="rbdFemale">Female</label>
                                            </div>
                                            <div className="form-check mb-0" style={{ display: "inline-block" }}>
                                                <input className="form-check-input" type="radio" name="gender" value="O" id="rbdOther" />
                                                <label className="form-check-label" htmlFor="rbdOther">Other</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Last Name <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="last" id="last" type="text" className="form-control ps-5" placeholder="First Name :" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Department <span className="text-danger">*</span></label>
                                        <select name="departmentId" id='departmentId' className="form-select form-control" aria-label="Default select example" >
                                            <option defaultChecked value="" defaultValue>Open this select menu</option>
                                            {
                                                departments && departments.map((department, index) => {
                                                    return (
                                                        <option key={index} value={department._id}>{department.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Contact <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="contact" id="contact" type="text" className="form-control ps-5" placeholder="Contact :" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">E-Mail <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="email" id="email" type="email" className="form-control ps-5" placeholder="E-Mail :" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="dob" id="dob" type="date" className="form-control ps-5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Date of Joining <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="doj" id="doj" type="date" className="form-control ps-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Street <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="street" id="street" type="text" className="form-control ps-5" placeholder='Street :' />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">City  <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="city" id="city" type="text" className="form-control ps-5" placeholder='City :' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">State <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="state" id="state" type="text" className="form-control ps-5" placeholder='State :' />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Country  <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="country" id="country" type="text" className="form-control ps-5" placeholder='Country :' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">PIN Code <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="pincode" id="pincode" type="text" className="form-control ps-5" placeholder='PIN Code :' />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Salary  <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="salary" id="salary" type="text" className="form-control ps-5" placeholder='Salary :' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Daily Allowance <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="da" id="da" type="text" className="form-control ps-5" placeholder='Daily Allowance :' />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Bonus  <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="bonus" id="bonus" type="text" className="form-control ps-5" placeholder='Bonus :' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Profile Image <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="img" id="img" type="file" className="form-control" onChange={setImage} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <span className="form-label">Status</span>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="status" id="status" />
                                            <label className="form-check-label" htmlFor="status">Active</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" id="btnSubmit" className="btn btn-primary" data-bs-dismiss="modal">Add Employee</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
