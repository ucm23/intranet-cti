import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DiagramOrgTree from '../../componentes/DiagramOrgTree';

import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import { MdTouchApp, MdRotate90DegreesCw } from 'react-icons/md';
import { FiMinimize, FiMaximize, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { BsMouse } from 'react-icons/bs';

const Colaborador = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [prevX, setPrevX] = useState(0);
    const [prevY, setPrevY] = useState(0);
    const [scale, setScale] = useState(1);

    const [horizontal, setHorizontal] = useState(false);
    const [collapsable, setCollapsable] = useState(true);
    const [max, setmax] = useState(true);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setPrevX(e.clientX);
        setPrevY(e.clientY);
        if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return;
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        containerRef.current.scrollLeft -= dx;
        containerRef.current.scrollTop -= dy;
        setPrevX(e.clientX);
        setPrevY(e.clientY);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (containerRef.current) containerRef.current.style.cursor = 'grab';
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
        if (containerRef.current) {
            containerRef.current.scrollLeft += dx * (newScale - scale);
            containerRef.current.scrollTop += dy * (newScale - scale);
            containerRef.current.style.overflow = 'scroll';
            containerRef.current.style.cursor = 'all-scroll';
        }
    };

    const divRef = useRef(null);

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            if (divRef.current.requestFullscreen) divRef.current.requestFullscreen();
            else if (divRef.current.mozRequestFullScreen) divRef.current.mozRequestFullScreen();
            else if (divRef.current.webkitRequestFullscreen) divRef.current.webkitRequestFullscreen();
            else if (divRef.current.msRequestFullscreen) divRef.current.msRequestFullscreen();
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
        }
        setmax(!max);
    };

    return (
        <div ref={divRef} style={{ position: 'relative' }}>
            <Box
                position="fixed"
                top="68px"
                right="24px"
                bg="#1e3a5f"
                p="3"
                rounded="lg"
                shadow="lg"
                zIndex={999}
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap="3"
            >
                <Tooltip label="Zoom +/- con la rueda del ratón" placement="top-end" hasArrow>
                    <IconButton
                        icon={<BsMouse size="18px" />}
                        bg="white"
                        color="gray.700"
                        _hover={{ bg: 'gray.100' }}
                        isRound
                        size="sm"
                        aria-label="Zoom con rueda"
                    />
                </Tooltip>
                <Tooltip label="Mantén clic y arrastra para mover la vista" placement="top-start" hasArrow>
                    <IconButton
                        icon={<MdTouchApp size="18px" />}
                        bg="white"
                        color="gray.700"
                        _hover={{ bg: 'gray.100' }}
                        isRound
                        size="sm"
                        aria-label="Arrastrar"
                    />
                </Tooltip>
                <Box w="1px" h="40px" bg="whiteAlpha.400" flexShrink={0} />
                <Tooltip label="Rotar vista" placement="top-end" hasArrow>
                    <IconButton
                        icon={<MdRotate90DegreesCw size="18px" />}
                        bg="white"
                        color="gray.700"
                        _hover={{ bg: 'gray.100' }}
                        isRound
                        onClick={() => setHorizontal(!horizontal)}
                        size="sm"
                        aria-label="Rotar vista"
                    />
                </Tooltip>
                <Tooltip label={!collapsable ? 'Maximizar tarjetas' : 'Minimizar tarjetas'} placement="top-start" hasArrow>
                    <IconButton
                        aria-label="Minimizar o maximizar tarjetas"
                        icon={!collapsable ? <FiMaximize size="18px" /> : <FiMinimize size="18px" />}
                        bg="white"
                        color="gray.700"
                        _hover={{ bg: 'gray.100' }}
                        isRound
                        onClick={() => setCollapsable(!collapsable)}
                        size="sm"
                    />
                </Tooltip>
                <Box w="1px" h="40px" bg="whiteAlpha.400" flexShrink={0} />
                <Tooltip label="Pantalla completa" placement="top-start" hasArrow>
                    <IconButton
                        aria-label="Pantalla completa"
                        icon={max ? <FiMaximize2 size="18px" /> : <FiMinimize2 size="18px" />}
                        bg="white"
                        color="gray.700"
                        _hover={{ bg: 'gray.100' }}
                        isRound
                        onClick={handleFullscreen}
                        size="sm"
                    />
                </Tooltip>
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
                    height: 'calc(100vh - 48px)',
                    overflowY: 'auto',
                    overflowX: 'auto',
                    backgroundColor: '#f8f7f7',
                    position: 'relative',
                    cursor: 'grab',
                }}
            >
                <div
                    ref={contentRef}
                    style={{
                        width: scale === 1 ? 'max-content' : `${2000 * scale}px`,
                        minHeight: scale !== 1 ? `${Math.max(1200, 800 * scale)}px` : undefined,
                        transform: scale !== 1 ? `scale(${scale})` : undefined,
                        transformOrigin: 'top left',
                        position: scale !== 1 ? 'absolute' : 'relative',
                        padding: 20,
                        top: 0,
                        left: 0,
                        boxSizing: 'border-box',
                    }}
                >
                    <DiagramOrgTree xy={horizontal} min={collapsable} />
                </div>
            </div>
        </div>
    );
};

export default Colaborador;
