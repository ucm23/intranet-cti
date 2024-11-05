import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUser, FaComments, FaShareAlt, FaNewspaper, FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { indexIMGByID } from "../../api/news/news";
import moment from "moment/moment";
import AppBar from '../../components/AppBar';

const ImageLoader = ({ id, picture, className }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        //loadURL();
    }, [id]);

    const loadURL = async () => {
        const img = await indexIMGByID({ id, picture });
        setImageUrl(img?.data);
    };
    return imageUrl ? <img src={imageUrl} alt={`img-${id}-${picture}`} className={className} loading="lazy" /> : <p>Cargando...</p>;
};

const NewsEdit = ({ page }) => {
    const location = useLocation();
    const { item, user } = location?.state || {};

    return (
        <AppBar page={page}>
            <div className="bg-white scroll-100">
                <div className="relative w-full">
                    <ImageLoader
                        id={item?.id}
                        picture={'header'}
                        className="w-full h-64 md:h-95 object-cover news-banner-img"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 pt-4 rounded-lg max-w-[850px] w-full position-0">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{item?.title}</h1>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                                <FaUser className="mr-2" />
                                <span>{user?.first_name} {user?.last_name}</span>
                            </div>
                            <div className="flex items-center">
                                <FaCalendarAlt className="mr-2" />
                                <span>{moment(item?.created_at).format('DD-MM-YYYY')}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-[850px] mx-auto px-4 py-6">
                    <h1 class="flex-auto text-lg font-semibold text-slate-900">
                        Resumen
                    </h1>
                    <p className="text-gray-700 leading-relaxed mb-6">{item?.summary}</p>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Galería de imágenes</h2>
                        <ImageLoader
                            id={item?.id}
                            className="w-full h-64 object-cover rounded-lg h-auto"
                        />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Noticias relacionadas</h2>
                        <div className="space-y-4">
                            {item?.list.map((news, index) => (
                                <div key={index} className="bg-gray-100 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                                    <div href={news.url} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">
                                        <div className="flex items-center mb-2">
                                            <FaNewspaper className="mr-3 text-blue-600 flex-shrink-0" />
                                            <span className="font-semibold">{news.title}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 ml-7">{news.title}</p>
                                        <p className="text-sm text-gray-600 ml-7">{news.summary}</p>
                                        <div className="flex justify-end mt-2">
                                            <FaExternalLinkAlt className="text-blue-600" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Conclusiones</h2>
                        <p className="text-gray-700 leading-relaxed">{item?.conclusion}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4">
                        {item?.categories.map((category, index) => (
                            <button
                                key={index}
                                className={`flex items-center px-4 py-2 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-white text-gray-800 hover:bg-blue-100`}
                            >
                                <span>{category}</span>
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <div className="flex items-center text-sm text-gray-600">
                        </div>
                        <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition duration-300">
                            <FaShareAlt className="mr-2" />
                            Compartir
                        </button>
                    </div>
                </div>
            </div>
        </AppBar>
    );
};

export default NewsEdit;

