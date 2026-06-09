import React, { useContext } from 'react';
import { ToolListContext } from './toolListProvider';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import fetchHelper from '../fetchHelper';

function ToolListViewSimple({ onSelectTool }) {
  const ctx = useContext(ToolListContext);
  const toolList = ctx?.toolList;
           
    const [employeeCounts, setEmployeeCounts] = useState({});
  
  
    //Zjjištění počtu zaměstnanců pro každou pomůcku
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
          {toolList.map((tool) => (
            <Col >
              <Card key={tool.id}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>{tool.name}</Card.Title>
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-end"><strong>Dostupných:&nbsp;</strong> {tool.count - employeeCounts[tool.id]}</div>
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-end">
                            <Button variant="outline-primary" size="sm" onClick={() => onSelectTool(tool)}>
                            Vybrat
                            </Button>
                            </div>
                        </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default ToolListViewSimple;
