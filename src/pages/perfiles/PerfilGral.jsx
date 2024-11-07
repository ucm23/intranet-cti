/*import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';
import Navbar from '../../componentes/Navbar';
import logo from '../../img/logo-white.png';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useBreakpointValue } from '@chakra-ui/react';
import '../../styles/ContentWithImage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import Linea from '../../componentes/Linea';
import Lineaformacion from '../../componentes/Lineaformaciob';
import Lineaexperiencia from '../../componentes/Lineaexperiencia';
import dato from '../../assets/dato.json';
import '../../styles/perfil.css';
import Descargacv from '../../componentes/Descargacv';


const PerfilGral = () => {
    const mobile = useBreakpointValue({ base: true, md: false });
    const navigate = useNavigate();
    const [size, setSize] = useState('middle');

    const [mostrarComponente, setMostrarComponente] = useState(false);

    const handleClick = () => {
        setMostrarComponente(true); 
    };
    
    const { id, nombreImagen } = useParams();
    const puestoId = parseInt(id); 

    
    const puesto = dato.find((item) => item.id === puestoId);
    console.log("Perfil encontrado:", puesto); 

    
    if (!puesto) {
        return <p>Perfil no encontrado</p>;
    }
    const cv = puesto.cv;
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <div className="container flex flex-row">
                <div className="leftContainer">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <img
                            src={require(`../../imgOrganigrama/${nombreImagen}`)} 
                            alt="Descripción de la imagen"
                            style={{ borderRadius: '0%', cursor: 'pointer', width: '50%', height: '40%', objectFit: 'cover', marginLeft: '45px', marginTop: '10px' }}
                        />
                    </div>
                    <div>
                        <p 
                        className="coloredUnderline" 
                        style={{ textAlign: 'center', color: 'gray', fontSize: '20px', marginLeft: '30px', fontFamily: 'customFont' }}>
                        Datos Personales</p>

                        <p></p>
                        <FontAwesomeIcon icon={faUser} style={{ color: 'white', marginLeft: '7px', height: '15px', width: '15px' }} />
                        <span 
                        style={{ textAlign: 'center', color: 'white', fontSize: '13px', marginLeft: '2px', fontFamily: 'customFont' }}>
                        {puesto.user}
                        </span>

                        <p></p>
                        <FontAwesomeIcon icon={faEnvelope} style={{ color: 'white', marginLeft: '6px', height: '15px', width: '15px' }} />
                        <span style={{ textAlign: 'center', color: 'white', fontSize: '11px', marginLeft: '0x', fontFamily: 'customFont' }}>
                        {puesto.mail}
                        </span>
                        
                        <p></p>
                        <FontAwesomeIcon icon={faPhone} style={{ color: 'white', marginLeft: '7px', height: '15px', width: '15px' }} />
                        <span style={{ textAlign: 'center', color: 'white', fontSize: '13px', marginLeft: '2px', fontFamily: 'Roboto, sans-serif' }}>Telefono 
                        {puesto.telefono}
                        </span>
                       
                       <p></p>
                        <FontAwesomeIcon icon={faHome} style={{ color: 'white', marginLeft: '7px', height: '15px', width: '15px' }} />
                        <span style={{ textAlign: 'center', color: 'white', fontSize: '14px', marginLeft: '10px', fontFamily: 'customFont' }}>Domicilio</span>
                        <p style={{ color: 'white', fontSize: '10px', marginLeft: '10px', fontFamily: 'Roboto, sans-serif' }}>
                        {puesto.domicilio}
                        </p>

                        <p className="coloredUnderline" style={{ textAlign: 'center', color: 'gray', fontSize: '20px', marginLeft: '30px', fontFamily: 'customFont' }}>Competencias</p>
                        <p></p>
                        <p style={{ color: 'white', fontSize: '10px', marginLeft: '10px', marginRight: '10px', fontFamily: 'Roboto, sans-serif', textAlign: 'justify', lineHeight: '1.6', wordSpacing: '-0.03em', hyphens: 'auto' }}>
                            {puesto.competencias.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
                <div className="rightContainer">
                    <br></br>
                    <Linea />
                    <p style={{ color: 'black', fontSize: '13px', marginLeft: '25px', marginRight: '25px', fontFamily: 'Roboto, sans-serif', textAlign: 'justify' }}>
                        {puesto.perfil.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </p>
                    <Lineaformacion />

                    <p style={{ color: 'black', fontSize: '13px', marginLeft: '25px', marginRight: '25px', fontFamily: 'Roboto, sans-serif', textAlign: 'justify' }}>
                        {puesto.formacion.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </p>
                    <p style={{ color: 'black', fontSize: '15px', marginLeft: '30px', fontWeight: 'bold' }}> Capacitación:</p>
                    <p style={{ color: 'black', fontSize: '13px', marginLeft: '25px', marginRight: '25px', fontFamily: 'Roboto, sans-serif', textAlign: 'justify' }}>
                        {puesto.capacitacion.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}

                    </p>

                    <Lineaexperiencia />
                    <p style={{ color: 'black', fontSize: '15px', marginLeft: '30px', fontFamily: 'customFont', fontWeight: 'bold' }}> Grupo CTI:</p>
                    <p style={{ color: 'black', fontSize: '13px', marginLeft: '25px', marginRight: '25px', fontFamily: 'Roboto, sans-serif', textAlign: 'justify' }}>
                        {puesto.experiencia.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </p>
                    <Descargacv cv={cv} />
                </div>
            </div>
        </div>


    );
};

export default PerfilGral;*/

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useBreakpointValue } from '@chakra-ui/react';
import '../../styles/ContentWithImage.css';
//import dato from '../../assets/dato.json';
import dato from '../../assets/cvs.json';
import '../../styles/perfil.css';
import { FaUser, FaBriefcase, FaGraduationCap, FaLanguage, FaCertificate, FaCog, FaEdit, FaTrash, FaPrint, FaEye, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import Descargacv from "../../componentes/Descargacv";

const PerfilGral = () => {
    const { id, nombreImagen } = useParams();

    const [position, setPosition] = useState(null)

    const [loader, setLoader] = useState(false)
    useEffect(() => {
        getInformation()
    }, []);

    const getInformation = () => {
        setPosition(dato.find((item) => item?.id === parseInt(id)));
        setLoader(true)
    }

    const [activeTab, setActiveTab] = useState(0);
    const personalRef = useRef(null);
    const experienceRef = useRef(null);
    const educationRef = useRef(null);
    const skillsRef = useRef(null);

    const handlePrint = (mode) => {
        const link = document.createElement("a");
        if (mode) {
            link.href = `/CVs/${position?.url}`;
            link.download = `CV ${position?.name}.pdf`;
        } else {
            link.href = `/perfiles/${position?.position}`;
            link.download = `Detalles ${position?.post}.pdf`;
        }
        link.click()
    }

    const scrollToSection = (ref, tabName) => {
        setActiveTab(tabName);
        //ref.current.scrollIntoView({ behavior: "smooth" });

        const offsetTop = ref.current?.offsetTop || 0;
        const container = document.getElementById("scrollContainer");

        container.scrollTo({
            top: offsetTop,
            behavior: "smooth",
        });
    };

    return (
        <div className="p-3" style={{ overflowY: 'scroll', height: '-webkit-fill-available', maxHeight: '100vh' }} id="scrollContainer">
            {!loader ? 'Cargando' :
                <div className="max-w-6xl mx-auto bg-white rounded shadow-lg mb-16">
                    <div className="px-4">
                        <section ref={personalRef} className="flex justify-between items-center mb-8 top-0 bg-white z-10 py-4">
                            <h1 className="text-3xl font-bold text-gray-800">{position?.name}</h1>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handlePrint(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    <FaPrint /> Imprimir
                                </button>
                                <button
                                    onClick={() => handlePrint(false)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    <FaPrint /> Especificaciones
                                </button>
                            </div>
                        </section>
                        <div className="flex">
                            <div className="w-54 pr-4 sticky top-0" style={{ height: 500 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="pb-3">
                                    <img
                                        //src={require(`../../imgOrganigrama/${nombreImagen}`)}
                                        src={new URL(`../../imgOrganigrama/${nombreImagen}`, import.meta.url).href}
                                        alt="img"
                                        className="image-img-profile"
                                        style={{ height: 175, width: 175 }}
                                    //style={{ borderRadius: '0%', cursor: 'pointer', width: '50%', height: '40%', objectFit: 'cover', marginLeft: '45px', marginTop: '10px' }}
                                    />
                                </div>
                                <button
                                    onClick={() => scrollToSection(personalRef, 0)}
                                    className={`w-full rounded flex items-center gap-2 py-3 px-4 text-left ${activeTab === 0 ? "bg-blue-50 text-white font-bold border-r-4 border-blue-500" : "text-gray-500 hover:bg-gray-10"}`}
                                >
                                    <FaUser className="text-lg" /> Datos Personales
                                </button>
                                <button
                                    onClick={() => scrollToSection(skillsRef, 1)}
                                    className={`w-full rounded flex items-center gap-2 py-3 px-4 text-left ${activeTab === 1 ? "bg-blue-50 text-white font-bold border-r-4 border-blue-500" : "text-gray-500 hover:bg-gray-10"}`}
                                >
                                    <FaCertificate className="text-lg" /> Competencias
                                </button>
                                <button
                                    onClick={() => scrollToSection(experienceRef, 2)}
                                    className={`w-full rounded flex items-center gap-2 py-3 px-4 text-left ${activeTab === 2 ? "bg-blue-50 text-white font-bold border-r-4 border-blue-500" : "text-gray-500 hover:bg-gray-10"}`}
                                >
                                    <FaBriefcase className="text-lg" /> Experiencia
                                </button>
                                <button
                                    onClick={() => scrollToSection(educationRef, 3)}
                                    className={`w-full rounded flex items-center gap-2 py-3 px-4 text-left ${activeTab === 3 ? "bg-blue-50 text-white font-bold border-r-4 border-blue-500" : "text-gray-500 hover:bg-gray-10"}`}
                                >
                                    <FaGraduationCap className="text-lg" /> Formación
                                </button>
                            </div>

                            <div className="flex-1 border-l pl-5">
                                <section className="mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2 mt-1">Datos Personales</h2>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="gap-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{position?.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaUser className="text-gray-600" />
                                                <span>{position?.profile[0]}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaPhone className="text-gray-600" />
                                                <span>{position?.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 break-all">
                                                <MdAlternateEmail className="text-gray-600" />
                                                <span className="text-blue-600">{position?.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-gray-600" />
                                                <span>{position?.address}</span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-gray-700 text-justify">{position?.profile[1]}</p>
                                    </div>
                                </section>

                                <section ref={skillsRef} className="mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Competencias</h2>
                                    <div className="p-4 pb-1 border rounded">
                                        {position?.competencies.map((cert, index) => (
                                            <div key={`competencies-${index}`} className="flex flex-row p-0 text-justify gap-1">
                                                ✅<p className="text-gray-600">{cert}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section ref={experienceRef} className="mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Experiencia</h2>
                                    <div className="p-4 pb-1 border rounded">
                                        {position?.experience.map((cert, index) => (
                                            <div key={`experience-${index}`} className="flex flex-row p-0 text-justify gap-1">
                                                💼 <p className="text-gray-600"> {cert}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section ref={educationRef} className="mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800 ">Formación</h2>
                                    <div className="p-4 border rounded">
                                        {position?.training.map((cert, index) => (index % 2 == 0) ? <h3 className="font-semibold">{cert}</h3> : <p className="text-gray-600">{cert}</p>)}
                                        {position?.education.length != 0 &&
                                            <div>
                                                <h3 className="font-semibold pt-2">Cursos y Certificaciones</h3>
                                                {position?.education.map((cert, index) => (
                                                    <div key={`education-${index}`} className="flex flex-row p-0 text-justify gap-1">
                                                        🎓 <p className="text-gray-600">{cert}</p>
                                                    </div>
                                                ))}
                                            </div>}

                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default PerfilGral;