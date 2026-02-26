import React from 'react';
import OrgTree from 'react-org-tree';
import { useNavigate } from 'react-router-dom';
import '../styles/arbol.css';
import CEO from '../imgOrganigrama/CEO.png';
import ceo2 from '../imgOrganigrama/ceo2.png';
import dev1 from '../imgOrganigrama/DEV1.png';
import DEV5 from '../imgOrganigrama/DEV5.jpg';
import dev2 from '../imgOrganigrama/DEV2.png';
import conta1 from '../imgOrganigrama/conta1.png';
import conta2 from '../imgOrganigrama/conta2.png';
import calidad1 from '../imgOrganigrama/CALIDAD1.png';
import rh1 from '../imgOrganigrama/RH1.png';
import MESA4 from '../imgOrganigrama/MESA4.jpeg';
import juridico1 from '../imgOrganigrama/juridico1.png';
import SAP1 from '../imgOrganigrama/SAP1.png';
import SOPORTE from '../imgOrganigrama/SOPORTE.jpg';
import SAP2 from '../imgOrganigrama/SAP2.png';
import IA1 from '../imgOrganigrama/IA1.png';
import IA2 from '../imgOrganigrama/IA2.png';
import infra1 from '../imgOrganigrama/infra1.png';
import curso1 from '../imgOrganigrama/curso1.png';
import ITS1 from '../imgOrganigrama/ITS1.png';
import ITS2 from '../imgOrganigrama/ITS2.png';
import MESA1M from '../imgOrganigrama/MESA1M.jpg';
import MESA2 from '../imgOrganigrama/MESA2.jpg';
import MESA3 from '../imgOrganigrama/MESA3.jpg';
import DEV3M from '../imgOrganigrama/DEV3M.jpg';
import DEV4 from '../imgOrganigrama/DEV4.jpg';
import DCOMERCIAL2 from '../imgOrganigrama/DCOMERCIAL2.jpg';
import LICITACIONES1 from '../imgOrganigrama/LICITACIONES1.jpg';
import DCOMERCIAL1 from '../imgOrganigrama/DCOMERCIAL1.png';
import UserProfileCard from '../components/UserProfileCard';


