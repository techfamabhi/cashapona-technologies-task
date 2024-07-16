import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import AddData from './components/AddData';
import DisplayRanch from './components/DisplayRanch';


function App() {
 
  return (
    
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-ranch" element={<AddData />} />
      <Route path="/" element={<DisplayRanch />} />
     
        </Routes>
        </BrowserRouter>
        </>
  )
}

export default App