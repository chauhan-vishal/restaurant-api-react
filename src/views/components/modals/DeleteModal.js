import React from 'react'

export default function DeleteModal({ master, handleClick }) {

    return (
        <div className="modal fade" id={"delete" + master} tabIndex="-1" aria-labelledby="LoginForm-title" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded shadow border-0">
                    <div className="modal-header border-bottom">
                        <h5 className="modal-title" id="LoginForm-title">Delete {master}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="bg-white p-3 rounded box-shadow" style={{ textAlign: "left", padding: "0px !important", fontSize: "1.2rem" }}>
                            <input type="hidden" id={"hdn"+master+"Id"} defaultValue={""} />
                            <p className="text-muted mb-0" >Are you sure you want to delete <label style={{ fontWeight: "700", color: "red" }} id="delete-name">  </label> ?</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => handleClick()} type="button" className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
