import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TablaContenidos from '../components/TablaContenidos';
import Footer from '../components/Footer';
import SectionCarousel from '../components/SectionCarousel'; // Importa el componente

const contenidoSecciones = {
    administracion: 'Contenido para la sección de Administración.',
    recursosHumanos: 'Contenido para la sección de Recursos Humanos.',
    areaItsTelepeaje: 'Contenido para la sección de Área ITS y Telepeaje.',
    desarrolloAplicaciones: 'Contenido para la sección de Desarrollo de Aplicaciones.',
    mesaAyuda: 'Contenido para la sección de Mesa de Ayuda.',
};

const GestorContenidos: React.FC = () => {
    const location = useLocation();
    const path = location.pathname.split('/').pop();

    const descripcion = contenidoSecciones[path] || 'Sección para ver el contenido.';

    // Array con las imágenes para el carrusel
    const images = [
        '/imgNoticias/proyecto3.jpg',
        '/imgNoticias/proyecto2.jpg',
        '/imgNoticias/proyecto1.jpg',
    ];

    return (
        <div>
            <NavBar /> 
            
            <SectionCarousel 
                images={images} 
                sectionTitle={`Gestor de Contenidos`} 
                sectionDescription={descripcion}
            />
            
            <div className="container mt-4">
                <TablaContenidos />
            </div>

            <Footer />
        </div>
    );
};

export default GestorContenidos;
