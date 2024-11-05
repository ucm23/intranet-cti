import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NavBar = ({ mobile, backgroundColor = '#001529' }) => {
    const location = useLocation();
    const { pathname } = location;

    const [isChecked, setIsChecked] = useState(false);
    const [showShadow, setShowShadow] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowShadow(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isChecked ? 'hidden' : 'auto';
    }, [isChecked]);

    const routes = [
        { id: 1, href: "/", content: "Inicio", icon: "fa-home" },
        { id: 2, href: "/noticias", content: "Noticias", icon: "fa-newspaper" },
        { id: 3, href: "/colaboradores", content: "Colaboradores", icon: "fa-users" },
        { id: 4, href: "/tramites", content: "Trámites y Servicios", icon: "fa-tachometer-alt" },
        { id: 5, href: "/gestor-contenidos", content: "Gestor de Contenidos", icon: "fa-cogs", subRoutes: [
            { id: 5.1, href: "/gestor-contenidos/administracion", content: "Administración" },
            { id: 5.2, href: "/gestor-contenidos/recursosHumanos", content: "Recursos Humanos" },
            { id: 5.3, href: "/gestor-contenidos/areaItsTelepeaje", content: "Área ITS y Telepeaje" },
            { id: 5.4, href: "/gestor-contenidos/desarrolloAplicaciones", content: "Desarrollo de Aplicaciones" },
            { id: 5.5, href: "/gestor-contenidos/mesaAyuda", content: "Mesa de Ayuda" },
        ]},
        { id: 6, href: "/indicadores", content: "Indicadores", icon: "fa-chart-line" },
        { id: 7, href: "/calendario", content: "Calendario de Eventos", icon: "fa-calendar-alt" }
    ];

    const handleCheckBoxChange = ({ target }) => setIsChecked(target.checked);

    return (
        <nav className={`navbar navbar-expand-lg ${showShadow ? 'shadow' : ''}`} style={{ backgroundColor: (showShadow || isChecked) ? 'white' : backgroundColor }}>
            <a href="/" className="navbar-brand d-flex align-items-center">
                <img 
                    src={(showShadow || isChecked) ? "/img/LOGO-INTRANET.png" : "/img/LOGO-INTRANET.png"} 
                    className="logo" 
                    alt="Logo" 
                    style={{ height: '50px' }} 
                />
            </a>
            <input type="checkbox" id="check" onChange={handleCheckBoxChange} className="d-none" /> 
            <label htmlFor="check" className="checkbtn">
                <i className={`${isChecked ? "fa fa-times" : "fas fa-bars"} checkbtn-icons`} style={{ fontSize: '24px' }}></i>
            </label>
            <div className={`collapse navbar-collapse ${isChecked ? 'show' : ''}`} id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    {routes.map(({ id, href, content, icon, subRoutes }) => (
                        <li 
                            //className="nav-item position-relative" 
                            key={`routes-${id}-${href}`} 
                            //onMouseEnter={() => id === 5 && setShowSubMenu(true)} 
                            //onMouseLeave={() => setShowSubMenu(false)}
                        >
                            <a 
                                href={href} 
                                //className={`nav-link ${href === pathname ? "active" : ""}`} 
                                style={{
                                    padding: '10px 15px',
                                    //color: isChecked ? '#001529' : 'white', 
                                    //transition: 'color 0.3s, background-color 0.3s',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '16px',
                                    position: 'relative'
                                }}
                            >
                                <i className={`fas ${icon}`} style={{ marginRight: '8px', color: 'white' }}></i>
                                {content}
                                {subRoutes && <i className="fas fa-caret-down ml-2"></i>}
                                <span className="indicator"></span>
                            </a>
                            {subRoutes && showSubMenu && (
                                <ul className="submenu">
                                    {subRoutes.map(({ id, href, content }) => (
                                        <li key={`subroutes-${id}`}>
                                            <a href={href} className="submenu-link">{content}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
       
        </nav>
    );
}

export default NavBar;
