import React, { useState } from 'react';
import { Container, Row, Col, Dropdown, DropdownButton, Card, Button, Form } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa'; // Ícono de descarga
import NavBar from '../../components/NavBar';
import SectionCarousel from '../../components/SectionCarousel';
import Footer from '../../components/Footer';

const FormularioPermisos = () => (
    <Form>
        <Form.Group controlId="nombre">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu nombre completo" />
        </Form.Group>
        <Form.Group controlId="email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" />
        </Form.Group>
        <Form.Group controlId="motivoPermiso">
            <Form.Label>Motivo del Permiso</Form.Label>
            <Form.Control type="text" placeholder="Ingresa el motivo del permiso" />
        </Form.Group>
        <Form.Group controlId="fechaPermiso">
            <Form.Label>Fecha del Permiso</Form.Label>
            <Form.Control type="date" />
        </Form.Group>
        <Form.Group controlId="horaPermiso">
            <Form.Label>Hora de Inicio</Form.Label>
            <Form.Control type="time" />
        </Form.Group>
        <Form.Group controlId="archivo">
            <Form.Label>Seleccionar Archivo</Form.Label>
            <Form.Control type="file" />
        </Form.Group>
        <Button className="mt-4 mx-auto d-block" variant="primary" style={{ width: '50%' }} type="submit">
            Enviar Solicitud
        </Button>
    </Form>
);

const FormularioVacaciones = () => (
    <Form>
        <Form.Group controlId="nombre">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu nombre completo" />
        </Form.Group>
        <Form.Group controlId="email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" />
        </Form.Group>
        <Form.Group controlId="fechaInicio">
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control type="date" />
        </Form.Group>
        <Form.Group controlId="fechaFin">
            <Form.Label>Fecha de Finalización</Form.Label>
            <Form.Control type="date" />
        </Form.Group>
        <Form.Group controlId="horaInicio">
            <Form.Label>Hora de Inicio</Form.Label>
            <Form.Control type="time" />
        </Form.Group>
        <Form.Group controlId="motivoVacaciones">
            <Form.Label>Motivo de las Vacaciones</Form.Label>
            <Form.Control type="text" placeholder="Describe el motivo de tus vacaciones" />
        </Form.Group>
        <Button className="mt-4 mx-auto d-block" variant="primary" style={{ width: '50%' }} type="submit">
            Enviar Solicitud
        </Button>
    </Form>
);

const Tramites = () => {
    const [selectedForm, setSelectedForm] = useState('permisos');

    const images = [
        '/imgNoticias/proyecto6.jpg',
        '/imgNoticias/proyecto7.jpg',
        '/imgNoticias/proyecto6.jpg',
    ];

    const handleSelect = (eventKey) => {
        setSelectedForm(eventKey);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar backgroundColor="#001529" />
            <SectionCarousel
                images={images}
                sectionTitle="Trámites y Servicios"
                sectionDescription="Facilita la gestión de solicitudes y trámites internos."
            />

            <Container fluid className="flex-grow-1 d-flex flex-column mt-4">
                <Row className="justify-content-center mb-4">
                    <Col md={4} className="text-center">
                        <DropdownButton
                            id="dropdown-basic-button"
                            title="Selecciona el tipo de Trámite y Servicio"
                            onSelect={handleSelect}
                            variant="primary"
                            className="w-100"
                        >
                            <Dropdown.Item eventKey="vacaciones">Solicitudes de Vacaciones</Dropdown.Item>
                            <Dropdown.Item eventKey="permisos">Permisos Especiales</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
                            <Card.Body>
                                <h3 style={{ color: '#D2691E', textAlign: 'center' }}>
                                    {selectedForm === 'vacaciones' ? 'Solicitudes de Vacaciones' : 'Permisos Especiales'}
                                </h3>
                                <hr style={{ width: '50%', border: '1px solid #D2691E', margin: '10px auto' }} />

                                {selectedForm === 'vacaciones' ? (
                                    <FormularioVacaciones />
                                ) : (
                                    <FormularioPermisos />
                                )}

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        style={{ marginTop: '10px', marginLeft: '10px' }}
                                    >
                                        <FaDownload className="mr-1" size={16} /> Descargar PDF
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <div style={{ marginTop: '40px' }}></div>

            <Footer />
        </div>
    );
};

export default Tramites;
