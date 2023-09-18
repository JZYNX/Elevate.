import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Message from "./pages/Message"
import Register from "./pages/Register"
import Calendar from "./pages/Calendar"
import Connections from "./pages/Connections"
import Profile from "./pages/Profile"
import Forget from "./pages/Forget"

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Login />} />
      <Route path = "/dashboard" element = {<Dashboard />} />
      <Route path = "/message" element = {<Message />} />
      <Route path = "/register" element = {<Register />} />
      <Route path = "/calendar" element = {<Calendar />} />
      <Route path = "/connections" element = {<Connections />} />
      <Route path = "/profile" element = {<Profile />} />
      <Route path = "/forget" element = {<Forget />} />
    </Routes>
  </BrowserRouter>
}