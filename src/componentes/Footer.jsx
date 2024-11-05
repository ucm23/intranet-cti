import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../img/logo-white.png';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#001529' }} className="text-light py-4">
            <Container style={{display: 'flex',position: 'relative',justifycontent: 'flex-end',textalign: 'right'}}>
                <Row className="align-items-center">
                    {/* Logo y Redes Sociales */}
                    <Col md={3} className="d-flex flex-column align-items-center align-items-md-start mb-3 mb-md-0">
                        <img src={logo} alt="Grupo CTI" style={{ maxWidth: '150px',position: 'absolute',left: '0' }} />
                        {/* Redes Sociales */}
                        <div className="mt-3 d-flex justify-content-center justify-content-md-start">
                            <a href="https://www.facebook.com/profile.php?id=100085752526148" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </div>
                    </Col>

                    {/* Menú dividido en dos columnas */}
                    {/* <Container>
                    <Col md={6}>
                        <Row>
                            <Col md={6}>
                                <Nav className="flex-column" style={{ gap: '0.5rem' }}>
                                    <Nav.Link href="/" className="py-1">Inicio</Nav.Link>
                                    <Nav.Link href="/noticias" className="py-1">Noticias</Nav.Link>
                                    <Nav.Link href="/colaboradores" className="py-1">Colaboradores</Nav.Link>
                                    <Nav.Link href="/tramites-servicios" className="py-1">Trámites y Servicios</Nav.Link>
                                </Nav>
                            </Col>
                            <Col md={6}>
                                <Nav className="flex-column" style={{ gap: '0.5rem' }}>
                                    <Nav.Link href="/gestor-contenidos" className="py-1">Gestor de Contenidos</Nav.Link>
                                    <Nav.Link href="/indicadores" className="py-1">Indicadores</Nav.Link>
                                    <Nav.Link href="/calendario" className="py-1">Calendario de Eventos</Nav.Link>
                                </Nav>
                            </Col>
                        </Row>
                    </Col>
</Container> */}
                    {/* Información de contacto */}
                    <Container style={{marginleft: 'auto',display: 'inline-block',padding: '20px',minWidth:'300%'}}>
                    <Col md={3} className="text-center text-md-right">
                    <p><br></br></p><p><br></br></p>
                        <h5>Contáctanos</h5>
                        <p>
                            <a href="mailto:contacto@consultores-cti.com.mx" className="text-light">contacto@consultores-cti.com.mx</a><br />
                            <a href="tel:+528115880305" className="text-light">811 588 03 05</a><br />
                            Av. Ejército Nacional 769, piso 2.<br />
                            Col. Granada C.P. 11520, CDMX.<br />
                            <p><br></br></p>
                            © 2024 Grupo CTI Tech-IN POS. Todos los derechos reservados.
                        </p>
                        
                    </Col>
                    </Container>
                </Row>
                
                {/* <Row> */}
                {/* <Container style={{marginleft: 'auto',display: 'inline-block',padding: '20px',width:'350px'}}> <Col className="text-center mt-3">
                <p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p>
                <p><br></br></p><p><br></br></p><p><br></br></p><p><br></br></p>
                        <p className="mb-0">© 2024 Grupo CTI Tech-IN POS. Todos los derechos reservados.</p>
                        <a href="/politica-privacidad" className="text-light">Política de privacidad</a>
                    </Col></Container> */}
                    {/* <p><br></br></p><p><br></br></p><p><br></br></p>
                    
                    <p className="mb-0">© 2024 Grupo CTI Tech-IN POS. Todos los derechos reservados.</p>
                </Row> */}
            </Container>
            
        </footer>
        
    );
};

export default Footer;