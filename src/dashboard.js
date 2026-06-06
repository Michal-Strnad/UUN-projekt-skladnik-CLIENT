import { Container, Row, Col } from 'react-bootstrap';
import ToolListProvider from './tool/toolListProvider';
import ToolListView from './tool/ToolListView';
import Menu from './menu';

function Dashboard() {
    return (
        <Container>
            <Row>
                <Col>
                    <Menu />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ToolListProvider>
                        <ToolListView />
                    </ToolListProvider>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;