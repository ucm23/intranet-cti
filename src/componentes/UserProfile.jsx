import React from 'react';
// import { useUser } from './UserContext';

const UserProfile = () => {
  // const { user, logoutUser } = useUser();

  // if (!user) {
  //   return <p>No hay ningún usuario iniciado.</p>;
  // }

  return (
    <div >
      {/* <p>Usuario: {user.username}</p> */}
      <p style={{
                                position: 'absolute',
                                top: '2%',
                                // left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo semitransparente
                                color: 'red', // Texto blanco para contraste
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'right',
                                // position: 'absolute', 
                                right:'10px' 
                            }}>Adriana</p>
      {/* <button onClick={logoutUser}>Cerrar Sesión</button> */}
      {/* <button 
      style={{
        position: 'absolute',
        top: '6%',
        // left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo semitransparente
        color: 'white', // Texto blanco para contraste
        padding: '20px',
        borderRadius: '8px',
         right:'10px'
    }}>Cerrar Sesión</button> */}
    </div>
  );
};

export default UserProfile;