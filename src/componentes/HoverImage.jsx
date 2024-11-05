import React from "react";
// import "./HoverText.css"; // Archivo CSS para los estilos
import "../styles/HoverImage.css"

const HoverImage = ({ imageSrc, altText, hoverText }) => {
  return (
    <div className="image-container">
      <img src={imageSrc} alt={altText} className="image" />
      <div className="hover-text">{HoverImage}</div>
    </div>
  );
};

export default HoverImage;