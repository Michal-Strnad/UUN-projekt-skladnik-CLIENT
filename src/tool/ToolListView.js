import React, { useContext, useState, useEffect } from 'react';
import { ToolListContext } from './toolListProvider';
import { Card, Row, Col, Button } from 'react-bootstrap';
import EmployeeListProvider from '../employee/employeeListProvider';
import EmployeeListView from '../employee/EmployeeListView';
import ToolUpdateForm from './toolUpdateForm';
import fetchHelper from '../fetchHelper';

function ToolListView() {
  const ctx = useContext(ToolListContext);
  const toolList = ctx?.toolList;
  const [selectedToolId, setSelectedToolId] = useState(null);
  const [editingToolId, setEditingToolId] = useState(null);
  const [employeeCounts, setEmployeeCounts] = useState({});


  //Zjjištění počtu zaměstnanců pro každou pomůcku (rozdělení pomůcek na zapůjčené a dostupné a zjištění počtu)
  useEffect(() => {
    if (!toolList || toolList.length === 0) return;
    let mounted = true;

    async function loadCounts() {
      const promises = toolList.map(async (tool) => {
          const res = await fetchHelper.employee.getByToolId({ toolId: tool.id });
          if (res && res.ok) {
            const data = res.data;
            const count = data.length;
            return { id: tool.id, count };
          }
        return { id: tool.id, count: 0 };
      });

      const results = await Promise.all(promises);
      if (!mounted) return;
      const map = {};
      results.forEach(r => { map[r.id] = r.count; });
      setEmployeeCounts(map);
    }

    loadCounts();
    return () => { mounted = false; };
  }, [toolList]);




  if (!toolList) return <div>Loading tools...</div>;

  return (
    <>
      {toolList.length === 0 ? (
        <div>Neexistují žádné pomůcky</div>
      ) : (
        <Row xs={1} className="g-1">
        <h1>Zapůjčené pomůcky</h1>
          {toolList.map((tool) => (
            (employeeCounts[tool.id] > 0) && (
            <Col key={tool.id}>
                <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>{tool.name}</Card.Title>
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-end">{employeeCounts[tool.id]} / {tool.count}</div>
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-end">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => setSelectedToolId(prev => (prev === tool.id ? null : tool.id))}
                            >
                            Details
                            </Button>
                            </div>
                        </Col>
                  </Row>
                </Card.Body>
              </Card>
              {selectedToolId === tool.id && (
                <div style={{ marginTop: 12 }}>
                  <EmployeeListProvider toolId={selectedToolId}>
                    <EmployeeListView />
                  </EmployeeListProvider>
                </div>
              )}

            </Col>
          )))}
        </Row>
      )}

      {toolList.length === 0 ? (
        <div></div>
      ) : (
        <Row xs={1} className="g-1">
        <h1>Dostupné pomůcky</h1>
          {toolList.map((tool) => (
            <Col key={tool.id}>
                <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>{tool.name}</Card.Title>
                        </Col>
                        <Col>
                            {(tool.count - employeeCounts[tool.id]) > 0 ? (
                                <div className="d-flex justify-content-end">{(tool.count - employeeCounts[tool.id])} / {tool.count}</div>
                            ) : (<div className="d-flex justify-content-end text-danger">{(tool.count - employeeCounts[tool.id])} / {tool.count}</div>)}
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-end">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => setEditingToolId(tool.id)}//set editing tool id
                            >
                            Upravit
                            </Button>
                            </div>
                        </Col>
                  </Row>
                </Card.Body>
              </Card>
              {editingToolId === tool.id && (
                  <ToolUpdateForm
                    tool={tool}
                    onClose={() => setEditingToolId(null)}
                    onUpdated={() => { if (typeof ctx.fetchToolList === 'function') ctx.fetchToolList(); }}
                  />
                )}
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default ToolListView;
