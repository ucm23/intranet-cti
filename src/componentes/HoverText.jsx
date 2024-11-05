import React, { useState } from 'react';

function HoverText({ text, handleDetails }) {  // Recibe el prop 'text'
    const [showMessage, setShowMessage] = useState(false);

    const handleMouseEnter = () => {
        setShowMessage(true);
    };

    const handleMouseLeave = () => {
        setShowMessage(false);
    };

    return (
        <div onClick={() => handleDetails()}>
            <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer' }}  
            >
                { text}
            </span>
            {showMessage && <p style={{ color: 'blue' }}>Ver Perfil de Puesto</p>}
        </div>
    );
}

export default HoverText;