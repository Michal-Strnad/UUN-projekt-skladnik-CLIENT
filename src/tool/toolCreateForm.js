import React, { useState } from 'react';
import fetchHelper from '../fetchHelper';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function ToolCreateForm() {
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    // Basic validation
    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Name is required' });
      return;
    }
    if (isNaN(count) || Number(count) < 0) {
      setMessage({ type: 'error', text: 'Count must be 0 or greater' });
      return;
    }

    // odeslani dat na server
    const payload = { name: name.trim(), count: Number(count) };
    setLoading(true);
    try {
      const res = await fetchHelper.tool.create(payload);
      if (res.ok) {
        setMessage({ type: 'success', text: 'Tool created successfully' });
        setName('');
        setCount(1);
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
        <Form.Label>Create Tool</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
      placeholder="Enter tool name"
      style={{ width: '100%', padding: 6 }}
    />
    <Form.Label>Tool count</Form.Label>
    <Form.Control
      type="number"
      value={count}
      onChange={e => setCount(e.target.value)}
      min="1"
      style={{ width: 120, padding: 6 }}
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

export default ToolCreateForm;
