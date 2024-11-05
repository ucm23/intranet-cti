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
import Verpdf from './Verpdf';


const PerfilesPuesto1 = () => {

    const mobile = useBreakpointValue({ base: true, md: false });
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    const { id } = useParams(); // Obtener el id desde la URL
    console.log("ID obtenido desde la URL:", id); // Verificar si el id es correcto
    //   const puestoId = parseInt(id); // Convertir el id a número, ya que useParams devuelve strings
    const puestoId = parseInt(id) || 0;


    // Filtrar el puesto del archivo JSON por id
    const puesto = data.find((item) => item.id === puestoId);
    console.log("Puesto encontrado:", puesto); // Para ver el puesto que se encuentra
    console.log("Puesto encontrado:", puesto);

    // Si no se encuentra el puesto, muestra un mensaje
    if (!puesto) {
        return <p>Puesto no encontrado</p>;
    }

    //   const detallepuesto = "puesto.detallepuesto";
    const detallepuesto = puesto.detallepuesto || "GIntegracion.pdf";
    console.log("Detalle puesto encontrado:", detallepuesto);


    return (
        <div style={{ flexDirection: 'column', maxWidth: '100vw', overflow: 'hidden', maxHeight: '100vh', }}>
            <div style={{
                height: '100vh',
                width: '100%',
            }}>
                <iframe
                    src={`/perfiles/${detallepuesto}`}
                    width="100%"
                    height="100%"
                    title="PDF Viewer"
                ></iframe>
            </div>
        </div>



    );
};

export default PerfilesPuesto1;


