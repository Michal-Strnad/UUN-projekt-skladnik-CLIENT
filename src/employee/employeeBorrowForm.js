import React, { useState, useContext } from 'react';
import { EmployeeListContext } from './employeeListProvider';
import { ToolListContext } from '../tool/toolListProvider';
import ToolListViewSimple from '../tool/ToolListViewSimple';
import EmployeeListView from './EmployeeListView';
import fetchHelper from '../fetchHelper';
import { Button } from 'react-bootstrap';

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
      const payload = {
        employeeId: selectedEmployee.id,
        toolId: selectedTool.id,
      };
      const res = await fetchHelper.employee.update(payload);
      if (res.ok) {
        setMessage({ type: 'success', text: 'Borrow recorded' });
      } else {
        setMessage({ type: 'error', text: 'Server error: ' + (res.data?.message ?? res.status) });
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
          <ToolListViewSimple onSelectTool={tool => setSelectedTool(tool)} />
        </div>

        <div style={{ flex: 1 }}>
          <h4>Employees</h4>
          <EmployeeListView onSelectEmployee={emp => setSelectedEmployee(emp)} />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div>Selected tool: {selectedTool?.name ?? '—'}</div>
        <div>Selected employee: {selectedEmployee?.firstName ?? '—'}</div>

        <Button variant="primary" onClick={handleBorrow} disabled={loading}>
          {loading ? 'Processing...' : 'Zapůjčit'}
        </Button>
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