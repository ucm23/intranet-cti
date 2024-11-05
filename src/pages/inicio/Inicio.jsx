import * as React from 'react';
import Navbar from '../../componentes/Navbar';
import logo from '../../img/logo-white.png';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../img/background.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useBreakpointValue } from '@chakra-ui/react'
import Organigrama2 from '../../componentes/Organigrama2';
import Footer from '../../componentes/Footer';
import '../../styles/estilo.css';
import UserProvider from '../../componentes/UserProfile';




const Inicio = () => {
    const mobile = useBreakpointValue({ base: true, md: false });

    return (
        <div style={{ overflow: 'hidden', width: '100%' }}> {/* Asegura que el contenedor no tenga desbordamiento */}
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}> {/* Corrige el nombre de las propiedades CSS */}
                {/* <div style={{minheight: '100vh',flexdirection: 'column'}}> */}
                <Navbar backgroundColor="#001529" />

                <div style={{ overflow: 'hidden', width: '100%', margin: '0' }}> {/* Evita el desbordamiento horizontal */}
                
                    <div
                        style={{
                            position: 'relative',
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center', // Centra la imagen
                            backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
                            height: '86.7vh', // Altura del contenedor (100% de la ventana del navegador)
                            display: 'flex', // Flexbox para centrar contenido
                            justifyContent: 'center', // Centra horizontalmente
                            alignItems: 'center', // Centra verticalmente
                            color: 'white', // Cambia el color del texto
                            width: '100%', // Asegura que el ancho no cause desbordamiento
                            margin: '0',   // Elimina márgenes que puedan causar desbordamiento


                        }}

                    >
                       
                        <div
                            style={{
                                position: 'absolute',
                                top: '15%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo semitransparente
                                color: 'white', // Texto blanco para contraste
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center',
                            }}
                        >
                            <h1 style={{ fontSize: '50px', marginTop: '105px', textAlign: 'center' }}>Grupo CTI</h1>
                            <p style={{ textAlign: 'center' }}>Tu aliado Tecnológico</p>
                        </div>

                        <div
                            style={{
                                position: 'absolute',
                                top: '55%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
                                color: 'white', // Texto blanco para contraste
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                alignItems: 'center',
                                display: 'flex', // Añadimos flexbox para centrar el contenido
                                flexDirection: 'column', // Mantén el contenido en columna
                                justifyContent: 'center', // Centra verticalmente

                            }}
                        >
                            {/* <h1 style={{ fontSize: '50px',marginTop: '100px' }}>Grupo CTI</h1> */}
                            <p style={{ color: 'white', fontFamily: 'Arial, sans-serif', fontSize: '17px', textAlign: 'justify' }}>Somos un equipo multidisciplinario con más de 20 años de experiencia en servicios de consultoría especializada,
                                Creamos relaciones de confianza y profesionalismo que nos permite pensar como un solo equipo entre nuestros
                                colaboradores, clientes, socios, mayoristas y fabricantes para contribuir en la innovación y desarrollo tecnológico.</p>
                        </div>

                    </div>
                </div>

            </div>
            {/* <Footer /> */}
        </div>

    );
}


export default Inicio;



