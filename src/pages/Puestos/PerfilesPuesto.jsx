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
import Verpdf from './Verpdf';


const PerfilesPuesto = () => {

  const mobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  // const { id } = useParams(); // Obtener el id desde la URL
  // const puestoId = parseInt(id); // Convertir el id a número, ya que useParams devuelve strings


  // Filtrar el puesto del archivo JSON por id
  // const puesto = data.find((item) => item.id === puestoId);
  // console.log("Puesto encontrado:", puesto); // Para ver el puesto que se encuentra

  // Si no se encuentra el puesto, muestra un mensaje
  // if (!puesto) {
  //   return <p>Puesto no encontrado</p>;
  // }

  // const detallepuesto = puesto.detallepuesto;
  // console.log("Puesto encontrado:", detallepuesto); 

  return (
    // <div style={{minheight: '100vh',flexdirection: 'column', maxWidth: '100vw',}}>
    <div style={{ flexDirection: 'column', maxWidth: '100vw', overflow: 'hidden', maxHeight: '100vh', }}>
      <Navbar backgroundColor="#001529" />


      {/* <Verpdf detallepuesto={detallepuesto} style={{ marginTop: '0', paddingTop: '0' }}/> */}
      <Verpdf style={{ marginTop: '0', paddingTop: '0' }} />

    </div>



  );
};

export default PerfilesPuesto;


