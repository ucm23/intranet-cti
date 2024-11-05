import React, { useState, useEffect } from 'react';
import data from '../assets/tabla_contenidos.json'; // Datos de ejemplo
import { Table, Button, Container, Form } from 'react-bootstrap'; // Bootstrap Components
import { useLocation } from 'react-router-dom';
import { FaEye, FaDownload } from 'react-icons/fa';

const TablaContenidos = () => {
  const location = useLocation();
  const currentPath = '/' + location.pathname.split('/').pop().toLowerCase().trim();

  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [nombreDepartamento, setNombreDepartamento] = useState('');
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');

  useEffect(() => {
    const filteredData = data.filter((item) => item.path.toLowerCase().trim() === currentPath);
    setDatosFiltrados(filteredData.length === 0 ? data : filteredData);
    const departamento = filteredData.length > 0 ? filteredData[0].departamento : 'Todos los Departamentos';
    setNombreDepartamento(departamento);
  }, [currentPath]);

  const handleProyectoChange = (e) => {
    const proyecto = e.target.value;
    setProyectoSeleccionado(proyecto);

    const filteredByProject = data.filter((item) =>
      (item.path.toLowerCase().trim() === currentPath || currentPath === '/') &&
      (proyecto === '' || item.proyecto === proyecto)
    );
    setDatosFiltrados(filteredByProject);
  };

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const proyectosUnicos = [...new Set(data.map((item) => item.proyecto))];

  return (
    <Container fluid className="my-4 p-2 bg-light rounded shadow-sm">
      <div className="mb-4">
        <div className="text-center mb-3">
          <h3 style={{ color: '#D2691E' }}>{nombreDepartamento}</h3>
          <hr style={{ borderColor: '#D2691E', width: '50%', margin: '0 auto' }} /> {/* Línea horizontal */}
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Select
            aria-label="Filtrar por proyecto"
            className="w-50"
            onChange={handleProyectoChange}
            value={proyectoSeleccionado}
          >
            <option value="">Mostrar todos los proyectos</option>
            {proyectosUnicos.map((proyecto, index) => (
              <option key={index} value={proyecto}>
                {proyecto}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      {/* Tabla responsiva para pantallas pequeñas */}
      <Table responsive bordered hover className="table-striped table-sm">
        <thead style={{ backgroundColor: '#001529', color: '#fff' }}>
          <tr>
            <th>ID</th>
            <th>Departamento</th>
            <th>Proyecto</th>
            <th>Tipo de Manual</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.departamento}</td>
              <td>{item.proyecto}</td>
              <td>{item.tipoManual}</td>
              <td>{item.titulo}</td>
              <td>{item.descripcion}</td>
              <td>{item.fecha}</td>
              <td>
                <div className="d-flex justify-content-around">
                  <Button variant="primary" className="btn-sm" onClick={() => window.open(item.ruta, '_blank')}>
                    <FaEye />
                  </Button>
                  <Button variant="success" className="btn-sm" onClick={() => handleDownload(item.ruta)}>
                    <FaDownload />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TablaContenidos;
