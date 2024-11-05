import React, { useState } from 'react';

function HoverText1({ text }) {  // Recibe el prop 'text'
    const [showMessage, setShowMessage] = useState(false);

    const handleMouseEnter = () => {
        setShowMessage(true);
    };

    const handleMouseLeave = () => {
        setShowMessage(false);
    };

    return (
        <div>
            {/* <p */}
            <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer' }}
                // style={{ display: 'inline-block', cursor: 'pointer', whiteSpace: 'normal' }}
                
            >
                { text} {/* Muestra el texto que viene como prop */}
            {/* </p> */}
            </span>
            {showMessage && (
                <p style={{ color: 'blue' }}>Ver Mi Perfil</p>
            )}
        </div>
    );
}

export default HoverText1;