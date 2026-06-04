import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import fetchHelper from '../fetchHelper';

function ToolUpdateForm({ tool, onClose, onUpdated }) { //onUpdated - funkce z toolListView
    const [name, setName] = useState(tool?.name || '');
    const [count, setCount] = useState(tool?.count ?? 1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage(null);
        if (!name.trim()) {
            setMessage({ type: 'error', text: 'Name is required' });
            return;
        }
        if (isNaN(count) || Number(count) < 0) {
            setMessage({ type: 'error', text: 'Count must be 0 or greater' });
            return;
        }

        setLoading(true);
        try {
            const res = await fetchHelper.tool.update({ toolId: tool.id, count: Number(count) });
            if (res && res.ok) {
                setMessage({ type: 'success', text: 'Updated' });
                // refresh parent list if requested, then close
                if (typeof onUpdated === 'function') onUpdated();
                onClose();
            } else {
                setMessage({ type: 'error', text: res?.data?.message || 'Update failed' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Update failed' });
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (!window.confirm('Are you sure you want to delete this tool?')) return;
        setMessage(null);

        
        setLoading(true);
        try {
            const res = await fetchHelper.tool.remove({ toolId: tool.id });
            if (typeof onUpdated === 'function') onUpdated();
            onClose();
            
            /*if (res && res.ok) {
                setMessage({ type: 'success', text: 'Deleted' });
                if (typeof onUpdated === 'function') onUpdated();
                onClose();
            } else {
                setMessage({ type: 'error', text: res?.data?.message || 'Delete failed' });
            }*/
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Delete failed' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal show={true} onHide={onClose}>
            <Form /*onSubmit={handleSubmit}*/>
                <Modal.Header closeButton>
                    <Modal.Title>Upravit pomůcku</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Název</Form.Label>
                        <Form.Control value={name} onChange={e => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Počet</Form.Label>
                        <Form.Control type="number" value={count} onChange={e => setCount(e.target.value)} min={0} />
                    </Form.Group>
                    {message && (
                        <div style={{ marginTop: 12, color: message.type === 'error' ? 'crimson' : 'green' }}>
                            {message.text}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose} disabled={loading}>
                        Zrušit
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Upravuji...' : 'Upravit'}
                    </Button>
                    <Button variant="danger" onClick={handleDelete} disabled={loading}>
                        {loading ? 'Odstranuji...' : 'Odstranit'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ToolUpdateForm;