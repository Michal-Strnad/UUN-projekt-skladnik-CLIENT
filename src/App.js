import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import EmployeeCreateFormPage from './employee/employeeCreateFormPage';
import ToolCreateFormPage from './tool/toolCreateFormPage';
import EmployeeListPage from './employee/employeeListPage';
import EmployeeBorrowFormPage from './employee/employeeBorrowFormPage';
  
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employeeCreate" element={<EmployeeCreateFormPage />} />
          <Route path="/toolCreate" element={<ToolCreateFormPage />} />
          <Route path="/employeeList" element={<EmployeeListPage />} />
          <Route path="/employeeBorrow" element={<EmployeeBorrowFormPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;