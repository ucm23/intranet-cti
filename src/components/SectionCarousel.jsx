import React from 'react';
import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';

const CarouselContainer = styled.div`
    width: 100%; 
    position: relative;
    overflow: hidden; 
`;

// Contenedor del título con fondo oscuro semitransparente
const TitleContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro con opacidad */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    padding: 1rem; /* Añadir padding para mejor visualización */
`;

// Estilo de las imágenes dentro del carrusel
const CarouselImage = styled.img`
    width: 100%; 
    height: auto; /* Cambiado a auto para mantener la proporción */
    max-height: 30vh; /* Limitar la altura máxima */
    object-fit: cover; 
    opacity: 0.8; 
`;

const SectionCarousel = ({ images, sectionTitle, sectionDescription }) => {
    return (
        <CarouselContainer>
            <Carousel controls={false} indicators={false} interval={3000} pause="hover">
                {images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <CarouselImage
                            src={image}
                            alt={`Slide ${index + 1}`}
                        />
                        <TitleContainer>
                            <h2>{sectionTitle}</h2>
                            <p>{sectionDescription}</p>
                        </TitleContainer>
                    </Carousel.Item>
                ))}
            </Carousel>
        </CarouselContainer>
    );
};

export default SectionCarousel;
