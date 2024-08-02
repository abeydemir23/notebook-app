import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ListNote from "./pages/ListNote"
import ProjectCreate from "./pages/CreateNote"
import EditNote from "./pages/EditNote"
import ShowNote from "./pages/ShowNote"
import Login from "./pages/Login"
import Registration from "./pages/Registration"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Registration />} />
        <Route exact path="/dashboard" element={<ListNote />} />
        <Route path="/create" element={<ProjectCreate />} />
        <Route path="/edit/:id" element={<EditNote />} />
        <Route path="/show/:id" element={<ShowNote />} />
      </Routes>
    </Router>
  );
}

export default App;