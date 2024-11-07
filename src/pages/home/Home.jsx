import React, { useState, useEffect } from "react";
import { FaChevronDown, FaBullseye, FaEye, FaClipboardList } from "react-icons/fa";
import { FaHome, FaCalendar, FaNewspaper, FaFile } from "react-icons/fa";
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import color from "../../color";
import { GoChevronDown } from "react-icons/go";

const recentNews = [
    { id: 1, title: "New Campus Building Opened", description: "The state-of-the-art facility is now available for students.", image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
    { id: 2, title: "Research Grant Awarded", description: "Our university received a $5 million grant for climate research.", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
    { id: 3, title: "Alumni Achievement Award", description: "Dr. Jane Doe wins prestigious award for her contributions to medicine.", image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
];

const recentEvents = [
    { id: 1, title: "Crear un evento", description: "Al agregar un evento, aparecerá aquí donde los lectores puedan verlo.", icon: <FaCalendar className="text-4xl text-white" /> },
    { id: 2, title: "Annual Science Fair", date: "2023-06-15", category: "Academic", dayTime: "Martes, de 12:00 a 13:00" },
    { id: 3, title: "Career Expo 2023", date: "2023-07-01", category: "Career", dayTime: "Martes, de 12:00 a 13:00" },
    { id: 4, title: "Summer Concert Series", date: "2023-07-10", category: "Entertainment", dayTime: "Martes, de 12:00 a 13:00" },
];

const Home = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="mx-auto min-h-screen bg-white scroll">
            <div className="relative bg-cover bg-center h-50 md:h-[60vh] flex items-center"
                style={{
                    //backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')"
                    backgroundImage: "url('./img/news/newsbanner.png')"
                }}
            >
                <div className="absolute inset-0 bg-gray-50 opacity-10"></div>
                <div className={`relative text-white p-6 ${isSmallScreen ? "w-full" : "w-2/3"} text-left`}>
                    <h1 className="text-xl md:text-3xl font-bold mb-4 transition-all duration-300 ease-in-out transform">
                        Crear, compartir y realizar un seguimiento de tu intranet
                    </h1>
                    <p className="text-sm md:text-base mb-6 opacity-90">
                        Optimiza la colaboración y la comunicación en tu organización
                    </p>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 text-sm rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        aria-label="Explorar más"
                    >
                        Explorar más
                    </button>
                </div>
            </div>

            <section className="container mb-10 my-10">
                <h2 className="text-2xl font-bold text-gray-800">Noticias</h2>

                <a onClick={(e) => e.preventDefault()} style={{ fontWeight: 500 }} >
                    <Space>
                        <PlusOutlined style={{ color: color.primary }} /> Agregar noticia  <GoChevronDown />
                    </Space>
                </a>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    <div className="md:col-span-2 bg-white rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden relative h-auto">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${recentNews[0].image})` }}></div>
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
                            <h3 className="text-3xl font-semibold text-white mb-4">{recentNews[0].title}cc</h3>
                            <p className="text-gray-200 leading-relaxed text-lg">{recentNews[0].description}</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {recentNews.slice(1).map((news) => (
                            <div key={news.id} className="bg-white rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden">
                                <img src={news.image} alt={news.title} className="w-full h-32 object-cover" />
                                <div className="p-1.5">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{news.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">{news.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mb-10 my-12">
                <h2 className="text-2xl font-bold text-gray-800">Eventos</h2>
                <a onClick={(e) => e.preventDefault()} style={{ fontWeight: 500 }}>
                    <Space>
                        <PlusOutlined style={{ color: color.primary }} /> Agregar evento <GoChevronDown />
                    </Space>
                </a>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                    {recentEvents.map((event, index) => {
                        if (index === 0) {
                            return (
                                <div key={event.id} className="bg-white rounded shadow-md border-0-5 transition duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
                                    <div className="bg-blue-500 p-12 flex justify-center items-center">
                                        {event.icon}
                                    </div>
                                    <div className="p-4 flex-grow">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{event.title}</h3>
                                        <p className="text-gray-600">{event.description}</p>
                                    </div>
                                </div>
                            );
                        }

                        const date = new Date(event.date);
                        const month = date.toLocaleString('default', { month: 'short' });
                        const day = date.getDate().toString().padStart(2, '0');

                        return (
                            <div key={event.id} className="bg-white rounded shadow-md border-0-5 transition duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden">
                                <div className="p-0">
                                    <div className="flex justify-between items-center p-4">
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-gray-500 uppercase">{month}</p>
                                            <p className="text-3xl font-bold text-gray-700">{day}</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 mb-4"></div>
                                    <div className="flex row-auto px-4">
                                        <p className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{event.category}</p>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3 px-4">{event.title}</h3>
                                    <p className="text-sm text-gray-600 px-4">{event.dayTime}</p>
                                    <div className="border-t border-gray-200 my-4"></div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/*<div className="bg-gray-200 py-12 mt-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-xl md:text-2xl font-bold text-center mb-8 text-gray-800">
                        ¿Cómo funciona?
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
                        {[
                            "Regístrate",
                            "Personaliza tu espacio",
                            "Invita a tu equipo",
                            "¡Comienza a colaborar!"
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-3"
                            >
                                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </div>
                                <span className="text-sm font-medium">{step}</span>
                                {index < 3 && (
                                    <FaChevronDown className="text-blue-600 text-lg hidden md:block" />
                                )}
                            </div>
                        ))}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-center my-8 text-gray-800">
                        Características principales
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Colaboración en tiempo real",
                                description:
                                    "Trabaja en documentos y proyectos simultáneamente con tus colegas.",
                                icon: "🤝"
                            },
                            {
                                title: "Comunicación centralizada",
                                description:
                                    "Mantén todas las conversaciones y actualizaciones en un solo lugar.",
                                icon: "💬"
                            },
                            {
                                title: "Seguimiento de proyectos",
                                description:
                                    "Visualiza el progreso y gestiona tareas de manera eficiente.",
                                icon: "📊"
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                            >
                                <div className="text-3xl mb-3">{feature.icon}</div>
                                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>*/}

            <div className="bg-white py-16 pb-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800"> Nuestra Empresa</h2>

                    <a onClick={(e) => e.preventDefault()} style={{ fontWeight: 500 }}>
                        <Space>
                            Conoce la Misión, Visión y las Políticas <GoChevronDown />
                        </Space>
                    </a>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 gap-y-16">
                        <div className="bg-gradient-to-br from-blue-200 to-blue-300 p-6 shadow-lg transition-all duration-300 relative pt-16" style={{ borderRadius: 8 }}>
                            <div className="flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-6 mx-auto absolute -top-10 left-1/2 transform -translate-x-1/2 shadow-lg">
                                <FaBullseye className="text-white text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-600 text-center">Misión</h3>
                            <p className="text-gray-700 text-center">
                                Impulsar y reforzar la innovación y desarrollo tecnológico, para el sector
                                privado y de servicios, (a través de nuestros valores), con la finalidad de mejorar continuamente los procesos
                                mediante herramientas tecnológicas y personal especializado (calificado, competente) para contribuir al crecimiento
                                económico de nuestros clientes, colaboradores y socios.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-xl shadow-lg transition-all duration-300 relative pt-16" style={{ borderRadius: 8 }}>
                            <div className="flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 mx-auto absolute -top-10 left-1/2 transform -translate-x-1/2 shadow-lg">
                                <FaEye className="text-white text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-green-600 text-center">Visión</h3>
                            <p className="text-gray-700 text-center">
                                Ser el aliado estratégico en tecnología que nos permita posicionarnos como el principal referente
                                en soluciones de sistemas inteligentes de transporte, tecnologías de la información y ciberseguridad en
                                México, Estados Unidos, Canadá y Sur de América.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 to-purple-500 p-6 rounded-xl shadow-lg transition-all duration-300 relative pt-16" style={{ borderRadius: 8 }}>
                            <div className="flex items-center justify-center w-20 h-20 bg-purple-500 rounded-full mb-6 mx-auto absolute -top-10 left-1/2 transform -translate-x-1/2 shadow-lg">
                                <FaClipboardList className="text-white text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-purple-600 text-center">Políticas de la Empresa</h3>

                            <p className="text-gray-700 text-center">
                                Somos un equipo de alianzas estratégicas y fortalecemos nuestras relaciones de confianza con nuestros clientes,
                                socios y mayoristas. <br />
                                <span className="mr-2 text-purple-500">•</span><br />Brindamos calidad y valor agregado en cada uno de nuestros servicios y contribuimos en la innovación tecnológica
                                de nuestro país, a través de nuestros propios desarrollos y consultores calificados.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/*<footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm">&copy; 2023 Tu Intranet. Todos los derechos reservados.</p>
                </div>
            </footer>*/}
        </div>
    );
};

export default Home;
