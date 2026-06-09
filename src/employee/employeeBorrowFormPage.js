import { Container, Row, Col } from 'react-bootstrap'
import  Menu  from '../menu'
import EmployeeBorrowForm from './employeeBorrowForm';
import EmployeeListProvider from './employeeListProvider';
import ToolListProvider from '../tool/toolListProvider';

function EmployeeBorrowFormPage() {
    return (
        <Container>
            <Row>
                <Col>
                    <Menu />
                </Col>
            </Row>
            <Row>
                <Col>
                <EmployeeListProvider>
                    <ToolListProvider>
                        <EmployeeBorrowForm />
                    </ToolListProvider>
                </EmployeeListProvider>
                </Col>
            </Row>
        </Container>
    )
}

export default EmployeeBorrowFormPage;