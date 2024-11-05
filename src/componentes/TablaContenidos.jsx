import React, { useState, useEffect } from 'react';
import data from '../assets/tabla_contenidos.json'; // Importa los datos del archivo JSON
import { Table, Button, Container, Form } from 'react-bootstrap'; // Importa componentes de React Bootstrap
import { useLocation } from 'react-router-dom'; // Hook para obtener la ubicación actual en la aplicación

const TablaContenidos = () => {
  const location = useLocation(); // Hook para obtener la ruta actual de la URL
  const currentPath = '/' + location.pathname.split('/').pop().toLowerCase().trim(); // Obtiene la última parte de la ruta y la formatea en minúsculas

  const [datosFiltrados, setDatosFiltrados] = useState([]); // Estado para almacenar los datos filtrados según la ruta
  const [nombreDepartamento, setNombreDepartamento] = useState(''); // Estado para almacenar el nombre del departamento basado en la ruta
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(''); // Estado para almacenar el proyecto seleccionado por el usuario

  useEffect(() => {
    // Filtra los datos basados en si el atributo `path` coincide con la ruta actual
    const filteredData = data.filter((item) => item.path.toLowerCase().trim() === currentPath);

    // Si no hay coincidencias, muestra todos los datos
    setDatosFiltrados(filteredData.length === 0 ? data : filteredData);

    // Obtiene el nombre del departamento basado en el primer resultado filtrado; si no hay, muestra "Todos los Departamentos"
    const departamento = filteredData.length > 0 ? filteredData[0].departamento : 'Todos los Departamentos';
    setNombreDepartamento(departamento);
  }, [currentPath]); // Dependencia del efecto: se ejecuta cuando `currentPath` cambia

  // Maneja el cambio de selección del proyecto
  const handleProyectoChange = (e) => {
    const proyecto = e.target.value; // Obtiene el valor del proyecto seleccionado
    setProyectoSeleccionado(proyecto);

    // Filtra los datos de acuerdo al proyecto seleccionado
    const filteredByProject = data.filter((item) =>
      (item.path.toLowerCase().trim() === currentPath || currentPath === '/') &&
      (proyecto === '' || item.proyecto === proyecto)
    );

    setDatosFiltrados(filteredByProject);
  };

  // Función para manejar la descarga de un archivo desde una URL proporcionada
  const handleDownload = (url) => {
    const link = document.createElement('a'); // Crea un enlace temporal
    link.href = url; // Establece el enlace a la URL del archivo
    link.download = ''; // No establece un nombre de archivo específico
    document.body.appendChild(link); // Añade el enlace al cuerpo del documento
    link.click(); // Simula un clic en el enlace para iniciar la descarga
    document.body.removeChild(link); // Elimina el enlace temporal del DOM
  };

  // Obtiene una lista de proyectos únicos para el filtro de selección
  const proyectosUnicos = [...new Set(data.map((item) => item.proyecto))]; // Crea un array de proyectos únicos

  return (
    <Container className="my-4 p-3 bg-light rounded shadow-sm">
      {/* Contenedor con estilos Bootstrap */}
      <h3 className="mb-4 text-center"> {nombreDepartamento}</h3> {/* Muestra el título dinámico con el nombre del departamento */}

      {/* Selector de filtro de proyectos */}
      <Form.Select
        aria-label="Filtrar por proyecto"
        className="mb-3"
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

      {/* Tabla de contenidos */}
      <Table responsive bordered hover className="table-striped table-sm">
        {/* Tabla con estilos de Bootstrap */}
        <thead className="thead-dark">
          {/* Cabecera de la tabla con fondo oscuro */}
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
            // Recorre los datos filtrados para crear filas de la tabla
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.departamento}</td>
              <td>{item.proyecto}</td>
              <td>{item.tipoManual}</td>
              <td>{item.titulo}</td>
              <td>{item.descripcion}</td>
              <td>{item.fecha}</td>
              <td>
                {/* Botón para abrir el archivo en una nueva pestaña */}
                <Button variant="primary" className="mx-1 btn-sm" onClick={() => window.open(item.ruta, '_blank')}>
                  Ver
                </Button>
                {/* Botón para descargar el archivo */}
                <Button variant="success" className="mx-1 btn-sm" onClick={() => handleDownload(item.ruta)}>
                  Descargar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TablaContenidos;