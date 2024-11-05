import React, { useState, useContext } from 'react';
import {
    HomeOutlined,
    UserOutlined,
    ApartmentOutlined,
    SettingFilled,
    LoginOutlined,
    MenuOutlined,
    TruckOutlined,
    CalendarOutlined,
    MailOutlined,
    ArrowLeftOutlined,
    ToolOutlined,
    SettingOutlined,
    AppstoreOutlined,
    FileDoneOutlined,
    FormOutlined
} from '@ant-design/icons';

import { FaCalendarAlt, FaUser, FaComments, FaShareAlt, FaNewspaper, FaCheckCircle, FaExternalLinkAlt, FaCheck } from "react-icons/fa";
import { Layout, theme, Menu } from 'antd';
import { useBreakpointValue } from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom';
import Context from '../redux/Context';
import LabelProfile from './LabelProfile';
import { useSelector } from 'react-redux';

const { Header, Content, Sider } = Layout;
const routes = [
    { id: 1, href: "/", content: "Inicio", icon: "fa-home" },
    { id: 2, href: "/noticias", content: "Noticias", icon: "fa-newspaper" },
    { id: 3, href: "/colaboradores", content: "Colaboradores", icon: "fa-users" },
    { id: 4, href: "/tramites", content: "Trámites y Servicios", icon: "fa-tachometer-alt" },
    {
        id: 5, href: "/gestor-contenidos", content: "Gestor de Contenidos", icon: "fa-cogs",
        subRoutes: [
            { id: 5.1, href: "/gestor-contenidos/administracion", content: "Administración" },
            { id: 5.2, href: "/gestor-contenidos/recursosHumanos", content: "Recursos Humanos" },
            { id: 5.3, href: "/gestor-contenidos/areaItsTelepeaje", content: "Área ITS y Telepeaje" },
            { id: 5.4, href: "/gestor-contenidos/desarrolloAplicaciones", content: "Desarrollo de Aplicaciones" },
            { id: 5.5, href: "/gestor-contenidos/mesaAyuda", content: "Mesa de Ayuda" },
        ]
    },
    { id: 6, href: "/indicadores", content: "Indicadores", icon: "fa-chart-line" },
    { id: 7, href: "/calendario", content: "Calendario de Eventos", icon: "fa-calendar-alt" }
];
const items = [
    {
        key: '1',
        label: 'Inicio',
        icon: React.createElement(HomeOutlined),
        route: '/'
    },
    {
        key: '2',
        label: 'Noticias',
        icon: React.createElement(FormOutlined),
        route: '/newslist',
    },
    {
        key: '3',
        label: 'Colaboradores',
        icon: React.createElement(AppstoreOutlined),
        route: '/collaborator',
    },
    /*{
        key: '4',
        label: 'Trámites y Servicios',
        icon: <AppstoreOutlined />,
        route: '/docs',
    },
    {
        key: '5',
        label: 'Gestor de Contenidos',
        icon: <FileDoneOutlined />,
        route: '/files',
    },*/
    {
        key: '6',
        label: 'Gestor de archivos',
        icon: React.createElement(FileDoneOutlined),
        route: '/files',
    },
    /*{
        key: '7',
        label: 'Indicadores',
        icon: <SettingOutlined />,
        route: '/ind',
        
    },*/
    {
        key: '8',
        label: 'Calendario',
        icon: React.createElement(CalendarOutlined),
        route: '/calendar',
    },


];

const NavBarVertical = ({ children, menu }) => {

    const { token: { colorBgContainer } } = theme.useToken();
    const navigate = useNavigate();
    const { signOut } = useContext(Context);
    const [collapsed, setCollapsed] = useState(true);
    const mobile = useBreakpointValue({ base: true, md: false });

    return (
        <Layout style={{ height: '100vh', overflow: 'hidden' }}>

            <Layout>
                <Sider
                    collapsed={collapsed}
                    style={{ borderRightWidth: 0.6, backgroundColor: '#001629', background: '#001629' }}
                //style={{ backgroundColor: 'white', background: 'white' }}
                >
                    <LabelProfile
                        //information_user={information_user}
                        //company={company}
                        collapsed={collapsed}
                        signOut={signOut}
                        opencog={() => {
                            navigate(`/settings`);
                            //opencog()
                        }}
                    />
                    <Menu
                        //className='menu-vertical'
                        //defaultSelectedKeys={['1']}
                        //defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme='dark'
                        inlineCollapsed={collapsed}
                    //items={items}
                    //onClick={onClick}
                    >
                        {items.map((item, index) =>
                            <Menu.Item key={`item-menu-${item?.route}-${index}`}>
                                <Link to={item?.route}><span>{item?.icon}&nbsp;<span>{item?.label}</span></span></Link>
                            </Menu.Item>
                        )}
                    </Menu>
                </Sider>


                <Content className='' style={{ backgroundColor: 'white' }}>
                    {/*<Header style={{ display: 'flex', alignItems: 'center', background: 'white' }}>
                        {mobile &&
                            <div className="btn-menu-header" onClick={() => setCollapsed(!collapsed)} >
                                <MenuOutlined />
                            </div>
                        }

                        <img src="/side-bar-logo.png" alt="/side-bar-logo.png" style={{ height: 50, marginLeft: !mobile ? 12 : 0 }} />
                        <h1 className='header-title'>Victum Geo Truck</h1>
                    </Header>*/}
                    <Header style={{ display: 'flex', alignItems: 'center', background: 'white', height: 48, padding: 0 }}>
                        <div className="btn-menu-header" onClick={() => setCollapsed(!collapsed)} >
                            <MenuOutlined />
                        </div>
                        <img src="/img/logo-blue-removebg.png" alt="logo" style={{ height: 40, marginLeft: !mobile ? 12 : 0 }} />
                    </Header>
                    {children}
                </Content>
            </Layout>
        </Layout>

    )
}

export default NavBarVertical;