import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard";
import LogIn from "../components/LogIn";
import AdminAccounts from "../components/adminaccounts";
export default function Pages(){
return(
    <Router>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/adminaccounts" element={<AdminAccounts />}></Route>
            <Route path="/" element={<LogIn />}></Route>
        </Routes>
    </Router>
)
}