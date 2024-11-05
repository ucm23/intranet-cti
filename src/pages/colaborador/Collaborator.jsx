import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DiagramOrgTree from '../../componentes/DiagramOrgTree';

const Colaborador = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [prevX, setPrevX] = useState(0);
    const [prevY, setPrevY] = useState(0);
    const [scale, setScale] = useState(1);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setPrevX(e.clientX);
        setPrevY(e.clientY);
        containerRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;

        // Desplaza el contenedor en función del movimiento del mouse
        containerRef.current.scrollLeft -= dx;
        containerRef.current.scrollTop -= dy;

        // Actualiza las coordenadas previas
        setPrevX(e.clientX);
        setPrevY(e.clientY);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        containerRef.current.style.cursor = 'grab';
    };

    const handleWheel = (e) => {
        e.preventDefault();

        const zoomIntensity = 0.1;  // Ajusta la intensidad del zoom
        let newScale = scale + (e.deltaY > 0 ? -zoomIntensity : zoomIntensity);

        // Limita el zoom entre 0.5x y 3x
        newScale = Math.min(Math.max(0.5, newScale), 3);

        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        // Calcular la posición del cursor relativa al contenido y ajustar la escala
        const dx = offsetX / scale;
        const dy = offsetY / scale;

        setScale(newScale);

        // Ajustar la posición del scroll para centrar el zoom en el cursor
        containerRef.current.scrollLeft += dx * (newScale - scale);
        containerRef.current.scrollTop += dy * (newScale - scale);

        // Asegurar que el contenedor pueda llegar al final del contenido
        containerRef.current.style.overflow = 'scroll';
    };

    return (
        <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            style={{
                width: '100%',
                height: '96vh',
                overflow: 'hidden',
                cursor: 'grab',
                backgroundColor: 'white',
                position: 'relative'
            }}
            className='center-div'
        >
            <div
                ref={contentRef}
                style={{
                    width: `${2000 * scale}px`,
                    height: `${1600 * scale}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    position: 'absolute',
                    padding: 30,
                    top: 0,
                    left: 0
                }}
            >
                <DiagramOrgTree />
            </div>
        </div>
    );
    /*return (
        <div
            className='overView'
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
                overflow: 'hidden',
                cursor: 'grab', // Cursor en forma de mano
                backgroundColor: '#f0f0f0',
            }}
        >
            <h1 style={{ textAlign: 'center', color: 'black', fontSize: '22px', marginLeft: '10px' }}>Colaboradores de Grupo CTI</h1>
            
        </div>
    );*/
}

export default Colaborador