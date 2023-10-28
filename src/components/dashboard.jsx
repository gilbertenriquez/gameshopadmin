import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
 export default function Dashboard(){
    const nav = useNavigate();
    return(
        <div className="container-fluid" id="dashboard">
            <div className="container">
                <div className="row text-light">
                    <div className="p-5 col bg-danger">Reported Accounts(3)</div>
                    <div className="p-5 col bg-primary">
                        <a href="">Accounts</a>
                    </div>
                    <div className="p-5 col bg-dark">Banned Accounts(2)</div>
                    <div className="p-5 col bg-success">New Accounts(1)</div>
                    <div className="p-5 col bg-secondary">
                        <a href="" onClick={()=>{nav("/adminaccounts")}}>Admin Accounts</a>
                    </div>
                </div>
            </div>
        </div>
    );
}