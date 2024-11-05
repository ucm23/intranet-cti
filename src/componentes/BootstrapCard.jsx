import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; 


const BootstrapCard = ({ id, imageSrc, newsTitle, date, time, description }) => {
    return (
        <Card style={{ 
            margin: '10px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
            transition: '0.3s',
            border: 'none' 
        }}
        className="card-3d">
            <Card.Img variant="top" src={imageSrc} alt={newsTitle} />
            <Card.Body>
                <Card.Title>{newsTitle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{date} - {time}</Card.Subtitle>
                <Card.Text>
                    {description}
                </Card.Text>
                {/* Use el componente Link para navegar a la página de detalles */}
                <Link to={`/noticia/${id}`}>
                    <Button variant="primary">Ver más</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default BootstrapCard;