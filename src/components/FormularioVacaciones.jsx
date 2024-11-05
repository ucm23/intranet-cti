import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormularioVacaciones = () => {
    const [datos, setDatos] = useState({
        nombre: '',
        fechaInicio: '',
        fechaFin: '',
        motivo: '',
    });

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatos({
            ...datos,
            [name]: value,
        });
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos del formulario
        console.log(datos);
    };

    return (
        <Form onSubmit={manejarEnvio}>
            <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre"
                    name="nombre"
                    value={datos.nombre}
                    onChange={manejarCambio}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formFechaInicio">
                <Form.Label>Fecha de Inicio</Form.Label>
                <Form.Control
                    type="date"
                    name="fechaInicio"
                    value={datos.fechaInicio}
                    onChange={manejarCambio}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formFechaFin">
                <Form.Label>Fecha de Fin</Form.Label>
                <Form.Control
                    type="date"
                    name="fechaFin"
                    value={datos.fechaFin}
                    onChange={manejarCambio}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formMotivo">
                <Form.Label>Motivo</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ingrese el motivo de su solicitud"
                    name="motivo"
                    value={datos.motivo}
                    onChange={manejarCambio}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Enviar Solicitud
            </Button>
        </Form>
    );
};

export default FormularioVacaciones;
