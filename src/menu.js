import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function Menu() {
    const navigate = useNavigate();

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <button type="button" class="btn btn-success">Test</button>
                <Navbar.Brand href="#" onClick={() => navigate('/')}>Skladnik 1.0.0</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#" onClick={() => navigate('/')}>Dashboard</Nav.Link>
                        <Nav.Link href="#" onClick={() => navigate('/employeeBorrow')}>Borrow Tool</Nav.Link>
                        <Nav.Link href="#" onClick={() => navigate('/toolCreate')}>Create Tool</Nav.Link>
                        <Nav.Link href="#" onClick={() => navigate('/employeeCreate')}>Create Employee</Nav.Link>
                        <Nav.Link href="#" onClick={() => navigate('/employeeList')}>Employee List</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;