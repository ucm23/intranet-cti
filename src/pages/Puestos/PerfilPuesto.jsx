import React from 'react';
import Navbar from '../../componentes/Navbar';
import { useBreakpointValue } from '@chakra-ui/react';
import logo from '../../img/logo-white.png'
import backgroundImage from '../../img/fondoperfil.png';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import data from './data.json'; // Importar los datos desde el archivo JSON
import data from '../../assets/data.json';
import '../../styles/perfiles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
// import Descargadev2 from '../../componentesdescarga/Descargadev2';


const PerfilPuesto = () => {

  const mobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const { id } = useParams(); // Obtener el id desde la URL
  const puestoId = parseInt(id); // Convertir el id a número, ya que useParams devuelve strings


  // Filtrar el puesto del archivo JSON por id
  const puesto = data.find((item) => item.id === puestoId);
  console.log("Puesto encontrado:", puesto); // Para ver el puesto que se encuentra

  // Si no se encuentra el puesto, muestra un mensaje
  if (!puesto) {
    return <p>Puesto no encontrado</p>;
  }

  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImage})`, // Ruta a la imagen de fondo
    // backgroundSize: 'cover', // Para que cubra todo el contenedor
    backgroundPosition: 'center', // Centrar la imagen
    // backgroundPosition: 'center 50px', // Mover la imagen 50px hacia abajo
    height: '86.5vh', // Para que ocupe toda la altura de la pantalla
    color: '#fff', // Cambiar el color del texto si es necesario
    overflow: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    //  justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    maxWidth: '100vw',

  };


  return (
    // <div style={{minheight: '100vh',flexdirection: 'column', maxWidth: '100vw',}}>
    <div style={{ flexDirection: 'column', maxWidth: '100vw', overflow: 'hidden', maxHeight: '100vh', }}>

      <div style={backgroundImageStyle}>
        <div style={{ textAlign: 'center', width: '100%' }}> {/* Contenedor adicional */}
          {/* <h1 className="title">Puesto</h1> */}
          <div style={{
            textAlign: 'center', // Alinear el texto a la izquierda
            display: 'flex', // Usar flexbox para centrar el contenido
            flexDirection: 'column', // Mantén el contenido en columna
            justifyContent: 'center', // Centra verticalmente
            alignItems: 'center', // Alinear el contenido a la izquierda

          }}>
            <h2 className="title">{puesto.titulo}</h2>
            <p></p>
          </div>


          {/* <div style={{ textAlign: 'left', width: '100%', marginLeft: '30px' }}> */}

          <div style={{
            position: 'absolute',
            top: '60%',
            left: '45%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            // Fondo semitransparente
            color: 'white', // Texto blanco para contraste
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'left', // Alinear el texto a la izquierda
            display: 'flex', // Usar flexbox para centrar el contenido
            flexDirection: 'column', // Mantén el contenido en columna
            justifyContent: 'center', // Centra verticalmente
            alignItems: 'flex-start', // Alinear el contenido a la izquierda
            width: '75%', // Ajusta el ancho según sea necesario
            maxHeight: '450px', // Puedes ajustar la altura máxima
            overflow: 'hidden', // No permite scroll
          }}>

            <h2 className="titlex">Educación/Evaluación</h2>
            <p className="cuerpo">
              {puesto.educacion.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p> {/* Texto con saltos de línea */}
            <h2 className="titlex">Experiencia</h2>
            <p className="cuerpo">
              {puesto.experiencia.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p> {/* Texto con saltos de línea */}
            <h2 className="titlex">Capacitación/Entrenamiento</h2>
            <p className="cuerpo">
              {puesto.capacitacion.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}

            </p> {/* Texto con saltos de línea */}

          </div>
        </div>
      </div>

    </div>
  );
};

export default PerfilPuesto;


