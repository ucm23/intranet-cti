import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormularioPermisos = () => {
    const [datos, setDatos] = useState({
        nombre: '',
        tipoPermiso: '',
        fecha: '',
        documentacion: null,
    });

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatos({
            ...datos,
            [name]: value,
        });
    };

    const manejarArchivo = (e) => {
        setDatos({
            ...datos,
            documentacion: e.target.files[0],
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

            <Form.Group controlId="formTipoPermiso">
                <Form.Label>Tipo de Permiso</Form.Label>
                <Form.Control
                    as="select"
                    name="tipoPermiso"
                    value={datos.tipoPermiso}
                    onChange={manejarCambio}
                    required
                >
                    <option value="">Seleccione...</option>
                    <option value="medico">Médico</option>
                    <option value="personal">Personal</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formFecha">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                    type="date"
                    name="fecha"
                    value={datos.fecha}
                    onChange={manejarCambio}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formDocumentacion">
                <Form.Label>Adjuntar Documentación</Form.Label>
                <Form.Control
                    type="file"
                    name="documentacion"
                    onChange={manejarArchivo}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Enviar Solicitud
            </Button>
        </Form>
    );
};

export default FormularioPermisos;
