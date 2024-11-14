import React, { useEffect, useState, useRef } from "react";
import { FiPlus, FiX, FiEdit, FiEdit2, FiCheck } from "react-icons/fi";
import { FiBold, FiItalic, FiAlignCenter } from 'react-icons/fi';
import { Modal as ModalBootstrap, Button } from "react-bootstrap";
import { FaCalendarAlt, FaUser, FaComments, FaShareAlt, FaNewspaper, FaCheckCircle, FaExternalLinkAlt, FaCheck } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { createNews, indexIMGByID } from "../../api/news/news";
import moment from "moment/moment";
import AppBar from '../../components/AppBar';
import { FallingLines } from 'react-loader-spinner'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Portal,
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button as ButtonAntd, Drawer, Radio, Space } from 'antd';
import { FiUpload } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ArrowLeftOutlined, ShareAltOutlined } from '@ant-design/icons';
import { GoBook } from "react-icons/go";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'
import { FaSearch, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from '@chakra-ui/react'
import color from "../../color";
import { notification } from 'antd';
import { formats, modules, openNotificationWithIcon } from "../../libs/main";
import { useSelector } from 'react-redux';

const AddNews = ({ page }) => {
    const location = useLocation();
    const { item, user } = location?.state || {};
    const information_user = useSelector(state => state.login.information_user);
    const { id: user_id } = information_user;
    //const { isOpen: isOpenBanner, onOpen: onOpenBanner, onClose: onCloseBanner } = useDisclosure();

    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, description) => openNotificationWithIcon(api, type, description)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };


    //const [banner, setBanner] = useState(1);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [body, setBody] = useState('');
    const [conclusion, setConclusion] = useState('');
    /*const test = {
        user_id,
        title: "",
        body: "",
        active: true,
        category: [],
        conclusion: "",
        list: {
            title: "",
            list: [
                { title: "", description: "" }
            ]
        },
        banner: ""
    }*/

    const [formData, setFormData] = useState({
        title: "",
        data: [{ name: "", description: "" }]
    });
    const [errors, setErrors] = useState({});
    const [editingIndex, setEditingIndex] = useState(null);

    const handleTitleChange = (e) => {
        setFormData({ ...formData, title: e.target.value });
        if (e.target.value) {
            setErrors({ ...errors, title: "" });
        }
    };

    const handleDataChange = (index, field, value) => {
        console.log("🚀 ~ handleDataChange ~ index, field, value:", index, field, value)
        const newData = [...formData.data];
        newData[index] = { ...newData[index], [field]: value };
        setFormData({ ...formData, data: newData });
    };

    const addMoreFields = () => {
        setFormData({
            ...formData,
            data: [...formData.data, { name: "", description: "" }]
        });
    };

    const removeFields = (index) => {
        const newData = [...formData.data];
        newData.splice(index, 1);
        setFormData({ ...formData, data: newData });
    };

    /*const validateForm = () => {
        const newErrors = {};
        if (!formData.title) {
            newErrors.title = "El título es obligatorio";
        }
        formData.data.forEach((item, index) => {
            if (!item.name) {
                newErrors[`name_${index}`] = "El nombre es obligatorio";
            }
            if (!item.description) {
                newErrors[`description_${index}`] = "La descripción es obligatoria";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };*/

    const isTitleEmpty = formData.title.trim() === "";

    const toggleEditing = (index) => {
        setEditingIndex(editingIndex === index ? null : index);
    };

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('right');
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const [selectedBanner, setSelectedBanner] = useState(1);
    //const [selectedBody, setSelectedBody] = useState(1);

    const handleBannerClick = (id) => {
        setSelectedBanner(id);
    };

    const [categories, setCategories] = useState([
        { name: "Actualizaciones de Productos", icon: "🔬" },
        { name: "Proyectos y Casos de Éxito", icon: "💼" },
        { name: "Sustentabilidad", icon: "♻️" },
        { name: "Reconocimientos y Premios", icon: "🏆" },
        { name: "Capacitación y Desarrollo", icon: "👩‍💻" },
        { name: "Innovación y Tecnología", icon: "🚀" },
        { name: "Responsabilidad digital", icon: "💻" },
        { name: "Seguridad Informática", icon: "🦺" },
        { name: "Anuncios Corporativos", icon: "📣" },
        { name: "Responsabilidad Social", icon: "🌿" },
        { name: "Eventos y Webinars", icon: "🎥" },
        { name: "Cultura y Valores", icon: "🏛️" },
    ]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 1500);
    }, []);

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCategoryToggle = (categoryId) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((name) => name !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleSelectAll = () => {
        if (selectedCategories.length === categories.length) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(categories.map((category) => category.name));
        }
    };

    const handleSubmit_ = () => {
        if (selectedCategories.length === 0) {
            //setError("Please select at least one category");
        } else {
            console.log("Selected categories:", selectedCategories);
        }
    };

    const allSelected = selectedCategories.length === categories.length;

    const validateEvent = () => {
        const requiredFields = [
            { field: title, message: 'El campo título es obligatorio' },
            { field: summary, message: 'Añada un resumen' },
            { field: body, message: 'Añada una descripción' },
            { field: conclusion, message: 'Añada una conclución' },
        ];

        for (const { field, message } of requiredFields) {
            if (!field) {
                openNotification('warning', message);
                return false;
            }
        }
        return true;
    };

    const postNews = async () => {
        if (!validateEvent()) return;
        try {
            let data = new FormData();
            data.append("user_id", user_id);
            data.append("title", title);
            data.append("body", body);
            data.append("categories", JSON.stringify(selectedCategories));
            data.append("summary", summary);
            data.append("list", JSON.stringify(formData));
            data.append("conclusion", conclusion);
            data.append("public", true);

            const imageUrlBanner = `/img/news/banner/${selectedBanner}.png`;
            const responseBanner = await fetch(imageUrlBanner);

            if (responseBanner.ok) {
                const blobBanner = await responseBanner.blob();
                data.append('picture_header', blobBanner, `${selectedBanner}.png`);
            } else console.error('Error al obtener el banner:', responseBanner.statusText);

            const imageUrlBody = image;
            const responseBody = await fetch(imageUrlBody);

            if (responseBody.ok) {
                const blobBody = await responseBody.blob();
                data.append('picture_body', blobBody, `${image}`);
            } else console.error('Error al obtener la imagen del cuerpo:', responseBody.statusText);

            const get_data = await createNews({ data: data });
            console.log("🚀 ~ postNews ~ get_data:", get_data);

        } catch (error) {
            console.error("Error en postNews:", error);
        }
    };

    const navigate = useNavigate()

    const handleBackToList = () => {
        navigate(`/${page}`, { state: { updated: true }, replace: true, });
    };

    return (
        <div className="bg-white scroll-100">
            {contextHolder}
            <div className="flex-row-columns">
                <div className="flex columns">
                    <div className="btn-menu-header icon-container" onClick={handleBackToList} >
                        <ArrowLeftOutlined style={{ color: 'gray' }} />
                    </div>
                    <Popover>
                        <PopoverTrigger>
                            <div className="sub-flex-row-columns">
                                <FaNewspaper style={{ color: color.primary }} />
                                <a className="p-ellipsis"> {title || 'Página'}</a>
                            </div>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverBody>
                                    <p style={{ padding: 3, fontWeight: 'bold', fontSize: 12, marginBottom: '0px' }}>Título <span className="text-red-600">*</span></p>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Agregar un título"
                                        size='sm'
                                    />
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </div>
                <ButtonAntd onClick={postNews} type="primary" icon={<GoBook />}>
                    Publicar
                </ButtonAntd>
            </div>
            {!loading ? <div className="flex justify-center items-center h-full"> <FaSpinner className="animate-spin text-2xl text-blue-400" /> </div> :
                <div className="">
                    <div className="relative w-full">
                        <div className="relative_ hover-border-form" onClick={showDrawer}>
                            <button
                                type="button"
                                onClick={showDrawer}
                                className="text-white hover:text-blue-700 transition-colors duration-200 absolute left-5 top-5"
                            >
                                <FiEdit2 size={20} />
                            </button>
                            <img src={`./img/news/banner/${selectedBanner}.png`} alt={`img-banner-add-news`} className={"max-h-64 h-fit w-full md:h-95 object-cover news-banner-img"} loading="lazy" />
                            <input
                                type="hidden"
                                name="bannerUrl"
                                value={`./img/news/banner/${selectedBanner}.png`}
                            />
                        </div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 pt-4 rounded-lg max-w-[850px] w-full position-2">
                            <input
                                type="text"
                                placeholder="Agregar un título"
                                className="w-full bg-transparent text-white text-3xl font-medium placeholder-white placeholder-opacity-90 border-none outline-none focus:ring-0 p-2"
                                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="hover-border-form">
                            <div className="max-w-[850px] mx-auto px-4 pt-6">
                                <h1 class="flex-auto text-lg font-semibold text-blue-100">
                                    Resumen
                                </h1>
                                <div className="mb-6">
                                    <ReactQuill modules={modules} formats={formats} theme="snow" value={summary} onChange={setSummary} placeholder="Agregar resumen..." />
                                    {/*<div dangerouslySetInnerHTML={{ __html: summary }} />*/}
                                </div>
                            </div>
                            <div className="max-w-[850px] mx-auto px-4 pb-6">
                                <h1 class="text-lg font-semibold text-blue-100">
                                    Categoría
                                </h1>
                                <div className="flex items-center mb-3 space-x-2">
                                    <div className="relative flex-grow">
                                        <input
                                            type="text"
                                            placeholder="Buscar categoría..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                        />
                                        <FaSearch className="absolute right-3 top-2.5 text-gray-400 text-sm" />
                                    </div>
                                    {allSelected &&
                                        <button
                                            onClick={handleSelectAll}
                                            className={`px-3 py-2 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-offset-1 text-sm transition-colors duration-200 bg-red-400 hover:bg-red-500 focus:ring-red-400`}
                                        >
                                            Deseleccionar todos
                                        </button>
                                    }

                                </div>
                                <div className="flex columns flex-wrap gap-2">
                                    <AnimatePresence>
                                        {filteredCategories.map((category) => (
                                            <motion.div
                                                key={category.name}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <button
                                                    onClick={() => handleCategoryToggle(category.name)}
                                                    className={`w-full px-3 py-0.5 rounded-lg shadow-sm transition-all duration-200 text-sm ${selectedCategories.includes(category.name)
                                                        ? "bg-blue-400 text-white"
                                                        : "bg-white hover:bg-gray-100 text-gray-700"
                                                        }`}
                                                    aria-pressed={selectedCategories.includes(category.name)}
                                                >
                                                    <span className="text-lg mr-1.5" role="img" aria-hidden="true">
                                                        {category.icon}
                                                    </span>
                                                    {category.name}
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                            </div>
                        </div>
                        <Divider />
                        <div className="hover-border-form">
                            <div className="max-w-[850px] mx-auto px-4 py-6">
                                <h1 class="flex-auto text-lg font-semibold text-blue-100">
                                    Cuerpo del contenido
                                </h1>
                                <div className="mb-6">
                                    <ReactQuill modules={modules} formats={formats} theme="snow" value={body} onChange={setBody} placeholder="Agregar contenido..." />
                                    {/*<div dangerouslySetInnerHTML={{ __html: value }} />*/}
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.009 }}
                                    whileTap={{ scale: 1 }}
                                    className="relative border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer transition duration-300 ease-in-out hover:border-blue-500"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        accept="image/*, .png, .jpeg, .jpg, .gif"
                                        className="hidden"
                                    />
                                    {image ? (
                                        <img
                                            src={image}
                                            alt="img-body-add-news"
                                            //className="mx-auto max-h-48 rounded-md"
                                            className="w-full mx-auto object-cover rounded h-auto"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="text-gray-500">
                                            <FiUpload className="mx-auto text-3xl mb-2" />
                                            <p>Arrastre y suelte una imagen o haga clic para cargar</p>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                        <Divider />

                        <div className="hover-border-form">
                            <div className="max-w-[850px] mx-auto px-4 py-6">
                                <h1 class="flex-auto text-lg font-semibold text-blue-100">
                                    Añadir lista
                                </h1>
                                <div className="space-y-6">
                                    <div>
                                        <input
                                            type="text"
                                            id="title"
                                            value={formData.title}
                                            onChange={handleTitleChange}
                                            className={`mt-1 block w-full rounded focus:ring-0 border-none outline-none border border-gray-300 sm:text-sm ${errors.title ? 'border-red-500' : ''} bg-white py-2 transition duration-300 ease-in-out hover:bg-purple-50 focus:bg-white`}
                                            placeholder="Ingrese el título: p. ej. Ventajas y desventajas de..."
                                            aria-label="Título"
                                        />
                                        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                                    </div>

                                    <div className="space-y-4">
                                        {formData.data.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`bg-white rounded p-6 border-none outline-none border border-gray-300 transition-all duration-300 ${editingIndex === index ? 'ring-2 ring-primary-100' : ''}`}
                                            >
                                                <div className={`flex ${editingIndex !== index ? "justify-between" : "justify-end"} items-center`}>
                                                    {editingIndex !== index &&
                                                        <h3 className="text-lg font-semibold text-primary-100">
                                                            {item.name || "Sin nombre"}
                                                        </h3>
                                                    }
                                                    <div className="flex space-x-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleEditing(index)}
                                                            className="ring-primary-100 hover:text-blue-700 transition-colors duration-200"
                                                            aria-label={editingIndex === index ? "Guardar cambios" : "Editar campo"}
                                                        >
                                                            {editingIndex === index ? <FiCheck size={20} /> : <FiEdit2 size={20} />}
                                                        </button>
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFields(index)}
                                                                className="ring-primary-100 hover:text-blue-700 transition-colors duration-200"
                                                                aria-label="Eliminar campo"
                                                                disabled={isTitleEmpty}
                                                            >
                                                                <FiX size={20} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                {editingIndex === index ? (
                                                    <div className="space-y-4">
                                                        <div>
                                                            <input
                                                                type="text"
                                                                id={`name_${index}`}
                                                                value={item.name}
                                                                onChange={(e) => handleDataChange(index, 'name', e.target.value)}
                                                                className="mt-1 block w-full rounded-md sm:text-sm focus:ring-0 border-none outline-none border border-gray-300"
                                                            />
                                                            {errors[`name_${index}`] && <p className="mt-2 text-sm text-red-600">{errors[`name_${index}`]}</p>}
                                                        </div>
                                                        <div>
                                                            <ReactQuill id={`description_${index}`} modules={modules} formats={formats} theme="snow" value={item?.description} onChange={(value) => handleDataChange(index, 'description', value)} placeholder="Agregar descripción..." />
                                                            {errors[`description_${index}`] && <p className="mt-2 text-sm text-red-600">{errors[`description_${index}`]}</p>}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    //<p className="text-gray-600">{item.description || "Sin descripción"}</p>
                                                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div></div>
                                        <button
                                            type="button"
                                            onClick={addMoreFields}
                                            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-100 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:-translate-y-1 ${isTitleEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={isTitleEmpty}
                                        >
                                            <FiPlus className="mr-2" /> Añadir más
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider />

                        <div className="hover-border-form">
                            <div className="max-w-[850px] mx-auto px-4 py-6">
                                <h1 class="flex-auto text-lg font-semibold text-blue-100">
                                    Conclusiones
                                </h1>
                                <div className="mb-6">
                                    <ReactQuill modules={modules} formats={formats} theme="snow" value={conclusion} onChange={setConclusion} placeholder="Agregar resumen..." />
                                    {/*<div dangerouslySetInnerHTML={{ __html: summary }} />*/}
                                </div>
                            </div>
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
                    </div>
                </div>}
            <Drawer
                title="Banco de imágenes"
                placement={'right'}
                width={500}
                onClose={onClose}
                open={open}
            >
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((banner) => (
                        <div key={`img-banner-select-${banner}`} className="relative" onClick={() => handleBannerClick(banner)}>
                            <img
                                src={`img/news/banner/${banner}.png`}
                                alt={`img-banner-add-news-select-${banner}`}
                                className={`w-full h-auto cursor-pointer rounded border-2 ${selectedBanner === banner ? 'border-blue-500' : 'border-transparent'}`}
                                style={{ maxHeight: 45 }}
                            />
                            {selectedBanner === banner && (
                                <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                                    <FaCheck />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Drawer>
        </div>
    );
};

export default AddNews;

