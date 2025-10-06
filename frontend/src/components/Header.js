import React from "react";
import { Link } from "react-router-dom";

function Header1() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#9aa4ad" }}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto"> 



                    <li className="nav-item active">
                        <Link to="/home" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/add-course" className="nav-link">Add Course</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/all-course">All Courses</a>
                    </li>


                </ul>




                <ul className="navbar-nav ml-auto"> 
                    <li className="nav-item">
                        <Link to="/logout" className="nav-link">Logout</Link>
                    </li>

                </ul>

            </div>
        </nav>



    );
}

export default Header1;

