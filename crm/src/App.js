import React from "react";
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./pages/Login"

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path = "/login" element = {<Login />} />
      {/* <Route path = "/" element = {<Home />} /> */}
    </Routes>
  </BrowserRouter>
}