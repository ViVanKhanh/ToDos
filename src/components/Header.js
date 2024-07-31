import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import logoApp from '../assets/Image/logo192.png'
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';


const Header = (props) => {
    const { logout, user } = useContext(UserContext);
    const navigate = useNavigate();



    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("logout success!")
    }

    return (
        <>
            <Navbar expand="sm" className=" bg-primary ">
                <Container>
                    <Navbar.Brand href="/">

                        <img
                            src={logoApp}
                            width='30'
                            height='30'
                            className='d-inline-block align-top'
                            alt='react bootrap'
                        />
                        <span>
                            React-Bootstrap
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {(user && user.auth || window.location.pathname === '/')&&
                            <>
                                <Nav className="me-auto" >
                                    <NavLink to="/" className="nav-link">
                                        Home
                                    </NavLink>
                                    <NavLink to="/users" className="nav-link">
                                        Manage Users
                                    </NavLink>
                                </Nav>

                                <Nav>
                                    {user && user.email && <span className='nav-link'>Welcome {user.email}</span>}
                                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                                        {user && user.auth === true
                                            ? <NavDropdown.Item onClick={() => handleLogout()} >
                                                Logout
                                            </NavDropdown.Item>
                                            :

                                            <NavLink to="/login" className="dropdown-item">
                                                Login
                                            </NavLink>
                                        }



                                    </NavDropdown>
                                </Nav>
                            </>

                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
