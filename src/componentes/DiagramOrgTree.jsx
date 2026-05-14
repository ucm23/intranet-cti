import React from 'react';
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
import CV_ITS4 from '../imgOrganigrama/CV_ITS4.jpg';
import CV_DC1 from '../imgOrganigrama/CV_DC1.png';
import LICITACIONES1 from '../imgOrganigrama/LICITACIONES1.jpg';
import DCOMERCIAL1 from '../imgOrganigrama/DCOMERCIAL1.png';
import CV_PMO1 from '../imgOrganigrama/CV_PMO1.jpg';
import UserProfileCard from '../components/UserProfileCard';

const PMO_GREEN = '#2E7D32';
const PMO_GREEN_CARD = '#388E3C';
const JUR_PURPLE = '#6A1B9A';
const HIER_BLUE = '#1565C0';
const CTI_NAVY = '#0B3D91';

const DiagramOrgTree = ({ xy: _xy, min }) => {
    const navigate = useNavigate();
    const handleDetails = (id, profile) => navigate(profile ? `/PerfilGral/${id}/${profile}` : `/perfilesPuesto1/${id}`);

    return (
        <div className="org-tree-container holding-org">
            <div className="holding-org__main">
                <section className="holding-org__dg">
                    <div className="holding-org__dg-inner flex flex-col gap-1" style={{ width: '100%', alignItems: 'center' }}>
                        <div
                            className={`holding-org__headed-slice ${min ? 'holding-org__headed-slice--dg-row' : 'holding-org__headed-slice--dg-col'}`}
                        >
                            <div
                                className="childrens-label-title holding-org__dg-banner"
                                style={{ backgroundColor: '#1800ad', textAlign: 'center', boxSizing: 'border-box' }}
                            >
                                Dirección General (Holding) — Incluye planeación estratégica
                            </div>
                            <div className={`holding-org__dg-cards${min ? ' holding-org__dg-cards--row' : ' holding-org__dg-cards--col'}`}>
                            <div className={`holding-org__dg-card-wrap${min ? '' : ' holding-org__dg-card-wrap--compact'}`}>
                                <UserProfileCard
                                    className="holding-org__dg-profile-card"
                                    color="#1800ad"
                                    name="Guillermina Sámano G."
                                    puesto="Directora general"
                                    urlPhoto={CEO}
                                    onClickCV={() => handleDetails(1)}
                                    onClickProfile={() => handleDetails(1, 'CEO.png')}
                                    min={min}
                                />
                            </div>
                            <div className={`holding-org__dg-card-wrap${min ? '' : ' holding-org__dg-card-wrap--compact'}`}>
                                <UserProfileCard
                                    className="holding-org__dg-profile-card"
                                    color="#1800ad"
                                    name="Edith Sámano Gaspar"
                                    puesto="Asistente de dirección"
                                    urlPhoto={ceo2}
                                    onClickCV={() => handleDetails(2)}
                                    onClickProfile={() => handleDetails(2, 'ceo2.png')}
                                    min={min}
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="holding-org__corporate-band">
                <div className="holding-org__corporate">
                    <section className="holding-org__panel holding-org__panel--pmo">
                        <div
                            className="org-tree-panel org-tree-panel--pmo flex flex-col gap-1 holding-org__panel-inner"
                            style={{ alignItems: 'center', boxSizing: 'border-box', padding: '4px 10px 8px' }}
                        >
                            <div className="holding-org__headed-slice holding-org__headed-slice--cards-cols-3">
                                <div className="childrens-label-title holding-org__title-pmo" style={{ backgroundColor: PMO_GREEN, textAlign: 'center', boxSizing: 'border-box' }}>
                                    PMO — Control y supervisión de proyectos
                                </div>
                                <div className="org-tree-exec-cards-grid holding-org__pmo-grid-3">
                                <UserProfileCard
                                    color={PMO_GREEN_CARD}
                                    name="Osiris Ricardo Torres"
                                    puesto="PMO – Control y Supervisión de Proyectos"
                                    urlPhoto={CV_PMO1}
                                    onClickCV={() => handleDetails(32)}
                                    onClickProfile={() => handleDetails(32, 'CV_PMO1.jpg')}
                                    min={min}
                                />
                                <UserProfileCard
                                    color={PMO_GREEN_CARD}
                                    name="Carlos Arvizu"
                                    puesto="Supervisor de proyectos"
                                    urlPhoto={CV_ITS4}
                                    onClickCV={() => handleDetails(31)}
                                    onClickProfile={() => handleDetails(31, 'CV_ITS4.jpg')}
                                    min={min}
                                />
                                <UserProfileCard
                                    color={PMO_GREEN_CARD}
                                    name="José Luis Rangel"
                                    puesto="Calidad"
                                    urlPhoto={calidad1}
                                    onClickCV={() => handleDetails(5)}
                                    onClickProfile={() => handleDetails(5, 'CALIDAD1.png')}
                                    min={min}
                                />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="holding-org__panel holding-org__panel--jur">
                        <div className="holding-org__jur-stack">
                            <div className="holding-org__headed-slice holding-org__headed-slice--cards-cols-1">
                                <div className="childrens-label-title holding-org__jur-title" style={{ backgroundColor: JUR_PURPLE }}>
                                    Dirección Jurídica
                                </div>
                                <div className="holding-org__jur-card-wrap">
                                <UserProfileCard
                                    color={JUR_PURPLE}
                                    name="Luis Manuel Alfaro Rivera"
                                    puesto="Lic. Jurídico"
                                    urlPhoto={juridico1}
                                    onClickCV={() => handleDetails(3)}
                                    onClickProfile={() => handleDetails(3, 'juridico1.png')}
                                    min={min}
                                />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="holding-org__panel holding-org__panel--adm">
                        <div className="org-tree-panel org-tree-panel--finance flex flex-col gap-1 holding-org__panel-inner" style={{ alignItems: 'center', boxSizing: 'border-box', padding: '5px 6px 6px' }}>
                            <div className="holding-org__headed-slice holding-org__headed-slice--cards-cols-4">
                                <div className="childrens-label-title org-tree-panel--finance-title" style={{ backgroundColor: HIER_BLUE, textAlign: 'center', boxSizing: 'border-box' }}>
                                    Dirección administrativa y finanzas
                                </div>
                                <div
                                    className="org-tree-finance-grid holding-org__finance-grid-4"
                                    style={{ display: 'grid', boxSizing: 'border-box', alignItems: 'start' }}
                                >
                                <UserProfileCard
                                    color={HIER_BLUE}
                                    name="Carlos Fco. Sainz R."
                                    puesto="Contabilidad"
                                    urlPhoto={conta2}
                                    onClickCV={() => handleDetails(6)}
                                    onClickProfile={() => handleDetails(6, 'conta2.png')}
                                    min={min}
                                />
                                <UserProfileCard
                                    color={HIER_BLUE}
                                    name="Ashley M. Huerta Arias"
                                    puesto="Administración / Cobranza"
                                    urlPhoto={conta1}
                                    onClickCV={() => handleDetails(7)}
                                    onClickProfile={() => handleDetails(7, 'conta1.png')}
                                    min={min}
                                />
                                <UserProfileCard
                                    color={HIER_BLUE}
                                    name="Lidia Millán Benítez"
                                    puesto="Lic. Licitaciones"
                                    urlPhoto={LICITACIONES1}
                                    onClickCV={() => handleDetails(26)}
                                    onClickProfile={() => handleDetails(26, 'LICITACIONES1.jpg')}
                                    min={min}
                                />
                                <UserProfileCard
                                    color={HIER_BLUE}
                                    name="Marisela Ladrón de G."
                                    puesto="Recursos Humanos"
                                    urlPhoto={rh1}
                                    onClickCV={() => handleDetails(4)}
                                    onClickProfile={() => handleDetails(4, 'RH1.png')}
                                    min={min}
                                />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                    <div className="holding-org__cti-main-band">
                        <div
                            className="childrens-label-title holding-org__cti-main-title"
                            style={{ backgroundColor: '#0B3D91', textAlign: 'center', boxSizing: 'border-box' }}
                        >
                            CTI — Ejecución tecnológica y operación
                        </div>
                    </div>

                <section className="holding-org__cti">
                    <div
                        className="org-tree-panel org-tree-panel--exec holding-org__cti-panel flex flex-col"
                        style={{ alignItems: 'stretch', boxSizing: 'border-box', padding: '6px 0 10px' }}
                    >
                        <div className="holding-org__cti-matrix">
                            <div className="holding-org__cti-unified">
                                <div className="holding-org__cti-column">
                                    <div className="holding-org__headed-slice holding-org__headed-slice--cards-cols-2">
                                        <div className="childrens-label-title holding-org__cti-cell-title" style={{ backgroundColor: CTI_NAVY, textAlign: 'center', boxSizing: 'border-box' }}>
                                            Dirección de Tecnología (CTO)
                                        </div>
                                        <div className="org-tree-exec-cards-grid holding-org__cti-card-grid">
                                        <UserProfileCard color={CTI_NAVY} name="Gilberto López Antonio" puesto="Dev. Web Senior" urlPhoto={dev1} onClickCV={() => handleDetails(10)} onClickProfile={() => handleDetails(10, 'DEV1.png')} min={min} />
                                        <UserProfileCard color={CTI_NAVY} name="Ulises Cano Martínez" puesto="Dev. Web" urlPhoto={dev2} onClickCV={() => handleDetails(12)} onClickProfile={() => handleDetails(12, 'DEV2.png')} min={min} />
                                        <UserProfileCard color={CTI_NAVY} name="María José Carvajal Carrera" puesto="Dev. Web" urlPhoto={DEV3M} onClickCV={() => handleDetails(13)} onClickProfile={() => handleDetails(13, 'DEV3M.jpg')} min={min} />
                                        <UserProfileCard color={CTI_NAVY} name="Sergio Cano Martínez" puesto="Dev. Web" urlPhoto={DEV4} onClickCV={() => handleDetails(21)} onClickProfile={() => handleDetails(21, 'DEV4.jpg')} min={min} />
                                        <div className="org-tree-exec-span2" style={{ gridColumn: '1 / 3', display: 'flex', justifyContent: 'center' }}>
                                            <UserProfileCard color={CTI_NAVY} name="Rafael Cano Martínez" puesto="Dev. Web" urlPhoto={DEV5} onClickCV={() => handleDetails(22)} onClickProfile={() => handleDetails(22, 'DEV5.jpg')} min={min} />
                                        </div>
                                    </div>
                                    </div>
                                </div>

                                <div className="holding-org__cti-column">
                                    <div className="holding-org__headed-slice holding-org__headed-slice--cards-cols-2">
                                        <div className="childrens-label-title holding-org__cti-cell-title" style={{ backgroundColor: CTI_NAVY, textAlign: 'center', boxSizing: 'border-box' }}>
                                            Dirección de operaciones (COO)
                                        </div>
                                        <div className="org-tree-exec-cards-grid holding-org__cti-card-grid">
                                        <UserProfileCard color={CTI_NAVY} name="Julio César Castillo Z." puesto="Dirección de Operaciones" urlPhoto={ITS1} onClickCV={() => handleDetails(20)} onClickProfile={() => handleDetails(20, 'ITS1.png')} min={min} />
                                        <UserProfileCard color={CTI_NAVY} name="Jorge Luis Olmos" puesto="Soporte en sitio" urlPhoto={SOPORTE} onClickCV={() => handleDetails(30)} onClickProfile={() => handleDetails(30, 'SOPORTE.jpg')} min={min} />
                                        <UserProfileCard color={CTI_NAVY} name="Luis Alberto Ruiz Aguilar" puesto="Capacitación" urlPhoto={curso1} onClickCV={() => handleDetails(18)} onClickProfile={() => handleDetails(18, 'curso1.png')} min={min} />
                                        <UserProfileCard color={CTI_NAVY} name="Víctor Ricardo Mojica" puesto="ITS / Peaje" urlPhoto={ITS2} onClickCV={() => handleDetails(19)} onClickProfile={() => handleDetails(19, 'ITS2.png')} min={min} />
                                    </div>
                                    </div>
                                    <div className="holding-org__headed-slice holding-org__headed-slice--cards-cols-2">
                                        <div className="childrens-label-title holding-org__cti-cell-title" style={{ backgroundColor: CTI_NAVY, textAlign: 'center', boxSizing: 'border-box' }}>
                                            Dirección comercial
                                        </div>
                                        <div className="org-tree-exec-cards-grid holding-org__cti-card-grid">
                                        <UserProfileCard color={CTI_NAVY} name="Héctor Julián Rabadán Tapia" puesto="Dirección Comercial" urlPhoto={DCOMERCIAL1} onClickCV={() => handleDetails(27)} onClickProfile={() => handleDetails(27, 'DCOMERCIAL1.png')} min={min} />
                                        <UserProfileCard color={CTI_NAVY} name="Jaime García Ángel" puesto="Dirección Comercial" urlPhoto={CV_DC1} onClickCV={() => handleDetails(28)} onClickProfile={() => handleDetails(28, 'CV_DC1.png')} min={min} />
                                    </div>
                                    </div>
                                </div>

                                <div className="holding-org__cti-column">
                                    <div className="holding-org__headed-slice holding-org__headed-slice--cards-cols-2">
                                        <div className="childrens-label-title holding-org__cti-cell-title" style={{ backgroundColor: CTI_NAVY, textAlign: 'center', boxSizing: 'border-box' }}>
                                            Dirección de Experiencia (CX)
                                        </div>
                                        <div className="org-tree-exec-cards-grid holding-org__cti-card-grid">
                                        <UserProfileCard color={CTI_NAVY} name="Jose Manuel Bravo Valencia" puesto="Gerente de Mesa de Ayuda" urlPhoto={MESA1M} onClickCV={() => handleDetails(23)} onClickProfile={() => handleDetails(23, 'MESA1M.jpg')} min={min} />
                                        <UserProfileCard color={CTI_NAVY} name="Abigail Gabriela Vilchis M." puesto="Técnico Mesa de Ayuda" urlPhoto={MESA2} onClickCV={() => handleDetails(24)} onClickProfile={() => handleDetails(24, 'MESA2.jpg')} min={min} />
                                        <UserProfileCard color={CTI_NAVY} name="Nicolás Bravo Vilchis" puesto="Técnico Mesa de Ayuda" urlPhoto={MESA3} onClickCV={() => handleDetails(25)} onClickProfile={() => handleDetails(25, 'MESA3.jpg')} min={min} />
                                        <UserProfileCard color={CTI_NAVY} name="Lilia Marquéz Samano" puesto="Técnico Mesa de Ayuda" urlPhoto={MESA4} onClickCV={() => handleDetails(29)} onClickProfile={() => handleDetails(29, 'MESA4.jpeg')} min={min} />
                                    </div>
                                    </div>
                                    <div className="holding-org__headed-slice holding-org__headed-slice--cards-cols-2">
                                        <div className="childrens-label-title holding-org__cti-cell-title" style={{ backgroundColor: CTI_NAVY, textAlign: 'center', boxSizing: 'border-box' }}>
                                            SAP
                                        </div>
                                        <div className="org-tree-exec-cards-grid holding-org__cti-card-grid">
                                        <UserProfileCard color={CTI_NAVY} name="Norma Barbosa" puesto="Consultor SAP MM/FI/SD" urlPhoto={SAP1} onClickCV={() => handleDetails(8)} onClickProfile={() => handleDetails(8, 'SAP1.png')} min={min} />
                                        <UserProfileCard color={CTI_NAVY} name="Francisco J. Mejía Ra." puesto="Consultor Consultor SAP-ABAP" urlPhoto={SAP2} onClickCV={() => handleDetails(9)} onClickProfile={() => handleDetails(9, 'SAP2.png')} min={min} />
                                    </div>
                                    </div>
                                </div>

                                <div className="holding-org__cti-column">
                                    <div className="holding-org__headed-slice holding-org__headed-slice--cards-cols-2">
                                        <div className="childrens-label-title holding-org__cti-cell-title" style={{ backgroundColor: CTI_NAVY, textAlign: 'center', boxSizing: 'border-box' }}>
                                            IA / Data - Victum AI
                                        </div>
                                        <div className="org-tree-exec-cards-grid holding-org__cti-card-grid">
                                        <UserProfileCard color={CTI_NAVY} name="Pablo Tlaxcoapan" puesto="Ing. Dev. IA" urlPhoto={IA1} onClickCV={() => handleDetails(15)} onClickProfile={() => handleDetails(15, 'IA1.png')} min={min} />
                                        <UserProfileCard color={CTI_NAVY} name="Josue Tlaxcoapan" puesto="Ing. Dev. IA" urlPhoto={IA2} onClickCV={() => handleDetails(16)} onClickProfile={() => handleDetails(16, 'IA2.png')} min={min} />
                                    </div>
                                    </div>
                                    <div className="holding-org__headed-slice holding-org__headed-slice--cards-cols-1">
                                        <div className="childrens-label-title holding-org__cti-cell-title" style={{ backgroundColor: CTI_NAVY, textAlign: 'center', boxSizing: 'border-box' }}>
                                            Infraestructura
                                        </div>
                                        <div className="org-tree-exec-cards-grid holding-org__cti-card-grid holding-org__cti-card-grid--single">
                                        <div className="org-tree-exec-span2" style={{ display: 'flex', justifyContent: 'center' }}>
                                            <UserProfileCard color={CTI_NAVY} name="Heber Argumedo" puesto="Ing. CiberSeguridad" urlPhoto={infra1} onClickCV={() => handleDetails(17)} onClickProfile={() => handleDetails(17, 'infra1.png')} min={min} />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </div>

            </div>
        </div>
    );
};

export default DiagramOrgTree;
