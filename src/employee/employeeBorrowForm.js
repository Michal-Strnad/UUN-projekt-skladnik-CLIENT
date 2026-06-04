import React, { useState } from 'react';
import { useContext } from 'react';
import { EmployeeListContext } from './employeeListProvider';
import { ToolListContext } from '../tool/toolListProvider';
import ToolListProvider from '../tool/toolListProvider';
import ToolListViewSimple from '../tool/ToolListViewSimple';
import EmployeeListView from '../employee/EmployeeListView';
import fetchHelper from '../fetchHelper';
import EmployeeListProvider from './employeeListProvider';

function EmployeeBorrowForm() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const ctxEmployee = useContext(EmployeeListContext);
  const fetchEmployeeList = ctxEmployee?.fetchEmployeeList;
  const ctxTool = useContext(ToolListContext);
  const fetchToolList = ctxTool?.fetchToolList;

  async function handleBorrow() {
    setMessage(null);
    if (!selectedTool || !selectedEmployee) {
      setMessage({ type: 'error', text: 'Vyberte nejdříve zaměstnance a pomůcku' });
      return;
    }
    setLoading(true);
    try {
      // adjust payload to your backend contract
      const payload = {
        employeeId: selectedEmployee.id,
        toolId: selectedTool.id,
      };
      const res = await fetchHelper.employee.update(payload);
      // check res.ok, show message, etc.
      if (res.ok) {
        setMessage({ type: 'success', text: 'Borrow recorded' });
        // optionally refresh lists (call parent functions or providers)
      } else {
        setMessage({ type: 'error', text: 'Server error: ' + res.data.message });
      }
    } finally {
      setLoading(false);
      if (typeof fetchToolList === 'function') await fetchToolList();
      if (typeof fetchEmployeeList === 'function') await fetchEmployeeList();
    }
  }

  return (
    <div>
      <h3>Borrow tool</h3>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h4>Tools</h4>
          <ToolListProvider>
            <ToolListViewSimple onSelectTool={tool => setSelectedTool(tool)} />
          </ToolListProvider>
        </div>

        <div style={{ flex: 1 }}>
          <h4>Employees</h4>
          <EmployeeListProvider>
            <EmployeeListView onSelectEmployee={emp => setSelectedEmployee(emp)} />
          </EmployeeListProvider>
          
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div>Selected tool: {selectedTool?.name ?? '—'}</div>
        <div>Selected employee: {selectedEmployee?.firstName ?? '—'}</div>

        <button onClick={handleBorrow} disabled={loading}>
          {loading ? 'Processing...' : 'Borrow'}
        </button>
      </div>
      {message && (
          <div style={{ marginTop: 12, color: message.type === 'error' ? 'crimson' : 'green' }}>
            {message.text}
          </div>
        )}
    </div>
  );
}

export default EmployeeBorrowForm;