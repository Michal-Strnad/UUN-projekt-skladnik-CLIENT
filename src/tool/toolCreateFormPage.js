import { Container, Row, Col } from 'react-bootstrap';
import Menu from '../menu';
import ToolCreateForm from './toolCreateForm';

function ToolCreateFormPage() {
    return (
        <Container>
            <Row>
                <Col>
                    <Menu />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>Vytvořit nástroj</h1>
                    <ToolCreateForm />
                </Col>
            </Row>
        </Container>
    );
}

export default ToolCreateFormPage;