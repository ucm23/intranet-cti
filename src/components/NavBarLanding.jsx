import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer_ from './Footer_';
import ModalCenter from './ModalCenter';

const NavBarLanding = ({ mobile, backgroundColor = '#001529', children, handleModal, modalShow }) => {

    const location = useLocation();
    const { pathname } = location;
    const [isChecked, setIsChecked] = useState(false);
    const [showShadow, setShowShadow] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowShadow(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isChecked ? 'hidden' : 'auto';
    }, [isChecked]);

    const routes = [
        //{ id: 1, href: "/", content: "Inicio", icon: "fa-home" },
        //{ id: 2, href: "/noticies", content: "Noticias", icon: "fa-newspaper" },
        //{ id: 3, href: "/about", content: "Acerca de", icon: "fa-users" },
        { id: 7, href: "https://development.victum-re.online", content: "Iniciar sesión", onlyLink: true },
    ];

    const handleCheckBoxChange = ({ target }) => setIsChecked(target.checked);

    if (isChecked) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';

    return (
        <>
            <nav className={`${showShadow ? 'shadow nav-small' : 'nav'}`} style={{ backgroundColor: (showShadow || isChecked) ? 'white' : 'transparent', filter: modalShow && 'blur(1px)' }}>
                <a href="/" className={`enlace d-flex justify-content-center align-items-center ${(mobile && showShadow) && "center-logo"}`}>
                    <img src={(showShadow || isChecked) ? "/img/logo-blue-removebg.png" : "/img/logo-white-removebg.png"} className={showShadow ? 'logo-small' : 'logo'} />
                    <h1 className="m-0"></h1>
                </a>
                <input type="checkbox" id="check" onChange={handleCheckBoxChange} />
                <label htmlFor="check" className="checkbtn" >
                    <i className={`${isChecked ? "fa fa-times" : "fas fa-bars"} checkbtn-icons`}></i>
                </label>

                <ul style={{ paddingLeft: 0 }}>
                    {routes.map(({ id, href, content, hasSubMenu, onlyLink }) => (
                        <li key={`routes-${id}-${href}`}>
                            {onlyLink ?
                                <a onClick={handleModal} className={`${!isChecked && "btn-home-login"} white`}>{content}</a>
                                : <a href={href} className={`${href === pathname && "active"} ${(!showShadow && !mobile) && "white"}`}>{content}</a>
                            }
                        </li>
                    ))}
                </ul>
            </nav>
            <main style={{ overflowX: 'hidden', filter: modalShow && 'blur(1px)' }}>
                {children}
            </main>



            <Footer_
                modalShow={modalShow}
            />
        </>
    );
}

export default NavBarLanding;
