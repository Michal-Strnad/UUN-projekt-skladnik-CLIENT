import { Container, Row, Col } from 'react-bootstrap'
import  Menu  from '../menu'
import EmployeeBorrowForm from './employeeBorrowForm';

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
                    <EmployeeBorrowForm />
                </Col>
            </Row>
        </Container>
    )
}

export default EmployeeBorrowFormPage;