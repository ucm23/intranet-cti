import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Importa Link además de useParams
import data from '../assets/info_noticias.json';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SectionCarousel from '../components/SectionCarousel'; // Importa el nuevo componente

// Añadir el campo ID a las noticias
const newsDataWithId = data.map((item, index) => ({
    ...item,
    id: index + 1 // Genera un ID único basado en el índice
}));

const NoticiaDetalle = () => {
    const { id } = useParams(); // Obtiene el ID de la noticia desde la URL

    // Verifica si el ID es un número entero
    const noticiaId = parseInt(id, 10);
    const noticia = newsDataWithId.find(n => n.id === noticiaId);

    // Verifica si la noticia existe
    if (!noticia) {
        return <p>Noticia no encontrada</p>;
    }

    // Filtra las últimas noticias excluyendo la actual
    const ultimasNoticias = newsDataWithId.filter(n => n.id !== noticiaId).slice(0, 5);

    // Imágenes para el carrusel, puedes añadir más imágenes según sea necesario
    const carouselImages = [
        '/imgNoticias/proyecto4.jpg',
        '/imgNoticias/proyecto5.jpg',
        '/imgNoticias/proyecto2.jpg',
    ];

    return (
        <div>
            <NavBar backgroundColor="#001529" />
            <SectionCarousel 
                images={carouselImages} 
                sectionTitle="Noticias Destacadas" 
                sectionDescription="Explora las noticias más destacadas de nuestra plataforma." 
            />
            <div className="container mt-4 mb-5">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h1 className="card-title" style={{ 
                                    color: '#001529', 
                                    fontSize: '2.5rem',
                                    borderBottom: '3px solid #D2691E', 
                                    paddingBottom: '10px',
                                    marginBottom: '20px'
                                }}>
                                    {noticia.newsTitle}
                                </h1>
                                <p className="card-text" style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
                                    {noticia.description}
                                </p>
                                <img
                                    src={noticia.imageSrc}
                                    className="card-img-top img-thumbnail"
                                    alt={noticia.newsTitle}
                                    style={{ maxWidth: '100%', height: 'auto', marginBottom: '15px' }}
                                />
                                <h6 className="card-subtitle mb-2 text-muted" style={{ fontSize: '1rem', marginBottom: '15px' }}>
                                    {noticia.date} - {noticia.time}
                                </h6>
                                <p className="card-text" style={{ fontSize: '1rem' }}>{noticia.fullContent}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Últimas Noticias */}
                    <div className="col-md-4">
                        <h4 className="mb-4" style={{ 
                            fontSize: '1.75rem',
                            color: '#D2691E',
                            borderBottom: '2px solid #001529', 
                            paddingBottom: '10px',
                            marginBottom: '20px'
                        }}>Últimas Noticias</h4> 
                        <div className="list-group">
                            {ultimasNoticias.map(noticia => (
                                <Link
                                    to={`/noticia/${noticia.id}`}
                                    className="list-group-item list-group-item-action"
                                    key={noticia.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '10px',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <img
                                        src={noticia.imageSrc}
                                        className="img-thumbnail"
                                        alt={noticia.newsTitle}
                                        style={{ 
                                            maxWidth: '90px', 
                                            height: 'auto', 
                                            marginRight: '15px',
                                            borderRadius: '2px' 
                                        }}
                                    />
                                    <div>
                                        <h5 className="mb-1" style={{ fontSize: '16px' }}>{noticia.newsTitle}</h5>
                                        <p className="mb-1" style={{ fontSize: '14px' }}>{noticia.description}</p>
                                        <small>{noticia.date}</small>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer style={{ marginTop: '50px' }} /> 
        </div>
    );
};

export default NoticiaDetalle;
