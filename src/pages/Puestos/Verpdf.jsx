import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';



const Verpdf = ({ detallepuesto }) => {
    console.log("Puesto encontrado:", detallepuesto);

    // Construcción correcta de la ruta del PDF usando template literals
    const rutapdf = `/perfiles/${detallepuesto}`;
    console.log("detalle:", rutapdf);
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            // height:'auto',
            width: '100%',
            overflow: 'hidden',
            padding: 0, // Asegúrate de que no haya relleno
            margin: 0 // Asegúrate de que no haya margen
        }}>
            <iframe
                src={rutapdf}

                // src="./perfiles/GIntegracion.pdf"
                width="100%" // Usar 100% para el iframe
                height="100%"
                style={{
                    border: 'none', // Sin bordes
                    padding: 0, // Sin relleno
                    margin: 0, // Sin margen
                    display: 'block' // Eliminar espacio extra
                }}
                title="PDF Viewer"
            ></iframe>
        </div>
    );
};

export default Verpdf;