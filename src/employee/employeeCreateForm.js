import React, { useState } from 'react';
import fetchHelper from '../fetchHelper';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function EmployeeCreateForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [age, setAge] = useState(18);
  const [toolId, setToolId] = useState('none');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    // Basic validation
    if (!firstName.trim()) {
      setMessage({ type: 'error', text: 'First name is required' });
      return;
    }
    if (!lastName.trim()) {
      setMessage({ type: 'error', text: 'Last name is required' });
      return;
    }
    if (!department.trim()) {
      setMessage({ type: 'error', text: 'Department is required' });
      return;
    }
    if (isNaN(age) || Number(age) < 18) {
      setMessage({ type: 'error', text: 'Age must be 18 or greater' });
      return;
    }

    // odeslani dat na server
    const payload = { firstName: firstName.trim(), lastName: lastName.trim(), department: department.trim(), age: Number(age), toolId: toolId.trim() };
    setLoading(true);
    try {
      const res = await fetchHelper.employee.create(payload);
      if (res.ok) {
        setMessage({ type: 'success', text: 'Employee created successfully' });
        setFirstName('');
        setLastName('');
        setDepartment('');
        setAge(18);
        setToolId('none');
      } else {
        setMessage({ type: 'error', text: `Server error: ${res.data.error}` });
      }
    } catch (err) {
      setMessage({ type: 'error', text: String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Label>Create Employee</Form.Label>
        <Form.Control
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="Enter first name"
        />
        <Form.Control
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Enter last name"
        />
        <Form.Control
          type="text"
          value={department}
          onChange={e => setDepartment(e.target.value)}
          placeholder="Enter department"
        />
        <Form.Control
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          min="0"
          placeholder="Enter age"
        />
        <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
        </Button>
        {message && (
          <div style={{ marginTop: 12, color: message.type === 'error' ? 'crimson' : 'green' }}>
            {message.text}
          </div>
        )}
      </Form>
  );
}

export default EmployeeCreateForm;
