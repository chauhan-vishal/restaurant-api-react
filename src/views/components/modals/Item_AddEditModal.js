import React, { useEffect, useState } from 'react'

export default function Item_AddEditModal({ master, setImage, updateFormData }) {
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    useEffect(() => {
        fetch("http://localhost:2503/api/category/")
            .then(res => res.json())
            .then(res => {
                setCategories(res.document)
            })

        fetch("http://localhost:2503/api/tag/")
            .then(res => res.json())
            .then(res => {
                setTags(res.document)
            })
    }, [])


    return (
        <div className="modal fade" id={"edit" + master} tabIndex="-1" aria-labelledby="LoginForm-title" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded shadow border-0">
                    <div className="modal-header border-bottom">
                        <h5 className="modal-title" id="LoginForm-title"> <label id="option">Add</label> {master}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4">
                        <div className="container-fluid px-0">
                            <input type="hidden" id="hdnEmployeeID" />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label"> Name <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="name" id="name" type="text" className="form-control ps-5" placeholder="Item Name :" onChange={updateFormData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Descepertion <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="desc" id="desc" type="text" className="form-control ps-5" placeholder="Descepertion :" onChange={updateFormData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">category <span className="text-danger">*</span></label>
                                        <select name="categoryId" id='categoryId' className="form-select form-control" aria-label="Default select example" onChange={updateFormData}>
                                            <option defaultChecked value="" defaultValue>Open this select menu</option>
                                            {
                                                categories && categories.map((category, index) => {
                                                    return (
                                                        <option key={index} value={category._id}>{category.name}</option>
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
                                        <label className="form-label">Price <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="price" id="price" type="text" className="form-control ps-5" placeholder="Price :" onChange={updateFormData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Qunty <span className="text-danger">*</span></label>
                                        <div className="form-icon position-relative">
                                            <i data-feather="user" className="fea icon-sm icons"></i>
                                            <input name="qty" id="qty" type="number" className="form-control ps-5" onChange={updateFormData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <div className="form-group"> <label>Multiple</label>
                                            <select class="select2" multiple="multiple" name="tagId" id='tagId' className="form-select form-control" aria-label="Default select example" onChange={updateFormData}>
                                                <option defaultChecked value="" defaultValue>Open this select menu</option>
                                                {
                                                    tags && tags.map((tag, index) => {
                                                        return (
                                                            <option key={index} value={tag._id}>{tag.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
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
                                            <input className="form-check-input" type="checkbox" name="status" id="status" onChange={updateFormData} />
                                            <label className="form-check-label" htmlFor="status">Active</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" id="btnSubmit" className="btn btn-primary" data-bs-dismiss="modal">Add Item</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
