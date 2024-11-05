import React from 'react';
import NavBar from '../../components/NavBar';
import CarruselNoticias from '../../components/CarruselNoticias';
import Footer from '../../components/Footer';
import BootstrapCard from '../../components/BootstrapCard';
import data from '../../assets/info_noticias.json';
import { FaCalendarAlt, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";



// Añadir el campo ID a las noticias
const newsDataWithId = data.map((item, index) => ({
    ...item,
    id: index + 1 // Genera un ID único basado en el índice
}));

const Noticies = () => (

    <div className="_main container Content">
        <div className="space-y-6">
            {newsDataWithId.map((article) => (
                <div key={article?.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 card-noticies">
                    <div className="flex flex-col md:flex-row">
                        <img src={article?.imageSrc} alt={article?.newsTitle} className="w-fdivl md:w-1/4 h-24 md:h-auto object-cover card-noticies" />
                        <div className="p-2 flex-grow">
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <p className="text-gray-600 mb-1">{new Date(article?.date).toLocaleDateString()}</p>
                                <span className="flex items-center">
                                    <FaEye className="mr-1" />
                                </span>
                            </div>
                            <h2 className="text-xl font-semibold">{article?.newsTitle}</h2>
                            <p className="text-gray-600 mb-1">{article?.description}</p>
                            <p className="text-gray-600 ">{article?.autor || 'Ulises Cnao Martinez'}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Noticies;
//HEX:#703412

