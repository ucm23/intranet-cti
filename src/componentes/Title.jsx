// src/components/Title.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes para la validación de propiedades

const Title = ({ text, color }) => {
    return (
        <h1 style={{ 
            color: color, // Aplica el color dinámico
            textAlign: 'center', // Centra el texto
            margin: '20px 0', // Espaciado vertical
            fontWeight: 'bold' // Fuente en negrita
        }}>
            {text}
        </h1>
    );
};

// Definición de los tipos de propiedades y valores predeterminados
Title.propTypes = {
    text: PropTypes.string.isRequired, // El texto es obligatorio
    color: PropTypes.string // El color es opcional
};

export default Title;