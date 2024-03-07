import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components /HomePage";
import ModelDetailsPage from "./components /ModelDetailsPage";
import AddModelPage from "./components /AddModelPage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} /> 
          <Route path="/model/add" element={<AddModelPage/>} /> 
          <Route path="/model/:id" element={<ModelDetailsPage/>} /> 
        </Routes>
    </Router>
  );
}

export default App;
