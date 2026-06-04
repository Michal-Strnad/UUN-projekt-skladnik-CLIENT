import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Menu from '../menu';
import EmployeeCreateForm from './employeeCreateForm';

function EmployeeCreateFormPage() {
    return (
            <Container>
                <Row>
                    <Col>
                        <Menu />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <EmployeeCreateForm />
                    </Col>
                </Row>
            </Container>
    );
}

export default EmployeeCreateFormPage;