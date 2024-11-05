import React, { useState } from 'react';

function MouseOverMessage() {
  // Estado para controlar si el mensaje se muestra o no
  const [showMessage, setShowMessage] = useState(false);

  // Función para mostrar el mensaje
  const handleMouseEnter = () => {
    setShowMessage(true);
  };

  // Función para ocultar el mensaje
  const handleMouseLeave = () => {
    setShowMessage(false);
  };

  return (
    <div>
      {/* El área sensible al mouse */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '200px',
          height: '100px',
          // backgroundColor: 'lightblue',
          textAlign: 'center',
          lineHeight: '100px',
          cursor: 'pointer'
        }}
      >
        {/* Pasa el mouse aquí */}
      </div>

      {/* Mensaje que aparece cuando el mouse está sobre el área */}
      {showMessage && <p>Ver Perfil de Puesto</p>}
    </div>
  );
}

export default MouseOverMessage;