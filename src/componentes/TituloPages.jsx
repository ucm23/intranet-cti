import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import fondo2 from '../imgNoticias/fondo2.jpg';
import '../../src/styles/styles.css';

interface TituloPagesProps {
    text: string;
    backgroundImage?: string;
    
}

// const TituloPages: React.FC<TituloPagesProps> = ({ text, backgroundImage = "/imgNoticias/fondo2.jpg" }) => {
const TituloPages: React.FC<TituloPagesProps> = ({ text}) => {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '250px',
            marginBottom: '30px',
            overflow: 'hidden',
        }}>
            {/* Imagen de fondo dinámica */}
            <img
                src={fondo2} 
                alt="Background"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    zIndex: '-2'
                }}
            />
            {/* Capa de superposición con transparencia */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: '-1'
            }}></div>
            <Container fluid style={{ height: '100%' }}>
                <Row className="h-100 d-flex justify-content-center align-items-center">
                    <Col className="text-center">
                        <h1 style={{
                            color: 'white',
                            padding: '15px 30px',
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.9)',
                            zIndex: '1',
                            margin: '0',
                        }}>
                            {text}
                        </h1>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default TituloPages;