import React from 'react'

import $ from 'jquery'

export default function Multiple() {

    $(function () {
        //Initialize Select2 Elements
        $('.select2').select2()

        //Initialize Select2 Elements
        $('.select2bs4').select2({
            theme: 'bootstrap4'
        })
    });
    
    return (
        <div className="container-fluid">

            <div className="layout-specing">
                <div className="d-md-flex justify-content-between">
                    <div>
                        <h5 className="mb-0">Item</h5>

                        <nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
                            <ul className="breadcrumb bg-transparent rounded mb-0 p-0">
                                <li className="breadcrumb-item text-capitalize active" aria-current="page">Item</li>
                            </ul>
                        </nav>
                    </div>

                    <div className="mt-4 mt-sm-0">
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mt-4"></div>
                    <div className='row'>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Multiple</label>
                                <select className="select2" id="tagId" multiple="multiple" data-placeholder="Select a State" style={{ width: "100%" }}>
                                    <option>Alabama</option>
                                    <option>Alaska</option>
                                    <option>California</option>
                                    <option>Delaware</option>
                                    <option>Tennessee</option>
                                    <option>Texas</option>
                                    <option>Washington</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
