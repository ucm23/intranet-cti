import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
// import '../styles/ContentWithImage.css';
import '../styles/descargacv.css';
import { useParams } from 'react-router-dom';




const Descargacv = ({cv}) => {
// const Descargacv = () => {
  const filePath = `/CVs/${cv}`; // Ruta completa del archivo
  return (
    <div>
      {/* <a href="/CV_GSG.pdf" download className="download-button"> */}
      <a href={filePath} download className="download-button">
        
      <button className="floating-button" >
      {/* style={{ marginLeft: '980px',width: '70px',height: '30px' }} */}
        <FontAwesomeIcon icon={faDownload} /> {/* Ícono dentro del botón */}
        CV
      </button>



      </a>
    </div>
  );
};

export default Descargacv;