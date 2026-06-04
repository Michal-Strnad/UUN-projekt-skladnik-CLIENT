import React, { useContext } from 'react';
import EmployeeListProvider from './employeeListProvider';
import EmployeeListView from './EmployeeListView';
import Menu from '../menu';
import { Container, Row, Col } from 'react-bootstrap';


function EmployeeListPage() {
    return (
        <Container>
            <Row>
                <Col>
                    <Menu />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>Seznam zaměstnanců</h1>
                    <EmployeeListProvider>
                        <EmployeeListView />
                    </EmployeeListProvider>
                </Col>
            </Row>
        </Container>
        
    );
}

export default EmployeeListPage;
