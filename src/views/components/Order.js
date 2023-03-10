import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Order({ Order, index }) {
    const {name, status} = Order
    console.log(name)
    
    return (
        <tr>
            <th className="p-3">#{index + 1}</th>
            <td className="p-3 text-center">
                <img src="../../resources/landrick/images/icon/location.svg" className="avatar avatar-ex-small rounded-circle shadow" alt="" />
            </td>
            <td className="p-3"> {name} </td>
            <td className="text-center p-3">
                {
                    status === 'active'
                        ? <div className="badge bg-soft-success rounded px-3 py-1"> Active </div>
                        : <div className="badge bg-soft-danger rounded px-3 py-1"> Inactive </div>
                }
            </td>
            <td className="text-end p-3">
                <NavLink to="invoice.html" className="btn btn-sm btn-primary">View</NavLink>
                <NavLink to="#" className="btn btn-sm btn-soft-success ms-2">Edit</NavLink>
                <NavLink to="#" className="btn btn-sm btn-soft-danger ms-2">Delete</NavLink>
            </td>
        </tr>
    )

}
