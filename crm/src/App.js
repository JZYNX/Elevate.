import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Message from "./pages/Message"
import Register from "./pages/Register"
import Calendar from "./pages/Calendar"
import Connections from "./pages/Connections"
import EditProfile from "./pages/EditProfile"
import Forget from "./pages/Forget"
import OTPInput from "./pages/OTPInput"
import Reset from "./pages/Reset"

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Login />} />
      <Route path = "/dashboard" element = {<Dashboard />} />
      <Route path = "/message" element = {<Message />} />
      <Route path = "/register" element = {<Register />} />
      <Route path = "/calendar" element = {<Calendar />} />
      <Route path = "/connections" element = {<Connections />} />
      <Route path = "/edit-profile" element = {<EditProfile />} />
      <Route path = "/forget" element = {<Forget />} />
    </Routes>
  </BrowserRouter>
}