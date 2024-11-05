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
import Puesto from '../pages/Puestos/Puesto';


import { useBreakpointValue } from '@chakra-ui/react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Flex } from 'antd';
import HoverText from './HoverText';
import PerfilPuesto from '../pages/Puestos/PerfilPuesto';
import PerfilesPuesto from '../pages/Puestos/PerfilesPuesto';
import PerfilesPuesto1 from '../pages/Puestos/PerfilesPuesto1';

import HoverText1 from './HoverText1';
import ImageWithHoverText from './ImageWithHoverText';
import "../styles/ImageWithHoverText.css";

const userId = 123;
const nombreImagen = 'dev1.png';
const puesto ='ceo.pdf';



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
                    style={{ display: 'flex', width: '85%', height: '65%', objectFit: 'cover', marginLeft: '20px' }}
                // style={{ borderRadius: '40%', cursor: 'pointer', width: '35%', height: '40%', objectFit: 'cover', marginLeft: '20px', display: 'flex', gap: '10px' }}
                />
                <p style={{ fontSize: '14px', fontStyle: 'bold', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {/* <Link to={`/Perfilceo/${1}`}> */}
                        <Link to={`/PerfilGral/${1}/${'CEO.png'}`}>
                            <HoverText1 text="Guillermina Sámano G. |" hoverText="CEO Guillermina Sámano G." />
                        </Link>
                        <Link to={`/PerfilGral/${2}/${'ceo2.png'}`}>
                            <HoverText1 text="Edith Sámano G." hoverText="CEO Edith Sámano G." />
                        </Link>
                    </div>
                    <Link to={`/PerfilesPuesto1/${1}`}>
                        <HoverText text="Dirección General" />
                    </Link>
                </p>
            </Link>
        </div>

    ),

    children: [
        {
            id: '2',
            label: <div className="tree-node" style={{ border: '2px solid #FFD700', borderRadius: '10%', fontSize: '14.5px', height: '80px', fontWeight: 'bold', transition: 'none !important', transform: 'none !important' }}>Jurídico y Seguridad</div>,
            children: [{
                id: '3', label: <div className="tree-node" style={{ borderRadius: '10%', border: '2px solid #FFD700', width: '160px', height: '240px', transition: 'box-shadow 0.3s ease' }}>
                    <br></br>
                    {/* <Link to="/Perfiljuridico"> */}
                    <Link to={`/PerfilGral/${3}/${'juridico1.png'}`}>
                        <div>
                            <ImageWithHoverText
                                imgSrc={juridico1}
                                hoverText="Ver mi Perfil"
                            />
                        </div>
                    </Link>
                    <span style={{ borderRadius: '10%', fontSize: '13px', fontWeight: 'bold' }}>Luis Manuel Alfaro Rivera
                        <br></br>
                        <Link to={`/PerfilesPuesto1/${2}`}>
                            <HoverText text="Lic. Jurídico" />
                        </Link>

                    </span></div>
            },
            ],
        },

        {
            id: '4',
            label: <div className="tree-node" style={{ border: '2px solid #e25a28', fontSize: '14px', height: '80px', fontWeight: 'bold' }}>Desarrollo Humano</div>,
            children: [{
                id: '5', label: <div className="tree-node" style={{ borderRadius: '10%', border: '2px solid #e25a28', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                    <br></br>
                    {/* <Link to="/Perfilhumano"> */}
                    <Link to={`/PerfilGral/${4}/${'RH1.png'}`}>
                        <div>
                            <ImageWithHoverText
                                imgSrc={rh1}
                                hoverText="Ver mi Perfil"
                            />
                        </div>
                    </Link>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Marisela Ladrón de G.
                        <br></br>
                        <Link to={`/PerfilesPuesto1/${3}`}>
                            <HoverText text="Lic. Recursos Humanos" />
                        </Link>
                    </span></div>
            },
            ],
        },
        {
            id: '6',
            label: <div className="tree-node" style={{ border: '2px solid brown', fontSize: '14px', height: '80px', fontWeight: 'bold' }}>Calidad</div>,
            children: [{
                id: '7', label: <div className="tree-node" style={{ borderRadius: '10%', border: '2px solid brown', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                    <br></br>
                    <Link to={`/PerfilGral/${5}/${'CALIDAD1.png'}`}>
                    {/* <Link to="/Perfilcalidad"> */}
                        <div>
                            <ImageWithHoverText
                                imgSrc={calidad1}
                                hoverText="Ver mi Perfil"
                            />
                        </div>
                    </Link>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>José Luis Rangel
                        <br></br>
                        <Link to={`/PerfilesPuesto1/${4}`}>
                            <HoverText text="Lic. Calidad" />
                        </Link>
                    </span></div>
            },
            ],
        },

        {
            id: '8',
            label: <div className="tree-node" style={{ border: '2px solid green', fontSize: '14px', width: '190px', height: '80px', fontWeight: 'bold' }}>Contabilidad y Finanzas</div>,
            children: [{
                id: '9', label: <div className="tree-node" style={{ borderRadius: '10%', border: '2px solid green', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                    <br></br>
                    <Link to={`/PerfilGral/${6}/${'conta2.png'}`}>
                    {/* <Link to="/Perfilconta"> */}
                        <div>
                            <ImageWithHoverText
                                imgSrc={conta2}
                                hoverText="Ver mi Perfil"
                            />
                        </div>
                    </Link>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Carlos Fco. Sainz R.
                        <br></br>
                        <Link to={`/PerfilesPuesto1/${5}`}>
                            <HoverText text="Lic. Contable" />
                        </Link>
                    </span></div>
            }],
        },
        {
            id: '10',
            label: <div className="tree-node" style={{ border: '2px solid blue', fontSize: '14px', width: '170px', height: '80px', fontWeight: 'bold' }}>Admon y Cobranza</div>,
            children: [{
                id: '11', label: <div className="tree-node" style={{ borderRadius: '10%', border: '2px solid blue', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                    <br></br>
                    {/* <Link to="/Perfilconta1"> */}
                    <Link to={`/PerfilGral/${7}/${'conta1.png'}`}>
                        <div>
                            <ImageWithHoverText
                                imgSrc={conta1}
                                hoverText="Ver mi Perfil"
                            />
                        </div>
                    </Link>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Ashley M. Huerta Arias
                        <br></br>
                        <Link to={`/PerfilesPuesto1/${6}`}>
                            <HoverText text="Lic. Admon y Marketing" />
                        </Link>
                    </span></div>
            }],
        },

        {
            id: '12',
            label: <div className="tree-node" style={{ border: '2px solid #FF00FF', fontSize: '18px', height: '80px', fontWeight: 'bold' }}>SAP</div>,
            children: [
                {
                    id: '13', label: <div className="tree-node" style={{ borderRadius: '10%', border: '2px solid #FF00FF', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to={`/PerfilGral/${8}/${'SAP1.png'}`}>
                        {/* <Link to="/Perfilsap1"> */}
                            <div>
                                <ImageWithHoverText
                                    imgSrc={SAP1}
                                    hoverText="Ver mi Perfil"
                                />
                            </div>
                        </Link>
                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Norma Barbosa
                            <br></br>
                            {/* <Link to={`/PerfilPuesto/${7}`}> */}
                            {/* <Link to={`/PerfilesPuesto/${GIntegracion.pdf}`}> */}
                            {/* <Link to={"/PerfilesPuesto"}> */}
                           
                            <Link to={`/PerfilesPuesto1/${7}`}>
                                <HoverText text="Consultor SAP MM/FI/SD" />
                            </Link>
                        </span></div>

                },

                {
                    id: '14', label: <div className="tree-node" style={{ borderRadius: '10%', border: '2px solid #FF00FF', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to={`/PerfilGral/${9}/${'SAP2.png'}`}>
                        {/* <Link to="/Perfilsap2"> */}
                            <div>
                                <ImageWithHoverText
                                    imgSrc={SAP2}
                                    hoverText="Ver mi Perfil"

                                />
                            </div>
                        </Link>
                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Francisco J. Mejía R.
                            <br></br>
                            <Link to={`/PerfilesPuesto1/${8}`}>
                                <HoverText text="Consultor SAP-ABAP" />
                            </Link>
                        </span></div>
                },

            ],
        },

        {
            id: '15',
            label: <div className="tree-node" style={{ border: '2px solid #001529', fontSize: '13.5px', height: '80px', width: '190px', fontWeight: 'bold' }}>Desarrollo de Aplicaciones
                <br /> Web, Móvil y C-S </div>,
            children: [
                {
                    id: '16', label: <div className="tree-node" style={{ borderRadius: '10%', border: '2px solid #001529', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to={`/PerfilGral/${10}/${'DEV1.png'}`}>
                        {/* <Link to="/Perfildev1"> */}
                            <div>
                                <ImageWithHoverText
                                    imgSrc={dev1}
                                    hoverText="Ver mi Perfil"
                                // style={{ marginTop: '-35px', border: '2px solid #ccc', borderRadius: '50%', cursor: 'pointer', width: '90%', height: '75%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                />
                            </div>
                        </Link>
                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Gilberto López A.
                            <br></br>
                            <Link to={`/PerfilesPuesto1/${9}`}>
                                <HoverText text="Ing. Dev. Web Senior" />
                            </Link>
                        </span></div>,

                    children: [

                        {
                            id: '17', label: <div className="tree-node" style={{ border: '2px solid #001529', borderRadius: '10%', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                                <br></br>
                                <Link to={`/PerfilGral/${11}/${'becaria1.png'}`}>
                                {/* <Link to="/PerfilBeca1"> */}
                                    <ImageWithHoverText
                                        imgSrc={becaria1}
                                        hoverText="Ver mi Perfil"
                                        style={{ marginTop: '-35px', border: '2px solid #ccc', borderRadius: '50%', cursor: 'pointer', width: '90%', height: '75%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                    />
                                </Link>
                                <br></br>
                                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Ana Cristina Hernández B.
                                    <br></br>
                                    <Link to={`/PerfilesPuesto1/${12}`}>
                                        <HoverText text="Becaria Dev. Web" />
                                    </Link>
                                </span></div>,
                        },
                    ],
                },

                {
                    id: '18', label: <div className="tree-node" style={{ borderRadius: '10%', border: '2px solid #001529', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to={`/PerfilGral/${12}/${'DEV2.png'}`}>
                        {/* <Link to="/Perfildev2"> */}
                            <div>
                                <ImageWithHoverText
                                    imgSrc={dev2}
                                    hoverText="Ver mi Perfil"
                                />
                            </div>
                        </Link>
                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Ulises Cano M.
                            <br></br>
                            <Link to={`/PerfilesPuesto1/${10}`}>
                                <HoverText text="Ing. Dev. Móvil Senior" />
                            </Link>
                        </span></div>,

                    // children: [

                    //     {
                    //         id: '19', label: <div className="tree-node" style={{ border: '2px solid #001529', borderRadius: '10%', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                    //             <br></br>
                    //             <Link to="/PerfilBeca2">
                    //                 <ImageWithHoverText
                    //                     imgSrc={becario1}
                    //                     hoverText="Ver mi Perfil"
                    //                     style={{ marginTop: '-35px', border: '2px solid #ccc', borderRadius: '50%', cursor: 'pointer', width: '90%', height: '75%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                    //                 />
                    //             </Link>
                    //             <br></br>
                    //             <span style={{ fontSize: '12px', fontWeight: 'bold' }}> Brayan Emmanuel Olmos S.
                    //                 <br></br>
                    //                 <Link to={`/PerfilesPuesto1/${12}`}>
                    //                     <HoverText text="Dev. Web Junior" />
                    //                 </Link>
                    //             </span></div>
                    //     },
                    // ],
                },
                {
                    id: '20', label: <div className="tree-node" style={{ borderRadius: '10%', border: '2px solid #001529', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to={`/PerfilGral/${14}/${'DEV3X.png'}`}>
                        {/* <Link to="/Perfildev3"> */}
                            <div>
                                <ImageWithHoverText
                                    imgSrc={dev3x}
                                    hoverText="Ver mi Perfil"
                                // style={{ marginTop: '-35px', border: '2px solid #ccc', borderRadius: '50%', cursor: 'pointer', width: '90%', height: '75%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                />
                            </div>
                        </Link>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}> Luz Adriana Castillo B.
                            <br></br>
                            <Link to={`/PerfilesPuesto1/${11}`}>
                                <HoverText text="Ing. Dev.C-S Senior" />
                            </Link>
                        </span></div>,
                    children: [

                        {
                            id: '21', label: <div className="tree-node" style={{ border: '2px solid #001529', borderRadius: '10%', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                                <br></br>
                                <Link to={`/PerfilGral/${15}/${'DEV3X.png'}`}>
                                {/* <Link to="/PerfilBeca3"> */}
                                    <ImageWithHoverText
                                        imgSrc={becaria2}
                                        hoverText="Ver mi Perfil"
                                        style={{ marginTop: '-35px', border: '2px solid #ccc', borderRadius: '50%', cursor: 'pointer', width: '90%', height: '75%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                    />
                                </Link>
                                <br></br>
                                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>  Antonia Cortés Pérez
                                    <br></br>
                                    <Link to={`/PerfilesPuesto1/${12}`}>
                                        <HoverText text="Becaria Dev. Web" />
                                    </Link>
                                </span></div>
                        },
                    ],
                },
            ],
        },

        {
            id: '21',
            label: <div className="tree-node" style={{ border: '2px solid #00FF00', fontSize: '14.5px', height: '80px', width: '190px', fontWeight: 'bold' }}>Victum AI</div>,
            children: [
                {
                    id: '22', label: <div className="tree-node" style={{ borderRadius: '10%', border: '2px solid #00FF00', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to={`/PerfilGral/${16}/${'IA1.png'}`}>
                        {/* <Link to="/PerfilIA1"> */}
                            <div>
                                <ImageWithHoverText
                                    imgSrc={IA1}
                                    hoverText="Ver mi Perfil"
                                // style={{ marginTop: '-35px', border: '2px solid #ccc', borderRadius: '50%', cursor: 'pointer', width: '90%', height: '75%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                />
                            </div>
                        </Link>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>  Pablo Tlaxcoapan
                            <br></br>
                            <Link to={`/PerfilesPuesto1/${13}`}>
                                <HoverText text="Ing. Dev. IA" />
                            </Link>
                        </span></div>

                },

                {
                    id: '23', label: <div className="tree-node" style={{ borderRadius: '10%', border: '2px solid #00FF00', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to={`/PerfilGral/${17}/${'IA2.png'}`}>
                        {/* <Link to="/PerfilIA2"> */}
                            <div>
                                <ImageWithHoverText
                                    imgSrc={IA2}
                                    hoverText="Ver mi Perfil"
                                // style={{ marginTop: '-35px', border: '2px solid #ccc', borderRadius: '50%', cursor: 'pointer', width: '90%', height: '75%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                />
                            </div>
                        </Link>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>  Josue Tlaxcoapan
                            <br></br>
                            <Link to={`/PerfilesPuesto1/${13}`}>
                                <HoverText text="Ing. Dev. IA" />
                            </Link>
                        </span></div>
                },

            ],
        },

        {
            id: '24',
            label: <div className="tree-node" style={{ border: '2px solid #1890ff', fontSize: '14px', height: '80px', width: '230px', fontWeight: 'bold' }}>Infraestructura, CiberSeguridad
                <br></br>y Mesa de Ayuda</div>,
            children: [
                {
                    id: '25', label: <div className="tree-node" style={{ borderRadius: '10%', border: '2px solid #1890ff', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to={`/PerfilGral/${18}/${'infra1.png'}`}>
                        {/* <Link to="/PerfilInfra"> */}
                            <div>
                                <ImageWithHoverText
                                    imgSrc={infra1}
                                    hoverText="Ver mi Perfil"
                                // style={{ marginTop: '-35px', border: '2px solid #ccc', borderRadius: '50%', cursor: 'pointer', width: '90%', height: '75%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                />
                            </div>
                        </Link>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Heber Argumedo
                            <br></br>
                            <Link to={`/PerfilesPuesto1/${14}`}>
                                <HoverText text="Ing. Infraestructura e ITS" />
                            </Link>

                        </span>
                    </div>,

                    children: [

                        // {
                        //     id: '26', label: <div className="tree-node" style={{ border: '2px solid #1890ff', borderRadius: '10%', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                        //         <br></br>
                        //         <Link to={`/PerfilGral/${19}/${'MESA1.png'}`}>
                        //         {/* <Link to="/Perfilmesa1"> */}
                        //             <div>
                        //                 <ImageWithHoverText
                        //                     imgSrc={mesa1}
                        //                     hoverText="Ver mi Perfil"
                        //                 // style={{ marginTop: '-35px', border: '2px solid #ccc', borderRadius: '50%', cursor: 'pointer', width: '90%', height: '75%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                        //                 />
                        //             </div>
                        //         </Link>
                        //         <span style={{ fontSize: '12px', fontWeight: 'bold' }}>  Juan José Gil López
                        //             <br></br>
                        //             <Link to={`/PerfilesPuesto1/${15}`}>
                        //                 <HoverText text="Ing. Soporte Técnico" />
                        //             </Link>
                        //         </span></div>
                        // },
                        {
                            id: '27', label: <div className="tree-node" style={{ border: '2px solid #1890ff', borderRadius: '10%', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                                <br></br>
                                <Link to={`/PerfilGral/${20}/${'curso1.png'}`}>
                                {/* <Link to="/PerfilCapacitacion"> */}
                                    <div>
                                        <ImageWithHoverText
                                            imgSrc={curso1}
                                            hoverText="Ver mi Perfil"
                                        // style={{ marginTop: '-35px', border: '2px solid #ccc', borderRadius: '50%', cursor: 'pointer', width: '90%', height: '75%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                                    </div>
                                </Link>
                                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>  Luis Alberto Ruiz Aguilar
                                    <br></br>
                                    <Link to={`/PerfilesPuesto1/${16}`}>
                                        <HoverText text="Ing. Capacitación" />
                                    </Link>

                                </span></div>
                        },

                    ],
                },
            ],
        },
        {
            id: '28',
            label: <div className="tree-node" style={{ border: '2px solid #A9A9A9', fontSize: '14px', height: '80px', width: '180px', fontWeight: 'bold' }}>ITS, Peaje y
                <br></br>Telepeaje</div>,
            children: [
                {
                    id: '29', label: <div className="tree-node" style={{ border: '2px solid #A9A9A9', borderRadius: '10%', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                        <br></br>
                        <Link to={`/PerfilGral/${21}/${'ITS2.png'}`}>
                        {/* <Link to="/Perfilits1"> */}
                            <div>
                                <ImageWithHoverText
                                    imgSrc={ITS2}
                                    hoverText="Ver mi Perfil"
                                // style={{ marginTop: '-35px', border: '2px solid #ccc', borderRadius: '50%', cursor: 'pointer', width: '90%', height: '75%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                />
                            </div>
                        </Link>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}> Victor Ricardo Mojica Leines
                            <br></br>
                            <Link to={`/PerfilesPuesto1/${17}`}>
                                <HoverText text="Ing. ITS y Peaje" />
                            </Link>
                        </span>
                    </div>,
                    children: [

                        {
                            id: '30', label: <div className="tree-node" style={{ border: '2px solid #A9A9A9', borderRadius: '10%', width: '160px', height: '240px', transition: 'none !important', transform: 'none !important' }}>
                                <br></br>
                                <Link to={`/PerfilGral/${22}/${'ITS1.png'}`}>
                                {/* <Link to="/Perfilits2"> */}
                                    <div>
                                        <ImageWithHoverText
                                            imgSrc={ITS1}
                                            hoverText="Ver mi Perfil"
                                        // style={{ marginTop: '-35px', border: '2px solid #ccc', borderRadius: '50%', cursor: 'pointer', width: '90%', height: '75%', objectFit: 'cover', marginLeft: '10px', transition: 'none !important', transform: 'none !important' }}
                                        />
                                    </div>
                                </Link>
                                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>  Julio César Castillo Z.
                                    <br></br>
                                    <Link to={`/PerfilesPuesto1/${18}`}>
                                        <HoverText text="Ing. Integración" />
                                    </Link>
                                </span></div>
                        },

                    ],
                },
            ],
        },

    ],
};

const Organigrama2 = () => {
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
                    horizontal={false} // Mostrar el organigrama de forma vertical (false) u horizontal (true)
                    collapsible // Permitir colapsar nodos
                />
            </div>
        </div>
        // </Navbar>

    );
};


export default Organigrama2;