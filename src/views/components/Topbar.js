import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Topbar({ toggleLogin }) {
    function toggleSidebar() {
        document.getElementsByClassName("page-wrapper")[0].classList.toggle("toggled");
    }

    return (
        <div className="top-header">
            <div className="header-bar d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <NavLink to="#" className="logo-icon me-3" >
                        <img src="" height="30" className="small" alt="" />
                        <span className="big">
                            <img src="" height="24" className="logo-light-mode" alt="" />
                            <img src="" height="24" className="logo-dark-mode" alt="" />
                        </span>
                    </NavLink>
                    <button id="close-sidebar" className="btn btn-icon btn-soft-light" onClick={toggleSidebar}>
                        <i className="ti ti-menu-2"></i>
                    </button>
                    <div className="search-bar p-0 d-none d-md-block ms-2">
                        <div id="search" className="menu-search mb-0">
                            <form role="search" method="get" id="searchform" className="searchform">
                                <div>
                                    <input type="text" className="form-control border rounded" name="s" id="s" placeholder="Search Keywords..." />
                                    <input type="submit" id="searchsubmit" value="Search" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <ul className="list-unstyled mb-0">
                    <li className="list-inline-item mb-0">
                        <NavLink to="" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                            <div className="btn btn-icon btn-soft-light"><i className="ti ti-settings"></i></div>
                        </NavLink>
                    </li>

                    <li className="list-inline-item mb-0 ms-1">
                        <div className="dropdown dropdown-primary">
                            <button type="button" className="btn btn-soft-light dropdown-toggle p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="assets/images/client/05.jpg" className="avatar avatar-ex-small rounded" alt="" /></button>
                            <div className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow border-0 mt-3 py-3" style={{ minWidth: "200px" }}>
                                <NavLink className="dropdown-item d-flex align-items-center text-dark pb-3" to="profile.html">
                                    <img src="assets/images/client/05.jpg" className="avatar avatar-md-sm rounded-circle border shadow" alt="" />
                                    <div className="flex-1 ms-2">
                                        <span className="d-block">Cristina Julia</span>
                                        <small className="text-muted">UI / UX Designer</small>
                                    </div>
                                </NavLink>
                                <NavLink className="dropdown-item text-dark" to="index.html"><span className="mb-0 d-inline-block me-1"><i className="ti ti-home"></i></span> Dashboard</NavLink>
                                <NavLink className="dropdown-item text-dark" to="profile.html"><span className="mb-0 d-inline-block me-1"><i className="ti ti-settings"></i></span> Profile</NavLink>
                                <NavLink className="dropdown-item text-dark" to="email.html"><span className="mb-0 d-inline-block me-1"><i className="ti ti-mail"></i></span> Email</NavLink>
                                <div className="dropdown-divider border-top"></div>
                                <NavLink className="dropdown-item text-dark" to="lock-screen.html"><span className="mb-0 d-inline-block me-1"><i className="ti ti-lock"></i></span> Lockscreen</NavLink>
                                <button className="dropdown-item text-dark" onClick={toggleLogin}>
                                    <span className="mb-0 d-inline-block me-1"><i className="ti ti-logout"></i></span> Logout
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div >
    )
}