const DiagramOrgTree = ({ xy, min }) => {
    const navigate = useNavigate();
    const handleDetails = (id, profile) => navigate(profile ? `/PerfilGral/${id}/${profile}` : `/perfilesPuesto1/${id}`);

    const myTreeData = {
        id: 1,
        label: <div className={`flex flex-${(!xy && min) ? 'row' : 'col'} gap-1`}>
            <UserProfileCard
                color="#E5C200"
                name="Guillermina Sámano G."
                puesto="Dirección General"
                urlPhoto={CEO}
                onClickCV={() => handleDetails(1)}
                onClickProfile={() => handleDetails(1, 'CEO.png')}
                min={min}
            />
            <UserProfileCard
                color="#E5C200"
                name="Edith Sámano Gaspar"
                puesto="Dirección General"
                urlPhoto={ceo2}
                onClickCV={() => handleDetails(2)}
                onClickProfile={() => handleDetails(2, 'ceo2.png')}
                min={min}
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
                            min={min}
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
                        min={min}
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
                        color="brown"
                        name="José Luis Rangel"
                        puesto="Lic. Calidad"
                        urlPhoto={calidad1}
                        onClickCV={() => handleDetails(5)}
                        onClickProfile={() => handleDetails(5, 'CALIDAD1.png')}
                        min={min}
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
                        min={min}
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
                        min={min}
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
                            min={min}
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
                            min={min}
                        />
                    },
                ],
            },
            {
                id: 10,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#1800ad' }}>Desarrollo de Aplicaciones Web, Móvil y C-S</div>,
                children: [
                    {
                        id: 10,
                        label: <UserProfileCard
                            color="#1800ad"
                            name="Gilberto López Antonio"
                            puesto="Dev. Web Senior"
                            urlPhoto={dev1}
                            onClickCV={() => handleDetails(10)}
                            onClickProfile={() => handleDetails(10, 'DEV1.png')}
                            min={min}
                        />,
                    },

                    {
                        id: 12,
                        label: <UserProfileCard
                            color="#1800ad"
                            name="Ulises Cano Martínez"
                            puesto="Dev. Web"
                            urlPhoto={dev2}
                            onClickCV={() => handleDetails(12)}
                            onClickProfile={() => handleDetails(12, 'DEV2.png')}
                            min={min}
                        />,

                    },
                    {
                        id: 13,
                        label: <UserProfileCard
                            color="#1800ad"
                            name="María José Carvajal Carrera"
                            puesto="Dev. Web"
                            urlPhoto={DEV3M}
                            onClickCV={() => handleDetails(13)}
                            onClickProfile={() => handleDetails(13, 'DEV3M.jpg')}
                            min={min}
                        />
                    },
                    {
                        id: 21,
                        label: <UserProfileCard
                            color="#1800ad"
                            name="Sergio Cano Martínez"
                            puesto="Dev. Web"
                            urlPhoto={DEV4}
                            onClickCV={() => handleDetails(21)}
                            onClickProfile={() => handleDetails(21, 'DEV4.jpg')}
                            min={min}
                        />
                    },
                    {
                        id: 22,
                        label: <UserProfileCard
                            color="#1800ad"
                            name="Rafael Cano Martínez"
                            puesto="Dev. Web"
                            urlPhoto={DEV5}
                            onClickCV={() => handleDetails(22)}
                            onClickProfile={() => handleDetails(22, 'DEV5.jpg')}
                            min={min}
                        />
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
                            min={min}
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
                            min={min}
                        />
                    },
                ],
            },
            {
                id: 17,
                //label: <div className='childrens-label-title' style={{ backgroundColor: '#1890ff' }}>Infraestructura, CiberSeguridad {min && <br />}y Mesa de Ayuda</div>,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#1890ff' }}>Infraestructura {min && <br />} y CiberSeguridad</div>,
                children: [
                    {
                        id: 17,
                        label: <UserProfileCard
                            color="#1890ff"
                            name="Heber Argumedo"
                            puesto="Ing. CiberSeguridad"
                            urlPhoto={infra1}
                            onClickCV={() => handleDetails(17)}
                            onClickProfile={() => handleDetails(17, 'infra1.png')}
                            min={min}
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
                                    min={min}
                                />
                            },

                        ],
                    },
                ],
            },
            {
                id: 19,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#A9A9A9' }}>ITS, Peaje y {min && <br />} Telepeaje</div>,
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
                            min={min}
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
                                    min={min}
                                />
                            },

                        ],
                    },
                ],
            },
            {
                id: 23,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#4c19b0' }}>Mesa de Ayuda {min && <br />} y Soporte</div>,
                children: [
                    {
                        id: 23,
                        label: <UserProfileCard
                            color="#4c19b0"
                            name="Jose Manuel Bravo Valencia"
                            puesto="Gerente de Mesa de Ayuda"
                            urlPhoto={MESA1M}
                            onClickCV={() => handleDetails(23)}
                            onClickProfile={() => handleDetails(23, 'MESA1M.jpg')}
                            min={min}
                        />
                    },
                    {
                        id: 24,
                        label: <UserProfileCard
                            color="#4c19b0"
                            name="Abigail Gabriela Vilchis M."
                            puesto="Técnico Mesa de Ayuda"
                            urlPhoto={MESA2}
                            onClickCV={() => handleDetails(24)}
                            onClickProfile={() => handleDetails(24, 'MESA2.jpg')}
                            min={min}
                        />
                    },
                    {
                        id: 25,
                        label: <UserProfileCard
                            color="#4c19b0"
                            name="Nicolás Bravo Vilchis "
                            puesto="Técnico Mesa de Ayuda"
                            urlPhoto={MESA3}
                            onClickCV={() => handleDetails(25)}
                            onClickProfile={() => handleDetails(25, 'MESA3.jpg')}
                            min={min}
                        />
                    },
                    {
                        id: 29,
                        label: <UserProfileCard
                            color="#4c19b0"
                            name="Lilia Marquéz Samano"
                            puesto="Técnico Mesa de Ayuda"
                            urlPhoto={MESA4}
                            onClickCV={() => handleDetails(29)}
                            onClickProfile={() => handleDetails(29, 'MESA4.jpeg')}
                            min={min}
                        />
                    },
                ],
            },
            {
                id: 30,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#E67E22' }}>Soporte en sitio</div>,
                children: [
                    {
                        id: 30,
                        label: <UserProfileCard
                            color="#E67E22"
                            name="Jorge Luis Olmos"
                            puesto="Soporte en sitio"
                            urlPhoto={SOPORTE}
                            onClickCV={() => handleDetails(30)}
                            onClickProfile={() => handleDetails(30, 'SOPORTE.jpg')}
                            min={min}
                        />
                    },
                ],
            },
            {
                id: 26,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#8B4513' }}>Licitaciones</div>,
                children: [
                    {
                        id: 26,
                        label: <UserProfileCard
                            color="#8B4513"
                            name="Lidia Millán Benítez"
                            puesto="Lic. Licitaciones"
                            urlPhoto={LICITACIONES1}
                            onClickCV={() => handleDetails(26)}
                            onClickProfile={() => handleDetails(26, 'LICITACIONES1.jpg')}
                            min={min}
                        />
                    },
                ],
            },
            {
                id: 27,
                label: <div className='childrens-label-title' style={{ backgroundColor: '#2E7D32' }}>Dirección Comercial</div>,
                children: [
                    {
                        id: 27,
                        label: <UserProfileCard
                            color="#2E7D32"
                            name="Héctor Julián Rabadán Tapia"
                            puesto="Dirección Comercial"
                            urlPhoto={DCOMERCIAL1}
                            onClickCV={() => handleDetails(27)}
                            onClickProfile={() => handleDetails(27, 'DCOMERCIAL1.png')}
                            min={min}
                        />
                    },
                    {
                        id: 28,
                        label: <UserProfileCard
                            color="#2E7D32"
                            name="Jaime García Ángel"
                            puesto="Dirección Comercial"
                            urlPhoto={DCOMERCIAL2}
                            onClickCV={() => handleDetails(28)}
                            onClickProfile={() => handleDetails(28, 'DCOMERCIAL2.jpg')}
                            min={min}
                        />
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
                expandAll={true}
            />
        </div>
    );
};

export default DiagramOrgTree;