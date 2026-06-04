import { createContext, useState, useEffect } from 'react';
import fetchHelper from '../fetchHelper';

export const EmployeeListContext = createContext();

function EmployeeListProvider({ children, toolId = null }) {
  const [employeeList, setEmployeeList] = useState([]);

  async function fetchEmployeeList() {
    const response = await fetchHelper.employee.getAll({});
    if (response.ok) {
      setEmployeeList(response.data);
    } else {
      console.error('Error fetching employee list:', response.status);
    }
  }

  async function fetchEmployeeListByToolId(id) {
    const response = await fetchHelper.employee.getByToolId({ toolId: id });
    if (response.ok) {
      // normalize to array so consumer can map over it
      setEmployeeList(Array.isArray(response.data) ? response.data : [response.data]);
    } else {
      console.error('Error fetching employee list by tool id:', response.status);
    }
  }

  // Fetch when component mounts or when toolId changes.
  useEffect(() => {
    if (toolId !== null && toolId !== undefined) {
      fetchEmployeeListByToolId(toolId);
    } else {
      fetchEmployeeList();
    }
  }, [toolId]);

  return (
    <EmployeeListContext.Provider value={{ employeeList, fetchEmployeeList, fetchEmployeeListByToolId }}>
      {children}
    </EmployeeListContext.Provider>
  );
}

export default EmployeeListProvider;
