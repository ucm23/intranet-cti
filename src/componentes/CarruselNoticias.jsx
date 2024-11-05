import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Importa Link desde react-router-dom
import Carousel from 'react-bootstrap/Carousel';
import data from '../assets/info_noticias.json';
import 'bootstrap/dist/css/bootstrap.min.css';



const CarruselNoticias = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {data.map((item, idx) => (
        <Carousel.Item key={idx}>
          {/* Imagen del carrusel */}
          <img
            className="d-block w-100"
            src={item.imageSrc}
            alt={item.newsTitle}
            style={{ objectFit: 'cover', height: '60vh' }}
          />

          {/* Capa de superposición para aplicar la opacidad completa */}
          <div
            style={{
              position: 'absolute', // Posicionamiento absoluto para cubrir la imagen
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo negro con opacidad
              display: 'flex', // Flexbox para centrar el contenido
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white', // Color del texto
              borderRadius: '8px', // Bordes redondeados
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)', // Sombra
            }}
          >
            {/* Contenido del subtítulo del carrusel */}
            <Carousel.Caption>
              <h3>{item.newsTitle}</h3>
              <p>{item.date}</p>
              <p>{item.description}</p>
              <Link to={`/noticia/${idx + 1}`} className="btn btn-primary">Ver más</Link>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarruselNoticias;