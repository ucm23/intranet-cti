import React from 'react';
import { Link } from 'react-router-dom';

const Puesto = () => {
  const items = [
    { id: 1, nombre: 'Artículo 1' },
    { id: 2, nombre: 'Artículo 2' },
    { id: 3, nombre: 'Artículo 3' },
  ];

  return (
    <div>
      <h1>Lista de Artículos</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <Link to={`/detalle/${item.id}`}>{item.nombre}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default Puesto;