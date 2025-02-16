import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { SESSION_TOKEN } from '../../service/constants';


const Header = () => {
    const navigate = useNavigate(); 

    const handleSignOut = () => {
        localStorage.clear()
        navigate('/sign-in'); 
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Poll App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    {localStorage.getItem(SESSION_TOKEN) && (
                        <>
                            <Button as={Link} to="/poll" variant="primary" className="me-2">
                                Add Poll
                            </Button>
                            <Button variant="danger" onClick={handleSignOut}>
                                Sign Out
                            </Button>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;