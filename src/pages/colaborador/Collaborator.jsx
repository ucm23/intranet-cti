import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DiagramOrgTree from '../../componentes/DiagramOrgTree';

import { Box, IconButton, Tooltip, Divider } from "@chakra-ui/react";
import { MdDragIndicator, MdTouchApp, MdSwipe } from "react-icons/md";
import { BsMouse } from "react-icons/bs";
import { MdRotate90DegreesCw } from "react-icons/md";

const Colaborador = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [prevX, setPrevX] = useState(0);
    const [prevY, setPrevY] = useState(0);
    const [scale, setScale] = useState(1);

    const [horizontal, setHorizontal] = useState(false);
    //const [collapsable, setCollapsable] = useState(false);

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
        containerRef.current.scrollLeft -= dx;
        containerRef.current.scrollTop -= dy;
        setPrevX(e.clientX);
        setPrevY(e.clientY);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        containerRef.current.style.cursor = 'grab';
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const zoomIntensity = 0.1;
        let newScale = scale + (e.deltaY > 0 ? -zoomIntensity : zoomIntensity);
        newScale = Math.min(Math.max(0.5, newScale), 2);
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const dx = offsetX / scale;
        const dy = offsetY / scale;
        setScale(newScale);
        containerRef.current.scrollLeft += dx * (newScale - scale);
        containerRef.current.scrollTop += dy * (newScale - scale);
        containerRef.current.style.overflow = 'scroll';
    };

    return (
        <div>
            <Box
                position="absolute"
                top="68px"
                right="42px"
                bg="gray.600"
                p="4"
                rounded="lg"
                shadow="lg"
                zIndex="999"
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap="3"
            >
                <Tooltip label="Zoom +/- (con scroll)" placement='top-end' hasArrow>
                    <IconButton
                        icon={<BsMouse size="24px" />}
                        bg="white"
                        color="gray.700"
                        _hover={{ bg: "gray.100" }}
                        isRound
                        //onClick={handleWheel}
                    />
                </Tooltip>
                <Tooltip label="Mantener clic y arrastrar" placement='top-start' hasArrow>
                    <IconButton
                        icon={<MdTouchApp size="24px" />}
                        bg="white"
                        color="gray.700"
                        _hover={{ bg: "gray.100" }}
                        isRound
                    />
                </Tooltip>
                <div className="bg-gray-300" style={{ width: 1, height: 40 }} />

                <Tooltip label="Rotar vista" placement='top-end' hasArrow>
                    <IconButton
                        icon={<MdRotate90DegreesCw size="24px" />}
                        bg="white"
                        color="gray.700"
                        _hover={{ bg: "gray.100" }}
                        isRound
                        onClick={() => setHorizontal(!horizontal)}
                    />
                </Tooltip>
                {/*<Tooltip label="Mantener clic y arrastrar" placement='top-start' hasArrow>
                    <IconButton
                        aria-label="Mantener clic y arrastrar"
                        icon={<MdTouchApp size="24px" />}
                        bg="white"
                        color="gray.700"
                        _hover={{ bg: "gray.100" }}
                        isRound
                        onClick={() => setCollapsable(!collapsable) }
                    />
                </Tooltip>*/}
            </Box>
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
                    backgroundColor: '#f8f7f7',
                    position: 'relative'
                }}
                className='center-div'
            >


                <div
                    ref={contentRef}
                    style={{
                        width: `${2000 * scale}px`,
                        height: `${500 * scale}px`,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        position: 'absolute',
                        padding: 20,
                        top: 0,
                        left: 0
                    }}
                >
                    <DiagramOrgTree xy={horizontal} /*coll={collapsable}*/ />
                </div>
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