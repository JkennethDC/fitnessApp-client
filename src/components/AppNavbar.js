import { NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import 'bootstrap/dist/css/bootstrap.min.css';

// Image & Icon
import logo from "../images/G-LOGO.png";

export default function AppNavbar() {
    // const { user } = useContext(UserContext)
    
    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/"><img src={logo} alt="logo" style={{maxHeight: "3rem"}} /></Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <>
                    <Nav.Link as={NavLink} to="/workouts">Workouts</Nav.Link>
                    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                    <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link> 
                    </>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}