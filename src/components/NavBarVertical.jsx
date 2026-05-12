import React, { useState, useContext, useRef, useEffect } from 'react';
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
    FormOutlined,
    GroupOutlined,
    AlertOutlined
} from '@ant-design/icons';

import { FaCalendarAlt, FaUser, FaComments, FaShareAlt, FaNewspaper, FaCheckCircle, FaExternalLinkAlt, FaCheck } from "react-icons/fa";
import { Layout, theme, Menu } from 'antd';
import { useBreakpointValue } from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom';
import Context from '../redux/Context';
import LabelProfile from './LabelProfile';
import { useSelector } from 'react-redux';
import { useDailyCheck } from '../hooks/useDailyCheck';
import { CheckHistory } from './CheckHistory';
import { SUPABASE_REST_URL, supabaseHeaders } from '../config/supabaseApi';
import Webcam from 'react-webcam';
import './DailyCheckRegister.css';
import { dailtCheck } from '../api/users/users';
import Fetcher from '../libs/Petition';
import { headers2 } from '../libs/main';

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
    {
        key: '7',
        label: 'Indicadores',
        icon: React.createElement(GroupOutlined),
        route: '/indicator',

    },
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

    const information_user = useSelector(state => state.login.information_user);
    const id = information_user?.id;
    //console.log("🚀 ~ NavBarVertical ~ information_user:", information_user)

    const webcamRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [hasChecked, setHasChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState(null);


    // Función para registrar el check en Supabase (usando RPC)
    const registrarCheck = async (checkData) => {
        console.log('Enviando a Supabase:', {
            p_user_id: checkData.id,
            p_photo_base64: checkData.photoBase64 ? 'BASE64_PRESENTE' : 'NO_HAY_FOTO',
            p_latitude: checkData.latitude,
            p_longitude: checkData.longitude,
            p_accuracy: checkData.accuracy,
            p_ip_address: checkData.ipAddress,
            p_user_agent: checkData.userAgent
        });

        try {
            const response = await fetch(`${SUPABASE_REST_URL}/rpc/registrar_check`, {
                method: 'POST',
                headers: supabaseHeaders,
                body: JSON.stringify({
                    p_user_id: checkData.id,
                    p_photo_base64: checkData.photoBase64,
                    p_latitude: checkData.latitude,
                    p_longitude: checkData.longitude,
                    p_accuracy: checkData.accuracy,
                    p_ip_address: checkData.ipAddress,
                    p_user_agent: checkData.userAgent
                })
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            return data;

        } catch (error) {
            console.error('Error en registrarCheck:', error);
            throw error;
        }
    };

    // Obtener coordenadas GPS
    const getCoordinates = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocalización no soportada'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                    });
                },
                (error) => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        });
    };

    // Obtener IP del usuario
    const getIpAddress = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.warn('No se pudo obtener IP:', error);
            return null;
        }
    };

    // Tomar foto y registrar
    const handleTakePhotoAndRegister = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. Verificar que la cámara esté lista
            if (!webcamRef.current) {
                throw new Error('Cámara no disponible');
            }

            // 2. Tomar la foto
            //const photoBase64 = webcamRef.current.getScreenshot();
            const photoBase64 = webcamRef.current.getScreenshot({
                quality: 0.3, // Reduce calidad (0-1)
                width: 500    // Reduce resolución
            });
            if (!photoBase64) {
                throw new Error('No se pudo capturar la foto');
            }

            // Mostrar preview
            setPreviewPhoto(photoBase64);

            // 3. Obtener coordenadas GPS
            const coordinates = await getCoordinates();

            // 4. Obtener IP
            const ipAddress = await getIpAddress();

            // 5. Registrar en Supabase
            /*const result = await registrarCheck({
                id: id,
                photoBase64: photoBase64,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                accuracy: coordinates.accuracy,
                ipAddress: ipAddress,
                userAgent: navigator.userAgent
            });*/

            // https://api-metrix.victum-re.online/intranet/daily_checks
            // https://api-metrix.victum-re.online/intranet/daily_checks
            // https://api-metrix.victum-re.online/intranet/daily_checks
            // https://api-metrix.victum-re.online/intranet/daily_checks

            //const body = JSON.stringify()
            //console.log("🚀 ~ handleTakePhotoAndRegister ~ body:", JSON.stringify(body, null, 4))

            /*
user_id (integer): Identificador del usuario ,
latitude (number, optional): Latitud ,
longitude (number, optional): Longitud ,
accuracy (number, optional): Precisión ,
ip_address (string, optional): Dirección IP ,
user_agent (string, optional): Info del navegador ,
photo_url (string, optional): URL de la foto ,
is_base64 (boolean, optional): Indica si la foto es en base64
}
            **/

            const result = await Fetcher({
                method: 'POST',
                url: `/daily_checks`,
                header: headers2,
                data: JSON.stringify({
                    user_id: id,
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                    accuracy: coordinates.accuracy,
                    ip_address: ipAddress,
                    user_agent: navigator.userAgent,
                    photo_url: photoBase64,
                    is_base64: true
                })
            })

            // 6. Procesar respuesta
            if (result?.status == 200) {
                console.log('✅ Check registrado:', result);
                setHasChecked(true);
                setShowCamera(false);
                setPreviewPhoto(null);
                //alert('¡Registro completado con éxito!');
            } else {
                throw new Error(result.mensaje || 'Error al registrar');
            }

        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
            setPreviewPhoto(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Verificar si ya hizo check hoy al cargar el componente
    useEffect(() => {
        const checkStatus = async () => {
            if (id) {
                const registrado = await dailtCheck({ id });
                console.log("🚀 ~ checkStatus ~ registrado:", registrado)
                setHasChecked(registrado?.data);
            }
        };
        checkStatus();
    }, [id]);

    const handleUserMedia = () => {
        setIsCameraReady(true);
        console.log('Cámara lista');
    };

    const handleUserMediaError = (error) => {
        console.error('Error de cámara:', error);
        setError('No se pudo acceder a la cámara. Verifica los permisos.');
        setIsCameraReady(false);
    };



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
                        {/*information_user?.role == 'administrador' && (
                            <>
                                <Menu.Item key={`item-menu-admin`}>
                                    <Link to={`/logs`}><span><SettingOutlined />&nbsp;<span>Logs</span></span></Link>
                                </Menu.Item>
                            </>
                        )*/}
                    </Menu>
                    {!hasChecked ? collapsed ?
                        <div className="relative flex flex-col items-center justify-center mt-1">
                            <div className="absolute inset-0 animate-ping bg-orange-400 rounded-full opacity-20 pointer-events-none"></div>

                            <button
                                onClick={() => {
                                    setShowCamera(true);
                                    console.log('1');
                                }}
                                className="bg-orange-500 hover:bg-blue-600 text-white text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                {React.createElement(AlertOutlined)}
                            </button>
                        </div> :
                        <div class="m-3 p-3 bg-white backdrop-blur-md rounded-sm shadow-lg">
                            <div class="flex items-start gap-2 animate-fade-in flex-wrap items-center justify-center">
                                <div class="flex-1">
                                    <p class="text-blue-800 text-sm font-semibold leading-relaxed text-center">
                                        ⏰ <br /> ¡No olvides tu registro diario!
                                    </p>
                                    <p class="text-gray-600 text-sm mt-1 leading-relaxed">
                                        Realiza tu check-in despues de las <span class="font-bold text-orange-600">8:00 AM</span>
                                    </p>
                                </div>
                                <div class="relative flex flex-col items-center justify-center">
                                    <button onClick={() => { setShowCamera(true); console.log('1') }} class="bg-orange-500 hover:bg-blue-600 text-white text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                                        Registrar
                                    </button>
                                    <div class="absolute inset-0 animate-ping bg-orange-400 rounded-full opacity-20 pointer-events-none"></div>

                                </div>
                            </div>
                        </div> : null}

                </Sider>


                <Content className='' style={{}}>
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
                    {showCamera && (
                        <div className="camera-modal">
                            <div className="camera-container">
                                <div className="camera-header">
                                    <h3>Registro Diario</h3>
                                    <button onClick={() => {
                                        setShowCamera(false);
                                        setPreviewPhoto(null);
                                        setError(null);
                                    }} className="close-btn">
                                        ✕
                                    </button>
                                </div>

                                <div className="webcam-wrapper">
                                    {!previewPhoto ? (
                                        <>
                                            <Webcam
                                                ref={webcamRef}
                                                audio={false}
                                                screenshotFormat="image/jpeg"
                                                screenshotQuality={0.8}
                                                videoConstraints={{
                                                    width: 500,
                                                    height: 400,
                                                    facingMode: "user"
                                                }}
                                                onUserMedia={handleUserMedia}
                                                onUserMediaError={handleUserMediaError}
                                                className="webcam-preview"
                                            />

                                            {!isCameraReady && (
                                                <div className="loading-overlay">
                                                    <div className="spinner"></div>
                                                    <p>Inicializando cámara...</p>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="photo-preview">
                                            <img src={previewPhoto} alt="Preview" />
                                            {isLoading && (
                                                <div className="loading-overlay">
                                                    <div className="spinner"></div>
                                                    <p>Guardando registro...</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="camera-footer">
                                    {!previewPhoto ? (
                                        <>
                                            <button
                                                onClick={handleTakePhotoAndRegister}
                                                className="capture-btn"
                                                disabled={!isCameraReady || isLoading}
                                            >
                                                <div className="button-inner">
                                                    <div className="red-button"></div>
                                                    <span>TOMAR FOTO</span>
                                                </div>
                                            </button>
                                        </>
                                    ) : (
                                        <div className="success-message">
                                            <div className="check-animation">✅</div>
                                            <p>¡Foto tomada! Guardando registro...</p>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="error-container">
                                            <p className="error-text">❌ No fue posible enviar su registro, reintente o contacte a su administrador</p>
                                            <button onClick={() => setError(null)} className="retry-btn">
                                                Reintentar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {children}
                </Content>
            </Layout>
        </Layout>

    )
}

export default NavBarVertical;