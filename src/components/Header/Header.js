import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './Header.css';

function Header({funcModal}) {
    return (  
        <Navbar  bg="dark" data-bs-theme="dark" className='shadow-sm'>
            <Container>
                <Navbar.Brand>LISTA DE TAREAS</Navbar.Brand>
            </Container>
            <Button variant="primary" className="me-4 fab" onClick={funcModal}>+</Button>
        </Navbar>
    );
}

export default Header;