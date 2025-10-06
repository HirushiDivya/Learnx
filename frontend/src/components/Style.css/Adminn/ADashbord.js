import "../Style.css/Adminn.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";



export default function ADashbord() {

    const navigate = useNavigate();


    return (
        <div className="stars">
            <h1>
                Course And Lesson Management
            </h1>
            <div className="crd">
                <card >
                    <h2>
                        Manage Courses
                    </h2>
                    <h3>
                        Add, edit, and delete courses .
                    </h3>
                    <button className="button1">
                        Courses
                    </button>
                </card>
            </div>

            <div className="crd">
                <card >
                    <h2>
                        Enrolllment Manage
                    </h2>
                    <h3>
                        give course acces for students
                    </h3>
                    <button className="button1"
                    onClick={() => navigate(`/aenroll`)} >
                        Enrolllment Requests
                    </button>
                </card>
            </div>

            <div className="crd">
                <div >

                    <h2>
                        Analytics & Reports
                    </h2>
                    <h3>
                        View student progress and course insights.
                    </h3>
                    <button className="button1"
                    onClick={() => navigate(`/`)}>
                        View Reports
                    </button>
                </div>
            </div>

        </div>




















    );
}

