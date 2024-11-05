import React from 'react';
import Navbar from '../../componentes/NavbarOriginal';
import logo from '../../img/logo-white.png'
import backgroundImage from '../../img/background4.jpg';


import {
    useBreakpointValue,
} from '@chakra-ui/react';

const Index = () => {

    const mobile = useBreakpointValue({ base: true, md: false });

    return (
        // <div style={{ backgroundColor: '#001529' , overflow: 'hidden' }}>
        <Navbar mobile={mobile}>
            <div style={{ height: '100vh', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#001529', overflow: 'hidden', }}>
                    <img src={logo} alt="Logo" style={{ width: '130px', height: 'auto', 'logo-small': 'logo', verticalAlign: 'middle' }} />
                    {/* <p><br></br></p> */}

                </div>
                {/* <br></br> */}
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
                        overflow: 'hidden',
                        overflowX: 'hidden',
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
                            overflow: 'hidden'
                        }}
                    >
                        <h1 style={{ fontSize: '60px', marginTop: '100px', color: 'black' }}>Grupo CTI</h1>
                        <p style={{ color: 'black', fontWeight: 'bold' }}>Tu aliado Tecnológico</p>
                    </div>

                    <div
                        style={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo semitransparente
                            color: 'white', // Texto blanco para contraste
                            padding: '20px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            overflow: 'hidden'
                        }}
                    >
                        {/* <h1 style={{ fontSize: '50px',marginTop: '100px' }}>Grupo CTI</h1> */}
                        <p style={{ color: '#001529', fontFamily: 'Arial, sans-serif', fontSize: '50px' }}>Bienvenidos</p>
                    </div>
                </div>
            </div>


        </Navbar>




    );
};

export default Index;