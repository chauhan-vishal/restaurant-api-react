import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-white shadow py-3">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="text-sm-start text-center">
                            <p className="mb-0 text-muted">© <script>document.write(new Date().getFullYear())</script> Landrick.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
