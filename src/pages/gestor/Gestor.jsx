import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import TablaContenidos from '../../components/TablaContenidos';
import Footer from '../../components/Footer';
import SectionCarousel from '../../components/SectionCarousel';

const contenidoSecciones = {
  administracion: 'Contenido para la sección de Administración.',
  recursosHumanos: 'Contenido para la sección de Recursos Humanos.',
  areaItsTelepeaje: 'Contenido para la sección de Área ITS y Telepeaje.',
  desarrolloAplicaciones: 'Contenido para la sección de Desarrollo de Aplicaciones.',
  mesaAyuda: 'Contenido para la sección de Mesa de Ayuda.',
};

const Gestor = () => {
  const location = useLocation();
  const path = location.pathname.split('/').pop();

  const descripcion = contenidoSecciones[path] || 'Sección para ver el contenido.';

  const images = [
    '/imgNoticias/proyecto3.jpg',
    '/imgNoticias/proyecto2.jpg',
    '/imgNoticias/proyecto1.jpg',
  ];

  return (
    <div>
      <NavBar />

      {/* Carrusel de imágenes */}
      <SectionCarousel
        images={images}
        sectionTitle="Gestor de Contenidos"
        sectionDescription={descripcion}
      />

      {/* Contenedor para la tabla de contenidos */}
      <div className="container-fluid mt-2">
        <div className="row justify-content-center">
          <div className="col-10">
            {/* Tabla de Contenidos */}
            <TablaContenidos />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gestor;
