import React from 'react';
import OrgTree from 'react-org-tree';
import { useNavigate } from 'react-router-dom';
import '../styles/arbol.css';
import CEO from '../imgOrganigrama/CEO.png';
import ceo2 from '../imgOrganigrama/ceo2.png';
import dev1 from '../imgOrganigrama/DEV1.png';
import dev3x from '../imgOrganigrama/DEV3X.png';
import dev2 from '../imgOrganigrama/DEV2.png';
import conta1 from '../imgOrganigrama/conta1.png';
import conta2 from '../imgOrganigrama/conta2.png';
import calidad1 from '../imgOrganigrama/CALIDAD1.png';
import rh1 from '../imgOrganigrama/RH1.png';
import becaria1 from '../imgOrganigrama/becaria1.png';
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
import UserProfileCard from '../components/UserProfileCard';


const DiagramOrgTree = ({ xy }) => {
    const navigate = useNavigate();
    const handleDetails = (id, profile) => navigate(profile ? `/PerfilGral/${id}/${profile}` : `/perfilesPuesto1/${id}`);

    const myTreeData = {
        id: 1,
        label: <div className='flex flex-row gap-1'>
            <UserProfileCard
                color="#E5C200"
                name="Guillermina Sámano G."
                puesto="Dirección General"
                urlPhoto={CEO}
                onClickCV={() => handleDetails(1)}
                onClickProfile={() => handleDetails(1, 'CEO.png')}
            />
            <UserProfileCard
                color="#E5C200"
                name="Edith Sámano Gaspar"
                puesto="Dirección General"
                urlPhoto={ceo2}
                onClickCV={() => handleDetails(2)}
                onClickProfile={() => handleDetails(2, 'ceo2.png')}
            />
        </div>,
        children: [
            {
                id: 3,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#E5C200' }}>Jurídico y Seguridad</div>,
                children: [
                    {
                        id: 3,
                        label: <UserProfileCard
                            color="#E5C200"
                            name="Luis Manuel Alfaro Rivera"
                            puesto="Lic. Jurídico"
                            urlPhoto={juridico1}
                            onClickCV={() => handleDetails(2)}
                            onClickProfile={() => handleDetails(3, 'juridico1.png')}
                        />
                    },
                ],
            },
            {
                id: 4,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#c24d23' }}>Desarrollo Humano</div>,
                children: [{
                    id: 4,
                    label: <UserProfileCard
                        color="#C24D23"
                        name="Marisela Ladrón de G."
                        puesto="Lic. Recursos Humanos"
                        urlPhoto={rh1}
                        onClickCV={() => handleDetails(4)}
                        onClickProfile={() => handleDetails(4, 'RH1.png')}
                    />
                },
                ],
            },
            {
                id: 5,
                label: <div className='childrens-label-title' style={{ backgroundColor: 'brown' }}>Calidad</div>,
                children: [{
                    id: 5,
                    label: <UserProfileCard
                        color="#4E3B31"
                        name="José Luis Rangel"
                        puesto="Lic. Calidad"
                        urlPhoto={calidad1}
                        onClickCV={() => handleDetails(5)}
                        onClickProfile={() => handleDetails(5, 'CALIDAD1.png')}
                    />
                },
                ],
            },
            {
                id: 6,
                label: <div className='childrens-label-title' style={{ backgroundColor: 'green' }}>Contabilidad y Finanzas</div>,
                children: [{
                    id: 6,
                    label: <UserProfileCard
                        color="#4A8D5A"
                        name="Carlos Fco. Sainz R."
                        puesto="Lic. Contable"
                        urlPhoto={conta2}
                        onClickCV={() => handleDetails(6)}
                        onClickProfile={() => handleDetails(6, 'conta2.png')}
                    />
                }],
            },
            {
                id: 7,
                label: <div className='childrens-label-title' style={{ backgroundColor: 'blue' }} >Admon y Cobranza</div>,
                children: [{
                    id: 7,
                    label: <UserProfileCard
                        color="#4682B4"
                        name="Ashley M. Huerta Arias"
                        puesto="Administración y Marketing"
                        urlPhoto={conta1}
                        onClickCV={() => handleDetails(7)}
                        onClickProfile={() => handleDetails(7, 'conta1.png')}
                    />
                }],
            },
            {
                id: 8,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#3C005E' }}>SAP</div>,
                children: [
                    {
                        id: 8,
                        label: <UserProfileCard
                            color="#3C005E"
                            name="Norma Barbosa"
                            puesto="Consultor SAP MM/FI/SD"
                            urlPhoto={SAP1}
                            onClickCV={() => handleDetails(8)}
                            onClickProfile={() => handleDetails(8, 'SAP1.png')}
                        />
                    },
                    {
                        id: 9,
                        label: <UserProfileCard
                            color="#3C005E"
                            name="Francisco J. Mejía R.a"
                            puesto="Consultor Consultor SAP-ABAP"
                            urlPhoto={SAP2}
                            onClickCV={() => handleDetails(9)}
                            onClickProfile={() => handleDetails(9, 'SAP2.png')}
                        />
                    },
                ],
            },
            {
                id: 10,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#001529' }}>Desarrollo de Aplicaciones Web, Móvil y C-S </div>,
                children: [
                    {
                        id: 10,
                        label: <UserProfileCard
                            color="#001529"
                            name="Gilberto López Antonio"
                            puesto="Dev. Web Senior"
                            urlPhoto={dev1}
                            onClickCV={() => handleDetails(10)}
                            onClickProfile={() => handleDetails(10, 'DEV1.png')}
                        />,
                        children: [

                            {
                                id: 11,
                                label: <UserProfileCard
                                    color="#001529"
                                    name="Ana Cristina Hernández B."
                                    puesto="Becaria Dev. Web"
                                    urlPhoto={becaria1}
                                    onClickCV={() => handleDetails(11)}
                                    onClickProfile={() => handleDetails(11, 'becaria1.png')}
                                />
                                ,
                            },
                        ],
                    },

                    {
                        id: 12,
                        label: <UserProfileCard
                            color="#001529"
                            name="Ulises Cano Martínez"
                            puesto="Dev. Web"
                            urlPhoto={dev2}
                            onClickCV={() => handleDetails(12)}
                            onClickProfile={() => handleDetails(12, 'DEV2.png')}
                        />,

                    },
                    {
                        id: 13,
                        label: <UserProfileCard
                            color="#001529"
                            name="Luz Adriana Castillo B."
                            puesto="Ing. Dev.C-S Senior"
                            urlPhoto={dev3x}
                            onClickCV={() => handleDetails(13)}
                            onClickProfile={() => handleDetails(13, 'DEV3X.png')}
                        />,
                        children: [
                            {
                                id: 14,
                                label: <UserProfileCard
                                    color="#001529"
                                    name="Antonia Cortés Pérez"
                                    puesto="Becaria Dev. Web"
                                    urlPhoto={becaria2}
                                    onClickCV={() => handleDetails(14)}
                                    onClickProfile={() => handleDetails(14, 'becaria2.png')}
                                />
                            },
                        ],
                    },
                ],
            },
            {
                id: 15,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#4CAF50' }}>Victum AI</div>,
                children: [
                    {
                        id: 15,
                        label: <UserProfileCard
                            color="#4CAF50"
                            name="Pablo Tlaxcoapan"
                            puesto="Ing. Dev. IA"
                            urlPhoto={IA1}
                            onClickCV={() => handleDetails(15)}
                            onClickProfile={() => handleDetails(15, 'IA1.png')}
                        />
                    },
                    {
                        id: 16,
                        label: <UserProfileCard
                            color="#4CAF50"
                            name="Josue Tlaxcoapan"
                            puesto="Ing. Dev. IA"
                            urlPhoto={IA2}
                            onClickCV={() => handleDetails(16)}
                            onClickProfile={() => handleDetails(16, 'IA2.png')}
                        />
                    },
                ],
            },
            {
                id: 17,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#1890ff' }}>Infraestructura, CiberSeguridad <br />y Mesa de Ayuda</div>,
                children: [
                    {
                        id: 17,
                        label: <UserProfileCard
                            color="#1890ff"
                            name="Heber Argumedo"
                            puesto="Ing. Infraestructura e ITS"
                            urlPhoto={infra1}
                            onClickCV={() => handleDetails(17)}
                            onClickProfile={() => handleDetails(17, 'infra1.png')}
                        />,
                        children: [
                            {
                                id: 18,
                                label: <UserProfileCard
                                    color="#1890ff"
                                    name="Luis Alberto Ruiz Aguilar"
                                    puesto="Ing. Capacitación"
                                    urlPhoto={curso1}
                                    onClickCV={() => handleDetails(18)}
                                    onClickProfile={() => handleDetails(18, 'curso1.png')}
                                />
                            },

                        ],
                    },
                ],
            },
            {
                id: 19,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#A9A9A9' }}>ITS, Peaje y <br /> Telepeaje</div>,
                children: [
                    {
                        id: 19,
                        label: <UserProfileCard
                            color="#A9A9A9"
                            name="Victor Ricardo Mojica"
                            puesto="Ing. ITS y Peaje"
                            urlPhoto={ITS2}
                            onClickCV={() => handleDetails(19)}
                            onClickProfile={() => handleDetails(19, 'ITS2.png')}
                        />,
                        children: [

                            {
                                id: 20,
                                label: <UserProfileCard
                                    color="#A9A9A9"
                                    name="Julio César Castillo Z."
                                    puesto="Ing. Integración"
                                    urlPhoto={ITS1}
                                    onClickCV={() => handleDetails(20)}
                                    onClickProfile={() => handleDetails(20, 'ITS1.png')}
                                />
                            },

                        ],
                    },
                ],
            },
        ],
    };

    return (
        <div className="org-tree-container">
           
            <OrgTree
                data={myTreeData}
                horizontal={xy}
                collapsable={false}
                expandAll={false}
            />
        </div>
    );
};

export default DiagramOrgTree;