import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/estilo.css';
import NavBarLanding from '../../components/NavBarLanding';
import {
    Box,
    IconButton,
    useBreakpointValue,
    Stack,
    Heading,
    Container,
    Button,
} from '@chakra-ui/react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import { MdCall } from "react-icons/md"

import { FaInstagram, FaTwitter, FaYoutube, FaFacebook, FaLinkedin } from 'react-icons/fa'
import { RiArrowDownSLine, } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";
import { PiArrowRightThin } from "react-icons/pi";
import ModalCenter from '../../components/ModalCenter';


const Index = () => {
    const mobile = useBreakpointValue({ base: true, md: false });
    const [modalShow, setModalShow] = useState(false);
    const handleModal = () => setModalShow(!modalShow)

    return (
        <div style={{ width: '100%' }}>
            <NavBarLanding modalShow={modalShow} handleModal={handleModal}>
                <Box
                    position={'relative'}
                    height={'98vh'}
                    width={'full'}
                    overflow={'hidden'}
                >
                    <Box>
                        <div className="image-container_">
                            <div
                                className="image-part"
                                style={{
                                    objectFit: 'cover',
                                    backgroundColor: "#03296a99",
                                    backgroundImage: `url('/img/background.jpg')`,
                                    //transition: 'opacity 1s ease-in-out',
                                    backgroundBlendMode: "soft-light",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundAttachment: 'fixed'
                                }}
                            />
                        </div>
                        <Box
                            className='box-text'
                            zIndex={10}
                            height='98vh'
                            width='100%'
                            position="relative"
                            top={mobile ? '-25rem' : '-23rem'}
                            style={{
                                top: "-50vh",
                                display: "flex",
                            }}
                        >
                            <Stack
                                w={'full'}
                                maxW={'100%'}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <h2 className="text-shadow" style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', }}>
                                    {'Software de uso compartido sencillo y colaboración sin problemas'}
                                </h2>
                                <p className="text-shadow" style={{ maxWidth: '65%', textAlign: 'center', margin: '15px 0px' }}>
                                    {`Comparte y administra contenido, conocimientos y aplicaciones para impulsar el trabajo en equipo,
                                    encontrar información rápidamente y colaborar con todos los miembros de la organización sin problemas.`}
                                </p>

                                <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: 6 }}>
                                    <Button
                                        colorScheme="blue"
                                        bg={'orange'}
                                        rounded={5}
                                        color="white"
                                        onClick={handleModal}
                                        rightIcon={<div />}
                                        leftIcon={<div />}
                                        fontWeight={'bold'}
                                        title="Ver video de Introducción"
                                        className='cursor-crosshair'
                                    >
                                        Introducción
                                    </Button>
                                </div>
                                <div className="animated-accordion">
                                    <RiArrowDownSLine className='text-3xl' color="white" />
                                </div>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </NavBarLanding>
            <ModalCenter
                show={modalShow}
                onHide={handleModal}
                mobile={mobile}
            />
        </div>
    );
}


export default Index;



