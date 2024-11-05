import React from 'react';
import OrgTree from 'react-org-tree';
// import './styles.css'; // Importa tus estilos
import '../styles/arbol.css';
import imageceo from '../imgOrganigrama/CEO.png';
import CEO1 from '../imgOrganigrama/CEO1.png';
import dev1 from '../imgOrganigrama/DEV1.png';
import dev3 from '../imgOrganigrama/DEV3.png';
import dev3x from '../imgOrganigrama/DEV3X.png';
import dev2 from '../imgOrganigrama/DEV2.png';
import mesa1 from '../imgOrganigrama/MESA1.png';
import conta1 from '../imgOrganigrama/conta1.png';
import conta2 from '../imgOrganigrama/conta2.png';
import calidad1 from '../imgOrganigrama/CALIDAD1.png';
import rh1 from '../imgOrganigrama/RH1.png';
import becaria1 from '../imgOrganigrama/becaria1.png';
import becario1 from '../imgOrganigrama/becario1.png';
import juridico1 from '../imgOrganigrama/juridico1.png';
import becaria2 from '../imgOrganigrama/becaria2.png';
import SAP1 from '../imgOrganigrama/SAP1.png';
import SAP2 from '../imgOrganigrama/SAP2.png';
import IA1 from '../imgOrganigrama/IA1.png';
import IA2 from '../imgOrganigrama/IA2.png';
import infra1 from '../imgOrganigrama/infra1.png';
import curso1 from '../imgOrganigrama/curso1.png';
import ITS1 from '../imgOrganigrama/ITS1.png';
import ITS2 from '../imgOrganigrama/ITS2.png';


import { useBreakpointValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const myTreeData = {
    id: '1',
    label: (
        <div className="org-chart-node" style={{ borderRadius: '10%', fontSize: '14px', height: '225px', fontWeight: 'bold', width: '320px', transition: 'none !important', transform: 'none !important' }} >
            {/* style={{ overflow: 'hidden', overflowX: 'hidden' }}> */}
            {/* <div className="node-container"> */}
            <br></br>
            <Link to="/Perfilceo"> {/* El `to` es la ruta a la que deseas navegar */}
                <img
                    src={CEO1}
                    alt="CEO"
                    style={{ display: 'flex', width: '80%', height: '65%', display: 'flex', objectFit: 'cover', marginLeft: '20px' }}
                // style={{ borderRadius: '40%', cursor: 'pointer', width: '35%', height: '40%', objectFit: 'cover', marginLeft: '20px', display: 'flex', gap: '10px' }}
                />
                <p style={{ fontSize: '14px', fontStyle: 'bold', fontWeight: 'bold' }}>

                    <Link to="/Perfilceo"> Guillermina Sámano G.  </Link>
                    /
                    <Link to="/Perfilceo1"> Edith Sámano G.</Link>
                    <br></br> Dirección General
                </p>

            </Link>
        </div>

    ),

    children: [
        {
            id: '2',
            label: <div className="tree-node" style={{ borderRadius: '10%', fontSize: '14.5px', height: '80px', fontWeight: 'bold', transition: 'none !important', transform: 'none !important' }}>Jurídico y Seguridad</div>,
            children: [{
                id: '3', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'box-shadow 0.3s ease' }}>
                    <br></br>
                    <Link to="/Perfiljuridico">
                        <img
                            // className='node-images'
                            src={juridico1} // URL de la imagen del nodo
                            alt="CEO"
                            style={{marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                        />
                    </Link>
                    <span style={{ borderRadius: '10%', fontSize: '13px', fontWeight: 'bold' }}>Luis Manuel Alfaro R.
                        <br></br>
                        Lic. Jurídico
                    </span></div>
            },
            ],
        },

        {
            id: '4',
            label: <div className="tree-node" style={{ fontSize: '14px', height: '80px', fontWeight: 'bold' }}>Desarrollo Humano</div>,
            children: [{
                id: '5', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                    <br></br>
                    <Link to="/Perfilhumano">
                        <img
                            // className='node__image'
                            src={rh1} // URL de la imagen del nodo
                            alt="CEO"
                            style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                            />
                    </Link>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Marisela Ladrón de G.
                        <br></br>
                        Lic. Recursos Humanos
                    </span></div>
            },
            ],
        },
        {
            id: '6',
            label: <div className="tree-node" style={{ fontSize: '14px', height: '80px', fontWeight: 'bold' }}>Calidad</div>,
            children: [{
                id: '7', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                    <br></br>
                    <Link to="/Perfilcalidad">
                        <img
                            // className='node__image'
                            src={calidad1} // URL de la imagen del nodo
                            alt="CEO"
                            style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                            />
                    </Link>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>José Luis Rangel
                        <br></br>
                        Lic. Calidad
                    </span></div>
            },
            ],
        },

        {
            id: '8',
            label: <div className="tree-node" style={{ fontSize: '14px', width: '190px', height: '80px', fontWeight: 'bold' }}>Contabilidad y Finanzas</div>,
            children: [{
                id: '9', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                    <br></br>
                    <Link to="/Perfilconta">
                        <img
                            // className='node__image'
                            src={conta2} // URL de la imagen del nodo
                            alt="CEO"
                            style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                    </Link>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Carlos Fco. Sainz R.
                        <br></br>
                        Lic. Contable
                    </span></div>
            }],
        },
        {
            id: '10',
            label: <div className="tree-node" style={{ fontSize: '14px', width: '170px', height: '80px', fontWeight: 'bold' }}>Admon y Cobranza</div>,
            children: [{
                id: '11', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                    <br></br>
                    <Link to="/Perfilconta1">
                        <img
                            // className='node__image'
                            src={conta1} // URL de la imagen del nodo
                            alt="CEO"
                            style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                    </Link>
                    <span style={{ fontSize: '13.5px', fontWeight: 'bold' }}>Ashley M. Huerta Arias
                        <br></br>
                        Lic. Admon
                    </span></div>
            }],
        },

        {
            id: '12',
            label: <div className="tree-node" style={{ fontSize: '18px', height: '80px', fontWeight: 'bold' }}>SAP</div>,
            children: [
                {
                    id: '13', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to="/Perfilsap1">
                            <img
                                // className='node__image'
                                src={SAP1} // URL de la imagen del nodo
                                alt="DEV"
                                style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                        </Link>
                        <span style={{ fontSize: '13.5px', fontWeight: 'bold' }}>Norma Barbosa
                            <br></br>
                            Especialista SAP
                        </span>
                    </div>,

                },

                {
                    id: '14', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to="/Perfilsap2">
                            <img
                                // className='node__image'
                                src={SAP2} // URL de la imagen del nodo
                                alt="DEV"
                                style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                        </Link>
                        <span style={{ fontSize: '13.5px', fontWeight: 'bold' }}>Frank Mejía
                            <br></br>
                            Especialista SAP
                        </span></div>
                },

            ],
        },

        {
            id: '15',
            label: <div className="tree-node" style={{ fontSize: '13.5px', height: '80px', width: '190px', fontWeight: 'bold' }}>Desarrollo de Aplicaciones
                <br /> Web, Móvil y C-S </div>,
            children: [
                {
                    id: '16', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to="/Perfildev1">
                            <img
                                // className='node__image'
                                src={dev1} // URL de la imagen del nodo
                                alt="DEV"
                                style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                        </Link>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Gilberto López
                            <br></br>
                            Ing. Desarrollo
                        </span>
                    </div>,
                    children: [

                        {
                            id: '17', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                                {/* <br></br> */}
                                <Link to="/PerfilBeca1">
                                    <img
                                        className='node__image'
                                        src={becaria1} // URL de la imagen del nodo
                                        alt="DEV"
                                        style={{ marginTop: '5px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '75%', height: '70%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                                </Link>
                                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Ana Cristina Hernández B.
                                    <br></br>
                                    Becario
                                </span></div>
                        },
                    ],
                },

                {
                    id: '18', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to="/Perfildev2">
                            <img
                                // className='node__image'
                                src={dev2} // URL de la imagen del nodo
                                alt="DEV"
                                style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                        </Link>
                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Ulises Cano M.
                            <br></br>
                            Ing. Desarrollo
                        </span> </div>,
                    children: [

                        {
                            id: '19', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                                <br></br>
                                <Link to="/PerfilBeca2">
                                    <img
                                        // className='node__image'
                                        src={becario1} // URL de la imagen del nodo
                                        alt="DEV"
                                        style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                                </Link>
                                <span style={{ fontSize: '12px', fontWeight: 'bold' }}> Brayan Emmanuel Olmos S.
                                    <br></br>
                                    Becario
                                </span></div>
                        },
                    ],
                },
                {
                    id: '20', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to="/Perfildev3">
                            <img
                                // className='node__image'
                                src={dev3x} // URL de la imagen del nodo
                                alt="CEO"
                                style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                        </Link>
                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Luz Adriana Castillo B.
                            <br></br>
                            Ing. Desarrollo
                        </span></div>,
                    children: [

                        {
                            id: '21', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                                <br></br>
                                <Link to="/PerfilBeca3">
                                    <img
                                        // className='node__image'
                                        src={becaria2} // URL de la imagen del nodo
                                        alt="DEV"
                                        style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                                </Link>
                                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>  Antonia Cortés Pérez
                                    <br></br>
                                    Becario
                                </span></div>
                        },
                    ],
                },
            ],
        },

        {
            id: '21',
            label: <div className="tree-node" style={{ fontSize: '14.5px', height: '80px', width: '190px', fontWeight: 'bold' }}>Victum AI</div>,
            children: [
                {
                    id: '22', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to="/PerfilIA1">
                            <img
                                // className='node__image'
                                src={IA1} // URL de la imagen del nodo
                                alt="DEV"
                                style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                />
                        </Link>
                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Pablo Tlaxcoapan
                            <br></br>
                            Ing. IA
                        </span>
                    </div>,

                },

                {
                    id: '23', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to="/PerfilIA2">
                            <img
                                // className='node__image'
                                src={IA2} // URL de la imagen del nodo
                                alt="DEV"
                                style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                />
                        </Link>
                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Josue Tlaxcoapan
                            <br></br>
                            Ing. IA
                        </span></div>
                },

            ],
        },

        {
            id: '24',
            label: <div className="tree-node" style={{ fontSize: '14px', height: '80px', width: '230px', fontWeight: 'bold' }}>Infraestructura, CiberSeguridad
                <br></br>y Mesa de Ayuda</div>,
            children: [
                {
                    id: '25', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                        {/* id: '25', label: <div className="org-chart-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}></div> */}
                        <br></br>
                        <Link to="/PerfilInfra">
                            <img className='node__image'
                                src={infra1} // URL de la imagen del nodo
                                alt="DEV"
                                style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                        </Link>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Heber Argumedo
                            <br></br>
                            Ing. Infraestructura
                        </span>
                    </div>,
                    children: [

                        {
                            id: '26', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                                <br></br>
                                <Link to="/Perfilmesa1">
                                    <img className='node__image'
                                        src={mesa1} // URL de la imagen del nodo
                                        alt="DEV"
                                        style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                                </Link>
                                <span style={{ fontSize: '12px', fontWeight: 'bold' }}> Juan José Gil López
                                    <br></br>
                                    Ing. Soporte
                                </span></div>
                        },
                        {
                            id: '27', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                                <br></br>
                                <Link to="/PerfilCapacitacion">
                                    <img className='node__image'
                                        src={curso1} // URL de la imagen del nodo
                                        alt="DEV"
                                        style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                                </Link>
                                <span style={{ fontSize: '12px', fontWeight: 'bold' }}> Luis Alberto Ruiz Aguilar
                                    <br></br>
                                    Capacitación
                                </span></div>
                        },

                    ],
                },
            ],
        },
        {
            id: '28',
            label: <div className="tree-node" style={{ fontSize: '14px', height: '80px', width: '180px', fontWeight: 'bold' }}>ITS, Peaje y
                <br></br>Telepeaje</div>,
            children: [
                {
                    id: '29', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to="/Perfilits1">
                            <img className='node__image'
                                src={ITS2} // URL de la imagen del nodo
                                alt="DEV"
                                style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                        </Link>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}> Victor Ricardo Mojica Leines
                            <br></br>
                            Ing. ITS
                        </span>
                    </div>,
                    children: [

                        {
                            id: '30', label: <div className="tree-node" style={{ borderRadius: '10%', width: '160px', height: '220px', transition: 'none !important', transform: 'none !important' }}>
                                <br></br>
                                <Link to="/Perfilits2">
                                    <img className='node__image'
                                        src={ITS1} // URL de la imagen del nodo
                                        alt="DEV"
                                        style={{ marginTop: '-30px', border: '2px solid #ccc',borderRadius: '50%', cursor: 'pointer', width: '85%', height: '80%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                                </Link>
                                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>  Julio César Castillo Z.
                                    <br></br>
                                    Ing. Integración
                                </span></div>
                        },

                    ],
                },
            ],
        },

    ],
};

const ArbolOrganigrama = () => {
    const mobile = useBreakpointValue({ base: true, md: false });
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };
    return (
        // <Navbar mobile={mobile}>
        <div className="org-tree-container">
            <div style={{ width: '600px', height: '450px' }}>
                <OrgTree
                    data={myTreeData}  // Los datos del organigrama
                    horizontal={true} // Mostrar el organigrama de forma vertical (false) u horizontal (true)
                    //collapsible // Permitir colapsar nodos
                />
            </div>
        </div>
        // </Navbar>

    );
};


export default ArbolOrganigrama;