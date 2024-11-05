import React from 'react';
import Navbar from '../../componentes/Navbar';
import { useBreakpointValue } from '@chakra-ui/react';
import logo from '../../img/logo-white.png'
import backgroundImage from '../../img/background.jpg';
import { useNavigate } from 'react-router-dom';


const Index = () => {
    const mobile = useBreakpointValue({ base: true, md: false });
    const navigate = useNavigate();

  const goToHome = () => {navigate('/');
  };

    return (
        
        <Navbar  mobile={mobile}>
            <div style={{ height: '100vh', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#001529', overflow: 'hidden', }}>
                <img src={logo} alt="Logo" style={{ width: '130px', height: 'auto' ,'logo-small' : 'logo',verticalAlign: 'middle'}}  />
                <p><br></br></p>

                </div>
                <div
      style={{
        position: 'relative',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', // Centra la imagen
        backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
        height: '110vh', // Altura del contenedor (100% de la ventana del navegador)
        display: 'flex', // Flexbox para centrar contenido
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center', // Centra verticalmente
        color: 'white', // Cambia el color del texto
      }}

    >
          <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo semitransparente
          color: 'white', // Texto blanco para contraste
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '50px',marginTop: '100px' }}>Grupo CTI</h1>
        <p>Tu aliado Tecnológico</p>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
          color: 'white', // Texto blanco para contraste
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        {/* <h1 style={{ fontSize: '50px',marginTop: '100px' }}>Grupo CTI</h1> */}
        <p style = {{color: 'white',fontFamily: 'Arial, sans-serif', fontSize: '20px'}}>Somos un equipo multidisciplinario con más de 20 años de experiencia en servicios de consultoría especializada, 
            Creamos relaciones de confianza y profesionalismo que nos permite pensar como un solo equipo entre nuestros 
            colaboradores, clientes, socios, mayoristas y fabricantes para contribuir en la innovación y desarrollo tecnológico</p>
      </div>
      
    </div>
    </div>   
        </Navbar>
    )
}
export default Index;