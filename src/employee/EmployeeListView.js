import React, { useContext } from 'react';
import { EmployeeListContext } from './employeeListProvider';
import { Col, Row, Card, Button } from 'react-bootstrap';
import fetchHelper from '../fetchHelper';
import { ToolListContext } from '../tool/toolListProvider';
import { useLocation } from 'react-router-dom';

function EmployeeListView( { onSelectEmployee }) {
    const location = useLocation();
    const isDashboardPage = location.pathname === '/';
    const isEmployeeListPage = location.pathname === '/employeeList';
    const isBorrowFormPage = location.pathname === '/employeeBorrow';

    const ctx = useContext(EmployeeListContext);
    const employeeList = ctx?.employeeList;

    const ctxTool = useContext(ToolListContext);
    const fetchToolList = ctxTool?.fetchToolList;
    const fetchEmployeeList = ctx?.fetchEmployeeList;
    const fetchEmployeeListByToolId = ctx?.fetchEmployeeListByToolId;

    async function cancelBorrow(emp) {
        const res = await fetchHelper.employee.update({ employeeId: emp.id, toolId: 'none' });
        await fetchEmployeeListByToolId(emp.toolId);
        await fetchToolList();
    }

    async function removeEmployee(emp) {
        const res = await fetchHelper.employee.remove({ employeeId: emp.id });
        await fetchEmployeeList();
    }

  if (!employeeList) return <div>Loading employees...</div>;

  return (
    <Row xs={1} className="g-1">
      {employeeList.map(emp => (
        <Col key={emp.id}>
          <Card>
            <Card.Body>
                <Row>
                    <Col>
                        {emp.firstName} {emp.lastName}
                    </Col>
                    <Col>
                        {emp.age}
                    </Col>
                    <Col>
                        {emp.department}
                    </Col>
                    <Col>
                        <div className="d-flex justify-content-end">
                        {isEmployeeListPage && (
                            <Button variant="outline-primary" size="sm" onClick={() => removeEmployee(emp)}>
                              Vymazat
                            </Button>
                          )}
                        {isDashboardPage && (
                            <Button variant="outline-primary" size="sm" onClick={() => cancelBorrow(emp)}>
                              Odebrat
                            </Button>
                          )}
                        {isBorrowFormPage && emp.toolId === 'none' && (
                            <Button variant="outline-primary" size="sm" onClick={() => onSelectEmployee(emp)}>
                              Vybrat
                            </Button>
                          )}
                        </div>
                    </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default EmployeeListView;
