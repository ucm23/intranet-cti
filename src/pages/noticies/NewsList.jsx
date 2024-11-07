import React, { useEffect, useState } from "react";
import { FaNewspaper, FaGlobeAmericas, FaLandmark, FaFlask, FaFootballBall, FaMusic, FaChevronRight, FaTh, FaThLarge, FaList, FaPlus, FaTable } from "react-icons/fa";
import { indexIMGByID, indexNews } from "../../api/news/news";
import { indexUsers } from "../../api/users/users";
import { useNavigate } from 'react-router-dom';
import { Button, Empty, Typography } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';


const categories = [
    "Todos",
    "Actualizaciones de Productos",
    "Innovación y Tecnología",
    "Proyectos y Casos de Éxito",
    "Responsabilidad digital",
    "Cultura y Valores",
    "Anuncios Corporativos",
    "Eventos y Webinars",
    "Reconocimientos y Premios",
    "Capacitación y Desarrollo",
    "Seguridad Informática",
    "Responsabilidad Social y Sustentabilidad",
]

const viewModes = [
    { mode: 1, icon: <FaThLarge /> },
    //{ mode: 2, icon: <FaTh /> },
    { mode: 3, icon: <FaList /> },
    //{ mode: 4, icon: <FaTable /> },
];

const NewsList = () => {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const user = await indexUsers({})
        if (user?.status) setUsers(user?.data)
    }

    useEffect(() => {
        if (users) getDataNews()
    }, [users])

    const getDataNews = async () => {
        const docs = await indexNews({})
        if (docs?.status) setData(docs?.data)
    }

    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [viewMode, setViewMode] = useState(1);

    const handleCategoryClick = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredNews = selectedCategory === "Todos" ? data : data.filter(item => item.categories.find((item_) => item_ === selectedCategory));

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    const findUser = ({ id }) => users.find(item => item?.value == id);

    const ImageLoader = ({ id, className }) => {
        const [imageUrl, setImageUrl] = useState(null);

        useEffect(() => {
            loadURL();
        }, [id]);

        const loadURL = async () => {
            const img = await indexIMGByID({ id, thumbnail: true });
            setImageUrl(img?.data);
        };
        return imageUrl ? <img src={imageUrl} alt={`img-${id}`} className={className} loading="lazy" /> : <p>Cargando...</p>;
    };

    const handleDetails = ({ item, user }) => {
        navigate("/newDetails", { state: { item, user } });
    };


    const renderNewsItems = () => {
        switch (viewMode) {
            case 1:
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {filteredNews.map((item, index) => {
                            const user = findUser({ id: item.user_id });
                            return (
                                <div key={index} onClick={() => handleDetails({ item, user })} className="bg-white rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <ImageLoader id={item?.id} className={"w-full h-55 object-cover"} />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-0 text-gray-800">{item.title}</h3>
                                        <span className="text-xs text-blue-600 font-medium">{user?.label}</span>
                                        <p className="text-gray-600 mb-4 mt-3 line-clamp-3">
                                            <div dangerouslySetInnerHTML={{ __html: item?.summary }} />
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-row flex-wrap gap-0.5">
                                                {item?.categories.map((item, index) => <span key={`${item}-${index}`} className="bg-blue-200 text-blue-600 text-center py-0.5 px-1.5 rounded-lg text-xxs">{item}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                );
            case 2:
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {filteredNews.map((item, index) => {
                            const user = findUser({ id: item.user_id });
                            return (
                                <div key={index} onClick={() => handleDetails({ item, user })} className="bg-white rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <ImageLoader id={item?.id} className={"w-full h-32 object-cover"} />
                                    <div className="p-2">
                                        <h3 className="text-sm font-semibold mb-1 text-gray-800">{item.title}</h3>
                                        <div className="flex flex-column wrap gap-0.5">
                                            {item?.categories.map((item, index) => <span key={`${item}-${index}`} className="bg-blue-200 text-blue-600 py-1 px-3 ml-1 rounded-full text-xxs">{item}</span>)}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        {filteredNews.map((item, index) => {
                            const user = findUser({ id: item?.user_id });
                            return (
                                <div
                                    key={item.id}
                                    className="bg-white rounded overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500"
                                    tabIndex="0"
                                    role="button"
                                    onClick={() => handleDetails({ item, user })}
                                //onClick={() => setSelectedCard(item)}
                                //onKeyPress={(e) => e.key === "Enter" && setSelectedCard(item)}
                                >
                                    <div className="flex flex-row">
                                        <div className="w-1/3">
                                            <ImageLoader id={item?.id} className={"w-full h-full object-cover"} />
                                        </div>
                                        <div className="w-2/3 p-6 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-2xl font-bold mb-2 line-clamp-1">{item.title}</h3>
                                                <p className="text-sm text-gray-600 mb-0 pb-0 line-clamp-3 text-justify">
                                                    <div dangerouslySetInnerHTML={{ __html: item?.summary }} />
                                                </p>
                                                <span className="text-xs text-blue-600 font-medium">{user?.label}</span>

                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-row flex-wrap gap-0.5">
                                                    {item?.categories.map((item, index) => <span key={`${item}-${index}`} className="bg-blue-200 text-blue-600 text-center py-0.5 px-1.5 rounded-lg text-xxs">{item}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                );
            case 4:
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-white text-black-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-2 text-left">Titulo</th>
                                    <th className="py-3 px-2 text-left">Categoria</th>
                                    <th className="py-3 px-2 text-left">Publicación</th>
                                    <th className="py-3 px-2 text-left">Resumen</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {filteredNews.map((item, index) => {
                                    const user = findUser({ id: item.user_id });
                                    return (
                                        <tr key={index} onClick={() => handleDetails({ item, user })} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-2 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{item.title}</span>
                                                        <span>{user?.label} {user?.last_name}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-left">
                                                {item?.categories.map((item, index) => <span key={`${item}-${index}`} className="bg-blue-200 text-blue-600 py-1 px-3 ml-1 rounded-full text-xs">{item}</span>)}
                                            </td>
                                            <td className="py-3 px-2 text-left">
                                                <span>{item?.created_at}</span>
                                            </td>
                                            <td className="py-3 px-2 text-left">
                                                <span className="truncate block max-w-xs">{item?.summary}</span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                );
        }
    };

    return (
        <div className="mx-auto px-4 py-8 bg-scroll">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Noticias</h2>
                <Button
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/addnews")}
                    type="primary">Añadir</Button>
            </div>
            <div className="mb-8 flex flex-wrap gap-4 justify-between">
                <div className="flex flex-wrap gap-4 items-center">
                    <label htmlFor="category-select" className="text-gray-700 font-medium">Categoría</label>
                    <select
                        id="category-select"
                        name="select"
                        value={selectedCategory}
                        onChange={handleCategoryClick}
                        aria-label={"category-select"}
                        className="bg-white border border-gray-300 text-gray-700 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-2">
                    {viewModes.map(({ mode, icon }) => (
                        <button
                            key={mode}
                            onClick={() => handleViewModeChange(mode)}
                            className={`py-1.5 px-2.5 rounded ${viewMode === mode ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-200"}`}
                        >
                            {icon}
                        </button>
                    ))}
                </div>
            </div>

            {renderNewsItems()}

            {filteredNews.length === 0 && (
                <div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        description={
                            <Typography.Text>
                                <p className="text-center text-gray-600 mt-8">No hay elementos en la lista</p>
                                <p className="text-center text-gray-600">Agrega elementos haciendo clic en el botón `Añadir`</p>
                            </Typography.Text>
                        }
                    >
                        <Button icon={<PlusOutlined />} onClick={() => navigate("/addnews")} type="primary">Añadir</Button>
                    </Empty>
                </div>
            )}
        </div>
    );
};

export default NewsList;
