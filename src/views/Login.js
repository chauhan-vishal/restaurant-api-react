import React, { useState } from 'react'

export default function Login({ toggleLogin }) {

    const [formData, setFormData] = useState(null)

    const validateInput = (formData) => {
        let result = true
        const requiredValues = ["role", "username", "password"]

        for (let i = 0; i < requiredValues.length; i++) {
            if (!formData || !formData[requiredValues[i]]) {
                alert(`Please enter ${requiredValues[i].charAt(0).toUpperCase() + requiredValues[i].slice(1)}!`)
                return false
            }
        }

        return result
    };

    const updateFormData = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const submitLoginForm = (e) => {
        e.preventDefault();

        if (validateInput(formData)) {
            fetch(process.env.REACT_APP_API_URL + "api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        toggleLogin(res.success, res.document.token, res.document.role)
                    }
                    else {
                        alert("Invalid Credentials ! Please try again...")
                        window.location.reload()
                    }
                })
        }
    }

    return (
        <section className="cover-user bg-white">
            <div className="container-fluid px-0">
                <div className="row g-0 position-relative">
                    <div className="col-lg-4 cover-my-30 order-2">
                        <div className="cover-user-img d-flex align-items-center">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card login-page border-0" style={{ zIndex: "1" }}>
                                        <div className="card-body p-0">
                                            <h4 className="card-title text-center">Login</h4>
                                            <form className="login-form mt-4">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Role <span className="text-danger">*</span></label>
                                                            <div className="form-icon position-relative">
                                                                <select name="role" className="form-select form-control" aria-label="Default select example" required onChange={updateFormData}>
                                                                    <option>Open this select menu</option>
                                                                    <option value="Admin">Admin</option>
                                                                    <option value="Kitchen Staff">Kitchen Staff</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">User Name <span className="text-danger">*</span></label>
                                                            <div className="form-icon position-relative">
                                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                                <input type="email" className="form-control ps-5" placeholder="User Name :" name="username" required onChange={updateFormData} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Password <span className="text-danger">*</span></label>
                                                            <div className="form-icon position-relative">
                                                                <i data-feather="key" className="fea icon-sm icons"></i>
                                                                <input type="password" className="form-control ps-5" name="password" placeholder="Password :" required="" onChange={updateFormData} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="mb-3">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                                    <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
                                                                </div>
                                                            </div>
                                                            <p className="forgot-pass mb-0"><a href="reset-password-cover.html" className="text-dark fw-bold">Forgot password ?</a></p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 mb-0">
                                                        <div className="d-grid">
                                                            <button onClick={submitLoginForm} className="btn btn-primary">Sign in</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 offset-lg-4 padding-less img order-1" style={{ backgroundImage: "url('./resources/images/background_img.jpg')" }} data-jarallax='{"speed": 0.5}'>&nbsp;</div>
                </div>
            </div>
        </section >
    )
}
