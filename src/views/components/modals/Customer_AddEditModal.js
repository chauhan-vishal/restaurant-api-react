import React, { useEffect } from 'react'

export default function Customer_AddEditModal({ master, updateFormData }) {

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
                                            <label className="form-label">First Name <span className="text-danger">*</span></label>
                                            <div className="form-icon position-relative">
                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                <input name="first" id="first" type="text" className="form-control ps-5" placeholder="Customer Name :" onChange={updateFormData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Last Name <span className="text-danger">*</span></label>
                                            <div className="form-icon position-relative">
                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                <input name="last" id="last" type="text" className="form-control ps-5" placeholder="Customer Name :" onChange={updateFormData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Email <span className="text-danger">*</span></label>
                                            <div className="form-icon position-relative">
                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                <input name="email" id="email" type="text" className="form-control ps-5" placeholder="Email :" onChange={updateFormData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Conatact <span className="text-danger">*</span></label>
                                            <div className="form-icon position-relative">
                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                <input name="contact" id="contact" type="text" className="form-control ps-5" placeholder="Conatct :" onChange={updateFormData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Gender <span className="text-danger">*</span></label>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <div className="form-check mb-0 me-3" style={{ display: "inline-block" }}>
                                                    <input className="form-check-input" type="radio" name="gender" value="M" id="rbdMale" onChange={updateFormData} />
                                                    <label className="form-check-label" htmlFor="rbdMale">Male</label>
                                                </div>
                                                <div className="form-check mb-0 me-3" style={{ display: "inline-block" }}>
                                                    <input className="form-check-input" type="radio" name="gender" value="F" id="rbdFemale" onChange={updateFormData} />
                                                    <label className="form-check-label" htmlFor="rbdFemale">Female</label>
                                                </div>
                                                <div className="form-check mb-0" style={{ display: "inline-block" }}>
                                                    <input className="form-check-input" type="radio" name="gender" value="O" id="rbdOther" onChange={updateFormData} />
                                                    <label className="form-check-label" htmlFor="rbdOther">Other</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                                            <div className="form-icon position-relative">
                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                <input name="dob" id="dob" type="date" className="form-control " onChange={updateFormData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Date of Aniversery <span className="text-danger">*</span></label>
                                            <div className="form-icon position-relative">
                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                <input name="doa" id="doa" type="date" className="form-control " onChange={updateFormData} />
                                            </div>
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
                        <button type="submit" id="btnSubmit" className="btn btn-primary" data-bs-dismiss="modal">Add Customer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
