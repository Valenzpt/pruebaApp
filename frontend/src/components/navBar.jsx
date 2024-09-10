import {Nav,  Navbar, Container} from 'react-bootstrap';
import { Link, useNavigate} from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function NavigationBar(){
    const {user, isAuth, logout} = useAuth();

    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate('/login')
    };
    if(!isAuth){
        return null;
    }
    return (
        <Nav className="navbar navbar-light navbar-expand-lg" style={{backgroundColor: '#e3f2fd'}}>
            <Container>
                <Navbar.Brand as={Link} to="/">Sitio</Navbar.Brand>
                <Nav className='me-auto'>
                    {user.rol==1 &&(
                        <Nav.Link as={Link} to="/register">Registrar usuario</Nav.Link>
                    )}
                    <Nav.Link as={Link} to="/empleados">Empleados</Nav.Link>
                    <Nav.Link as={Link} to="/solicitudes">Solicitudes</Nav.Link>
                </Nav>
                <Nav className='ms-auto'>
                    <Nav.Link as={Link} onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket">salir </i></Nav.Link>
                </Nav>
            </Container>
            
        </Nav>
    )
}
export default NavigationBar;