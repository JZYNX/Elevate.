import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Message from "./pages/Message"

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Login />} />
      <Route path = "/dashboard" element = {<Dashboard />} />
      <Route path = "/message" element = {<Message />} />
    </Routes>
  </BrowserRouter>
}