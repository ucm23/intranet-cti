import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { FaFolder, FaFileImage, FaFilePowerpoint, FaFilePdf, FaFileWord, FaFileExcel, FaSpinner } from "react-icons/fa";
import {
    AiOutlineFile, AiOutlineDownload, AiOutlineDelete, AiOutlineShareAlt, AiOutlineClose, AiOutlineZoomIn, AiOutlineZoomOut, AiOutlineLeft, AiOutlineRight
} from "react-icons/ai";
import { FaClockRotateLeft } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import { VscError } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoChevronForwardSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { FcFolder } from "react-icons/fc";
import color from '../../color';
import { Empty, Typography } from 'antd';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Box,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    HStack,
    FormErrorMessage,
} from '@chakra-ui/react'
import {
    CloseOutlined
} from '@ant-design/icons';
//import InputColor from 'react-input-color';
import { createDocs, deleteDocuments, indexDocsImgs, indexDocuments, indexDocumentsByID } from '../../api/docs/docs';
import { createDepartments, indexDepartments } from '../../api/departamentos/departments';
import { createProjects, indexProjects } from '../../api/project/projects';
import { useImageCache } from '../../redux/ImageCacheProvider';
import { usePreviewFile } from '../../redux/PreviewFileContext';
import es from 'date-fns/locale/es';
import { format } from 'date-fns';
import { openNotificationWithIcon } from '../../libs/main';
import { notification } from 'antd';

const DocumentManager = () => {
    const [level, setLevel] = useState(0);
    const [projects, setProjects] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [uploadResults, setUploadResults] = useState([]);
    const { isOpen: isOpenProject, onOpen: onOpenProject, onClose: onCloseProject } = useDisclosure()
    const today = new Date();
    const tomorrow = new Date();

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, description) => openNotificationWithIcon(api, type, description)
    const [colors, setColor] = useState({});
    const [minEndDate, setMinEndDate] = useState('');

    const [formDataProjects, setFormDataProjects] = useState({
        name: '',
        description: '',
        start_date: today.toISOString().split('T')[0],
        end_date: tomorrow.toISOString().split('T')[0],
    });

    const handleStartDateChange = (e) => {
        const selectedStartDate = e.target.value;
        console.log("🚀 ~ handleStartDateChange ~ selectedStartDate:", selectedStartDate)
        if (selectedStartDate) {
            setFormDataProjects((prevData) => ({
                ...prevData,
                start_date: selectedStartDate,
            }));
            const nextDay = new Date(selectedStartDate);
            const tomorrow = new Date(nextDay.setDate(nextDay.getDate() + 1));
            setMinEndDate(tomorrow.toISOString().split('T')[0]);
            console.log("🚀 ~ handleStartDateChange ~ tomorrow.toISOString().split('T')[0]:", tomorrow.toISOString().split('T')[0])
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataProjects((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formDataProjects);
        if (!formDataProjects.name) {
            openNotification('warning', 'Añade un nombre');
            return;
        }
        if (projects.find(item => item?.name.trim().toLowerCase() == formDataProjects.name.trim().toLowerCase())) {
            openNotification('warning', 'Ya existe un projecto con el mismo nombre');
            return;
        }
        if (departments.find(item => item?.name.trim().toLowerCase() == formDataProjects.name.trim().toLowerCase())) {
            openNotification('warning', 'Ya existe un departamento con el mismo nombre');
            return;
        }
        const startDate = new Date(formDataProjects?.start_date);
        const endDate = new Date(formDataProjects?.end_date);

        if (startDate >= endDate) {
            openNotification('warning', "La Fecha de Inicio debe ser anterior a la Fecha de Fin.");
            return;
        }
        try {
            let data = {
                user_id: 1,
                ...formDataProjects,
                status: "activo",
                color: colors
            }
            if (!data?.description) delete data?.description;
            if (level === 1) delete data?.color;
            if (level === 2) {
                delete data?.start_date;
                delete data?.end_date;
                delete data?.user_id;
                delete data?.status;
            }
            let response = await level === 1 ? createProjects({ data }) : createDepartments({ data })
            console.log("🚀 ~ handleSubmit ~ response:", response)
        } catch (error) {
            console.error("🚀 ~ handleSubmit ~ error:", error)
        } finally {
            await level === 1 ? getProjects() : getDepartments()
            onCloseProject()
        }
    };

    const deleteItem = async ({ id }) => {
        try {
            let response = await deleteDocuments({ id })
            if (response?.status) await getDocuments()
            console.log("🚀 ~ deleteItem ~ response:", response);
        } catch (error) {
            console.error("🚀 ~ deleteItem ~ error:", error);
        }
    };

    useEffect(() => {
        getProjects()
        getDepartments()
        getDocuments()
        tomorrow.setDate(today.getDate() + 1);
    }, [])

    const getDocuments = async () => {
        try {
            const docs = await indexDocuments({})
            if (docs?.status) setDocuments(docs?.data)
        } catch (error) {
            console.error("🚀 ~ getDocuments ~ error:", error)
        } finally {
            setIsLoading(false);
        }
    }

    const getProjects = async () => {
        try {
            const projects = await indexProjects({})
            if (projects?.status) setProjects(projects?.data)
        } catch (error) {
            console.error("🚀 ~ getProjects ~ error:", error)
        }
    }
    const getDepartments = async () => {
        try {
            const depas = await indexDepartments({})
            if (depas?.status) setDepartments(depas?.data)
        } catch (error) {
            console.error("🚀 ~ getDepartments ~ error:", error)
        }
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [zoom, setZoom] = useState(100);
    const [images, setImages] = useState([])

    const closeModal = () => {
        setSelectedImage(null);
        setZoom(100);
    };

    const handleDownload = () => {
        //window.open(selectedImage.src, "_blank");
    };

    const handleShare = () => {
        /*if (navigator.share) {
            navigator.share({
                title: selectedImage.name,
                url: selectedImage.src
            });
        }*/
    };

    const handleDelete = ({ id }) => {
        closeModal();
        deleteItem({ id })
    }
    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (selectedIndex !== null && selectedIndex !== undefined) {
                if (event.key === "ArrowLeft") handlePrevious();
                if (event.key === "ArrowRight") handleNext();
            }
            if (event.key === "Escape") closeModal();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex]);

    const handlePrevious = () => {
        const newIndex = (selectedIndex - 1 + images.length) % images.length;
        setSelectedIndex(newIndex);
        setSelectedImage(images[newIndex]);
        setZoom(100);
        console.log("Previous index:", selectedIndex, "New index:", newIndex);
    };

    const handleNext = () => {
        const newIndex = (selectedIndex + 1) % images.length;
        setSelectedIndex(newIndex);
        setSelectedImage(images[newIndex]);
        setZoom(100);
        console.log("handleNext index:", selectedIndex, "New index:", newIndex);
    };

    const handleProjectSelect = (project) => {
        console.log("🚀 ~ handleProjectSelect ~ project:", project)
        setIsLoading(true);
        setSelectedProject(project);
        setLevel(1);
        setIsLoading(false);
    };

    const handleDepartmentSelect = (department) => {
        setSelectedDepartment(department);
        setLevel(2);
    };

    const handleNavigateBack = (targetLevel) => {
        setLevel(targetLevel);
        if (targetLevel === 0) {
            setSelectedProject(null);
            setSelectedDepartment(null);
        } else if (targetLevel === 1) setSelectedDepartment(null);
    };

    const filteredDocumentsForLevel = () => {
        if (level === 0) return documents.filter(doc => doc.project_id === null && doc.department_id === null);
        if (level === 1) return documents.filter(doc => doc.project_id === selectedProject?.id && doc.department_id === null);
        if (level === 2) return documents.filter(doc => doc.project_id === selectedProject?.id && doc.department_id === selectedDepartment?.id);
        return [];
    };

    const handleButtonClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    const menus = {
        project: [
            { option: 'Proyecto nuevo', onClick: onOpenProject },
            { option: 'Subir archivo [Nivel proyecto]', onClick: handleButtonClick },
        ],
        department: [
            { option: 'Departamento nuevo', onClick: onOpenProject },
            { option: 'Subir archivo [Nivel departamento]', onClick: handleButtonClick },
        ],
        documents: [
            { option: 'Subir archivo', onClick: handleButtonClick },
        ],
    }

    const MenuGeneric = ({ type }) => {
        return (
            <MenuList>
                {menus[type].map((item, index) => (
                    <MenuItem key={`menus-${index}`} onClick={() => item?.onClick()}>{item?.option}</MenuItem>
                ))}
            </MenuList>
        )
    }

    const Breadcrumbs = ({ level, projectName, departmentName, onNavigateBack }) => {
        const goBack = (index) => {
            onNavigateBack(index)
            setPreviewFile(index ? selectedProject : null)
        }
        return (
            <div className="text-sm text-gray-500 space-x-2 mb-0 flex flex-row items-center content-center pl-0" style={{ marginLeft: 8 }}>
                <Menu isLazy>
                    <MenuButton style={{ marginLeft: -16 }} _hover={{ bg: 'transparent' }} onClick={() => goBack(0)} as={Button} colorScheme='teal' variant='ghost' rightIcon={level === 0 ? <IoMdArrowDropdown /> : null}>
                        root
                    </MenuButton>
                    {level === 0 && <MenuGeneric type={'project'} />}
                    <input
                        type="file"
                        ref={inputFileRef}
                        style={{ display: 'none' }}
                        onChange={(e) => handleDrop(e, false)}
                        multiple
                    />
                </Menu>
                {level > 0 && (
                    <>
                        <IoChevronForwardSharp />
                        <Menu isLazy>
                            <MenuButton onClick={() => level != 1 && goBack(1)} as={Button} colorScheme='teal' variant='ghost' rightIcon={level === 1 ? <IoMdArrowDropdown /> : null}>
                                {projectName}
                            </MenuButton>
                            {level == 1 && <MenuGeneric type={'department'} />}
                        </Menu>
                    </>
                )}
                {level > 1 && (
                    <>
                        <IoChevronForwardSharp />
                        <Menu isLazy>
                            <MenuButton /*onClick={() => level < 2 && onNavigateBack(2)}*/ as={Button} colorScheme='teal' variant='ghost' rightIcon={level === 2 ? <IoMdArrowDropdown /> : null}>
                                {departmentName}
                            </MenuButton>
                            {level == 2 && <MenuGeneric type={'documents'} />}
                        </Menu>
                    </>
                )}
                {/*level === 2 && (
                    <>
                        <IoChevronForwardSharp />
                        <Menu isLazy>
                            <MenuButton as={Button} colorScheme='teal' variant='ghost' rightIcon={level === 2 ? <IoMdArrowDropdown /> : null}>
                                Documentos
                            </MenuButton>
                            {level == 2 && <MenuGeneric />}
                        </Menu>
                    </>
                )*/}
            </div>
        );
    };

    const ProjectList = ({ isLoading, projects, onProjectSelect, project_id }) => {
        return (
            <div>
                <h2 className="text-sm font-semibold text-gray-800 mb-3">Proyectos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {projects.map((folder) => (
                        <div
                            key={folder.id}
                            className="p-3 rounded hover:shadow-md transition-shadow duration-200 cursor-pointer"
                            style={{ backgroundColor: color?.bgFiles }}
                            onClick={() => handleFilePreview(folder)}
                            onDoubleClick={() => {
                                //handleFilePreview({ ...folder, type: 'folder_projs' })
                                onProjectSelect(folder)
                            }}
                        >
                            <div className="flex items-center space-x-2">
                                <FaFolder style={{ fontSize: 18 }} className="text-yellow-400" />
                                <div className="flex-1">
                                    <h3 className="font-normal text-sm text-gray-800 line-clamp-1">{folder.name}</h3>
                                    <p className="text-sm text-gray-500 pb-0 line-clamp-1">{departments.length} elementos</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const DepartmentList_ = ({ isLoading, departments, documents, project_id, department_id, onDepartmentSelect }) => {
        return (
            <div>
                <h2 className="text-sm font-semibold text-gray-800 mb-3">Departamentos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {departments.map((folder) => {
                        const linkedDocs = documents.filter(doc => doc.department_id === folder.id && doc.project_id === project_id);
                        return (
                            <div
                                key={folder.id}
                                className="p-3 rounded hover:shadow-md transition-shadow duration-200 cursor-pointer"
                                style={{ backgroundColor: color?.bgFiles }}
                                onClick={() => handleFilePreview(folder)}
                                onDoubleClick={() => {
                                    onDepartmentSelect(folder);
                                }}
                            >
                                <div className="flex items-center space-x-2">
                                    <FaFolder style={{ fontSize: 18, color: folder?.color }}/* className="text-yellow-400" */ />
                                    <div className="flex-1">
                                        <h3 className="font-normal text-sm text-gray-800 line-clamp-1">{folder?.name}</h3>
                                        <p className="text-sm text-gray-500 pb-0 line-clamp-1">{linkedDocs.length} elementos</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    };

    //const [previewFile, setPreviewFile_] = useState(null);
    const { previewFile, setPreviewFile } = usePreviewFile()
    const handleFilePreview = (file) => {
        setPreviewFile(null)
        setPreviewFile(file);
    };


    const handlePreview = useCallback((file, modal, index) => {
        if (modal) {
            setSelectedIndex(index);
            setSelectedImage(file);
            setZoom(100);
        }
        handleFilePreview(file);
    }, [handleFilePreview]);

    /*const handleDocs = useCallback((file) => {
        setPreviewFile(file);
    }, [handleFilePreview]);*/

    const handleDocs = async (file) => {
        //setPreviewFile(file);
        try {
            const pdf = await indexDocumentsByID({ id: file?.id, blob: false });
            const docUrl = pdf?.data;
            window.open(docUrl, '_blank');
        } catch (error) {
            console.error("Error en la llamada a la API:", error);
            throw new Error('Error al obtener el documento');
        }
    };

    const DocumentList = ({ isLoading, documents }) => {
        return (
            isLoading ? <div className="flex justify-center items-center height-icon-500"> <FaSpinner style={{ fontSize: 25 }} className="animate-spin text-blue-400" /> </div> :
                <div>
                    {documents.length === 0 ?
                        <div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            <Empty
                                //image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                image="../img/empty_folder.png"
                                imageStyle={{
                                    height: 250,
                                }}
                                description={
                                    <Typography.Text>
                                        <p className="text-center font-bold text-lg text-black mt-3 mb-0">Arrastra y suelta los archivos aquí</p>
                                        <p className="text-center text-gray-600 mt-0">o usa el botón "Nuevo"</p>
                                    </Typography.Text>
                                }
                            />
                        </div>
                        : <div>
                            <h2 className="text-sm font-semibold text-gray-800 my-3">Documentos</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 pb-24">
                                {documents.map((file, index) => (
                                    <div
                                        key={file.id}
                                        className="rounded hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden"
                                        style={{ backgroundColor: color?.bgFiles }}
                                        onClick={() => handlePreview(file)}
                                        onDoubleClick={() => {
                                            if (file.type.startsWith('image')) {
                                                setImages(documents.filter(item => item.type.startsWith('image')));
                                                handlePreview(file, true, index)
                                            } else {
                                                handleDocs(file)
                                            }
                                        }}
                                    >
                                        <div className="p-3 pb-0">
                                            {/*<img
                                                src={file.thumbnail}
                                                alt={file.name}
                                                className="w-full h-32 object-cover rounded"
                                            />*/}
                                            {file?.type.startsWith('image') ? <ImageLoader id={file?.id} className={"w-full h-32 object-cover rounded"} /> :
                                                <div className='flex w-full h-32 object-cover rounded items-center justify-center'>
                                                    <span style={{ transform: 'scale(4)', display: 'inline-block' }}>{getFileIcon(file?.type)}</span>
                                                </div>}
                                        </div>
                                        <div className="p-3 pt-2">
                                            <div className="flex items-center justify-between space-x-2">
                                                <div className="flex items-center space-x-2 flex-1 min-w-0 truncate line-clamp-1">
                                                    {getFileIcon(file?.type)}
                                                    <span className="font-medium text-gray-800 truncate line-clamp-1">{file.name}</span>
                                                </div>
                                                {/*<BsThreeDotsVertical className="text-gray-400 flex-shrink-0" />*/}
                                                <Menu isLazy>
                                                    <MenuButton _hover={{ bg: 'transparent' }} /*as={Button}*/ colorScheme='teal' variant='ghost'>
                                                        <BsThreeDotsVertical className="text-gray-400 pl-0 ml-0 flex-shrink-0" />
                                                    </MenuButton>
                                                    <MenuList>
                                                        <MenuItem onClick={() => {
                                                            handlePreview(file);
                                                            if (file.type.startsWith('image')) {
                                                                setImages(documents.filter(item => item.type.startsWith('image')));
                                                                handlePreview(file, true, index);
                                                            } else handleDocs(file);
                                                        }} >Abrir</MenuItem>
                                                        <MenuItem onClick={() => deleteItem({ id: file?.id })}>Eliminar</MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
        );
    };

    const ImageLoader = memo(({ id, className, style }) => {
        const [imageUrl, setImageUrl] = useState(null);
        const { imageCache, updateImageCache } = useImageCache()

        useEffect(() => {
            if (imageCache[id]) setImageUrl(imageCache[id]);
            else loadURL();
        }, [id, imageCache]);

        const loadURL = async () => {
            const img = await indexDocsImgs({ id, thumbnail: true });
            if (img?.data) {
                updateImageCache(id, img.data);
                setImageUrl(img.data);
            }
        };
        return !imageUrl ? <div className="flex h-full justify-center items-center"> <FaSpinner className="animate-spin text-2xl text-blue-400" /> </div> :
            <img src={imageUrl} alt={`img-loader-1${id * 2}`} style={style} className={className} loading="lazy" onError={(e) => { e.target.src = '../400.png'; }} />
    });

    const PDFLoader = ({ id, className }) => {
        const [imageUrl, setImageUrl] = useState(null);

        useEffect(() => {
            const loadURL = async () => {
                const pdf = await indexDocumentsByID({ id, blob: false });
                console.log("🚀 ~ loadURL ~ pdf:", pdf)
                //const blob = new Blob([pdf], { type: 'text/plain' });
                //console.log("🚀 ~ loadURL ~ blob:", typeof blob, blob)
                setImageUrl(pdf?.data);
                //const response = await fetch(`${baseURL}/documents/${id}?blob=false`);
                /*const blob = await response?.blob();
                console.log("🚀 ~ loadURL ~ response:", response)
                console.log("🚀 ~ loadURL ~ blob:", blob)
                const blobUrl = URL.createObjectURL(blob);
                console.log("🚀 ~ loadURL ~ blobUrl:", blobUrl)*/
                /*let data = await response.text();
                console.log("🚀 ~ loadURL ~ response:", response)
                setImageUrl(data?.data?.signedUrl);*/
            };
            loadURL()
            /*return () => {
                if (imageUrl) {
                    URL.revokeObjectURL(imageUrl);
                }
            };*/
        }, [id]);
        //div-pdf
        return (imageUrl ?
            <div className={`${className}`}>
                {/*<PDFViewerComp
                    key='view'
                    file={imageUrl} />*/}
                <iframe
                    src={imageUrl}
                    width="100%"
                    height="600px"
                    title="PDF Viewer"
                    style={{ border: 'none' }}
                ></iframe>
                <object
                    data={imageUrl}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                    aria-label="PDF Viewer"
                >
                    <p>Tu navegador no soporta PDF, por favor descarga el PDF <a href={imageUrl}>aquí</a>.</p>
                </object>
            </div>
            : <p>Cargando...</p>);
    };

    const SkeletonItem = () => (
        <div className="bg-gray-300 h-6 w-48 mb-4 animate-pulse rounded-md"></div>
    );

    const [filesLoad, setFilesLoad] = useState([])

    const handleDrop = async (event, mode) => {
        console.log("🚀 ~ handleDrop ~ event:", event)

        event.preventDefault();
        setUploadResults([])
        //let files = [];
        /*if (!mode) files = Array.from(event.target.files);
        else files = Array.from(event.dataTransfer.files);*/
        const files = mode ? Array.from(event.dataTransfer.files) : Array.from(event.target.files);
        if (!files.length) return;
        let count = 0;
        //if (files.length > 0) {
        setFilesLoad(files);
        setVisibleDrog(false);
        setIsLoading(true);
        setVisibleList(true)
        try {
            for (const file of files || []) {
                let data = new FormData();
                data.append("file", file);
                data.append("name", file.name);
                data.append("type", file.type);

                if (level === 1) data.append("project_id", selectedProject?.id);
                if (level === 2) {
                    data.append("project_id", selectedProject?.id);
                    data.append("department_id", selectedDepartment?.id);
                }
                let success = false;
                try {
                    const { status } = await createDocs({ data });
                    /*console.log("🚀🚀 🚀 ~ Archivo cargado:", get_data);
                    if (get_data?.status == 413 || get_data?.status == 0) success = 2
                    if (get_data?.status == 201) success = 1*/

                    //success = status === 201 ? 1 : (status === 413 || status === 0) ? 2 : 0;
                    success = status === 201 ? 1 : 2;
                    count += 1;
                } catch (error) {
                    console.error("Error al subir archivo:", error);
                    success = 2
                } finally {
                    setUploadResults((prevResults) => [...prevResults, { fileName: file.name, success }]);
                }
            }
        } catch (error) {
            console.log("🚀 ~ handleDrop ~ error general:", error);
        } finally {
            await getDocuments();
            setIsLoading(false);
        }

    };

    const inputFileRef = useRef(null);
    const [visibleDrog, setVisibleDrog] = useState(false)
    const [visibleList, setVisibleList] = useState(false)

    const handleDragOver = (event) => {
        setVisibleDrog(true)
        event.preventDefault();
    };

    const handleDragLeave = () => {
        setVisibleDrog(false)
    };

    const icons = {
        "image/png": <FaFileImage style={{ fontSize: 15 }} color="red" />,
        "image/jpeg": <FaFileImage style={{ fontSize: 15 }} color="red" />,
        "jpeg": <FaFileImage style={{ fontSize: 15 }} color="red" />,
        "image/jpg": <FaFileImage style={{ fontSize: 15 }} color="red" />,
        "image/svg+xml": <FaFileImage style={{ fontSize: 15 }} color="red" />,
        "application/pdf": <FaFilePdf style={{ fontSize: 15 }} color="red" />,
        "application/msword": <FaFileWord style={{ fontSize: 15 }} color="blue" />,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": <FaFileWord style={{ fontSize: 15 }} color="blue" />,
        "application/vnd.ms-powerpoint": <FaFilePowerpoint style={{ fontSize: 15 }} color="orange" />,
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": <FaFilePowerpoint style={{ fontSize: 15 }} color="orange" />,
        "application/vnd.ms-excel": <FaFileExcel style={{ fontSize: 15 }} color="green" />,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": <FaFileExcel style={{ fontSize: 15 }} color="green" />,
        "default": <AiOutlineFile style={{ fontSize: 15 }} color="gray" />,
        "folder_projs": <FcFolder style={{ fontSize: 15 }} color="gray" />,
        "folder_depts": <FaFolder style={{ fontSize: 15 }} color="gray" />,
    };

    const types = {
        "image/png": "Imagen",
        "image/jpeg": "Imagen",
        "jpeg": "Imagen",
        "image/jpg": "Imagen",
        "image/svg+xml": "Hojas de cálculo",
        "application/pdf": "Documento PDF",
        "application/msword": "Documento de texto",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Documento de texto",
        "application/vnd.ms-powerpoint": "Presentación de diapositivas",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": "Presentación de diapositivas",
        "application/vnd.ms-excel": "Hojas de cálculo",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "Hojas de cálculo",
        "default": "Archivo binario",
        "folder_project": "Proyecto",
        "folder_depts": "Departamento",
    };

    const getFileIcon = (fileType) => icons[fileType] || icons["default"];
    //const getFileIcon = (fileType) => icons[fileType];

    //className="w-full max-h-[70vh] object-contain"

    return (
        <div className="mx-auto pr-4 pb-8 bgwhite">
            {contextHolder}
            <div className="flex" style={{ width: '100%' }}>
                <div className="mx-auto pb-8 content-scroll-auto" style={{ flex: '1' }}>
                    <div className="flex justify-between items-center mb-2 pl-6 mt-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-0 pb-0 mt-8" style={{ paddingLeft: 8 }}>Gestor de archivos</h2>
                        {/*<ButtonAntd
                            icon={<PlusOutlined />}
                            //onClick={() => navigate("/addnews")}
                            type="primary">
                            Añadir
                        </ButtonAntd>*/}
                    </div>
                    <div className="p-4 pt-0 pb-0">
                        <Breadcrumbs
                            level={level}
                            projectName={selectedProject?.name}
                            departmentName={selectedDepartment?.name}
                            onNavigateBack={handleNavigateBack}
                        />
                        <Box
                            onDrop={(e) => handleDrop(e, true)}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`${visibleDrog && 'bg-border-blue'} height-75vh`}
                            style={{ padding: 8, }}
                        >
                            {level === 0 && (
                                <>
                                    <ProjectList isLoading={isLoading} projects={projects} onProjectSelect={handleProjectSelect} project_id={selectedProject?.id} />
                                    <DocumentList isLoading={isLoading} documents={filteredDocumentsForLevel()} />
                                </>
                            )}
                            {level === 1 && (
                                <>
                                    <DepartmentList_ isLoading={isLoading} departments={departments} documents={documents} department_id={selectedDepartment?.id} project_id={selectedProject?.id} onDepartmentSelect={handleDepartmentSelect} />
                                    <DocumentList isLoading={isLoading} documents={filteredDocumentsForLevel()} />
                                </>
                            )}
                            {level === 2 && <DocumentList isLoading={isLoading} documents={filteredDocumentsForLevel()} />}
                        </Box>
                    </div>
                </div>
                <div className="border-l pl-4 pt-4" style={{ width: '300px' }}>
                    {previewFile ? (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Detalles</h3>
                            <div className="aspect-video bg-gray-100 rounded overflow-hidden">
                                {previewFile?.type &&
                                    previewFile?.type.startsWith('image') ?
                                    <ImageLoader id={previewFile?.id} className={"w-full h-full object-cover"} /> :
                                    <div className='flex w-full h-full items-center justify-center'>
                                        <span style={{ transform: 'scale(4)', display: 'inline-block' }}>
                                            {/*getFileIcon(previewFile?.type)*/}
                                            {previewFile?.type ?
                                                getFileIcon(previewFile?.type) :
                                                previewFile?.color ? <FaFolder style={{ fontSize: 15 }} color={previewFile?.color} /> : getFileIcon('folder_projs')
                                            }
                                        </span>
                                    </div>}
                            </div>
                            <div className="space-y-3">
                                <p className="font-small">
                                    <span className='font-semibold'>Nombre</span> <br />
                                    {previewFile.name}
                                </p>
                                <p className="font-small">
                                    <span className='font-semibold'>Tipo</span>  <br />
                                    {previewFile?.type ?
                                        types[previewFile.type] || types['default'] :
                                        previewFile?.color ? 'Departamento' : 'Proyecto'
                                    }
                                </p>
                                <p className="font-small">
                                    <span className='font-semibold'>Creado</span>  <br />
                                    {format(new Date(previewFile.created_at), "d 'de' MMMM yyyy h:mm aa", { locale: es }).replace('AM', 'am').replace('PM', 'pm')}
                                </p>
                                <p className="font-small">
                                    <span className='font-semibold'>Modificado</span>
                                    <div className='flex flex-row items-center gap-1'>
                                        {format(new Date(previewFile.updated_at), "d 'de' MMMM yyyy h:mm aa", { locale: es }).replace('AM', 'am').replace('PM', 'pm')}
                                        <FaClockRotateLeft style={{ fontSize: 15 }} color="gray" />
                                    </div>


                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <Empty
                                image="../img/empty_details.png"
                                imageStyle={{
                                    height: 200,
                                }}
                                description={
                                    <Typography.Text>
                                        <p className="text-center text-gray-600 mt-0">Selecciona un elemento para ver los detalles</p>
                                    </Typography.Text>
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    right: 20,
                    bottom: 20,
                    backgroundColor: 'white',
                    border: '0.5px solid gray',
                    borderRadius: 5,
                    display: visibleList ? 'flex' : 'none',
                    flexDirection: 'column',
                    width: 330
                }}
            >
                <div className='head-bottom'>
                    <h1 style={{ fontSize: '1rem' }} className='font-semibold'>{filesLoad.length} elementos</h1>
                    <CloseOutlined onClick={() => setVisibleList(false)} />
                </div>
                <div>
                    {filesLoad.map((file, index) => (
                        <div key={index} className='flex items-center flex-row p-2.5 justify-between'>
                            <div className='flex items-center flex-row'>
                                {getFileIcon(file?.type)}
                                <h1 style={{ fontSize: '1rem' }} className='font-semibold mb-0 pl-2.5 line-clamp-1'>
                                    {file.name}
                                </h1>
                            </div>
                            <h1 style={{ fontSize: 13 }}>
                                {!uploadResults[index]?.success ? <FaSpinner className="animate-spin text-blue-400" /> :
                                    uploadResults[index]?.success == 1 ? <CiCircleCheck color='green' /> : <VscError color='blue' />
                                }
                            </h1>
                        </div>
                    ))}
                </div>
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-opacity-30 flex flex-col w-full h-full z-50 transition-opacity duration-300">
                    <div className="w-full h-full flex flex-col">
                        <div className="flex items-center justify-between px-1 z-10 height-46" style={{ backgroundColor: '#515151f0' }}>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={closeModal}
                                    className="p-2 text-white"
                                    aria-label="Close modal"
                                >
                                    <AiOutlineClose className="w-5 h-5" />
                                </button>
                                <h3 className="text-sm font-semibold text-white pb-0 mb-0">{selectedImage.name}</h3>
                            </div>
                            <div className="flex gap-2">
                                {/*<button
                                    onClick={handleDownload}
                                    className="p-2 hover:bg-gray-800 rounded-full text-blue-400"
                                    aria-label="Download image"
                                >
                                    <AiOutlineDownload className="w-5 h-5" />
                                </button>*/}
                                {/*<button
                                    onClick={handleShare}
                                    className="p-2 hover:bg-gray-800 rounded-full text-green-400"
                                    aria-label="Share image"
                                >
                                    <AiOutlineShareAlt className="w-5 h-5" />
                                </button>*/}
                                <button
                                    onClick={() => handleDelete({ id: selectedImage?.id }) }
                                    className="p-2 hover:bg-gray-800 rounded-full text-red-400"
                                    aria-label="Delete image"
                                >
                                    <AiOutlineDelete className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center p-4 pt-0 relative">
                            <button
                                onClick={handlePrevious}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all z-50"
                            >
                                <AiOutlineLeft className="w-6 h-6" />
                            </button>
                            <div className="relative w-full flex items-center justify-center">
                                {selectedImage?.type.startsWith('image') && <ImageLoader style={{ transform: `scale(${zoom / 100})` }} id={selectedImage?.id} className="max-w-[70%] max-h-[70%] object-contain transition-transform duration-300 ease-in-out shadow-xl" />}
                                {selectedImage?.type.endsWith('pdf') && <PDFLoader id={selectedImage?.id} className="max-w-[70%] max-h-[70%] object-contain transition-transform duration-300 ease-in-out shadow-xl" />}
                                {selectedImage?.type.startsWith('image') &&
                                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4 p-3 rounded-full bg-black bg-opacity-50 position-fixed-50">
                                        <button
                                            onClick={handleZoomOut}
                                            className="text-white hover:text-gray-300 transition-colors"
                                            disabled={zoom <= 50}
                                        >
                                            <AiOutlineZoomOut className="w-6 h-6" />
                                        </button>
                                        <span className="text-white text-sm font-medium min-w-[60px] text-center">
                                            {zoom}%
                                        </span>
                                        <button
                                            onClick={handleZoomIn}
                                            className="text-white hover:text-gray-300 transition-colors"
                                            disabled={zoom >= 200}
                                        >
                                            <AiOutlineZoomIn className="w-6 h-6" />
                                        </button>
                                    </div>}
                            </div>
                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all"
                            >
                                <AiOutlineRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Modal isOpen={isOpenProject} onClose={onCloseProject} isCentered motionPreset='scale'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{!level == 1 ? 'Proyecto' : 'Departamento'} nuevo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className='gap-3 space-y-3'>
                            <FormControl id="name" isRequired>
                                <FormLabel>Nombre</FormLabel>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <Input
                                        name="name"
                                        value={formDataProjects.name}
                                        onChange={handleChange}
                                        placeholder="Introduce el nombre"
                                    />
                                    {/*<InputColor
                                        initialValue={'#5e72e4'}
                                        //name="name"
                                        //onChange={(value) => handleChange({ target: { name: 'color', value } })}
                                        onChange={setColor}
                                        className='css-1yn2e29-InputColor_'
                                        placement="right"
                                    />*/}
                                </div>
                            </FormControl>
                            <FormControl id="description">
                                <FormLabel>Descripción</FormLabel>
                                <Textarea
                                    name="description"
                                    value={formDataProjects.description}
                                    onChange={handleChange}
                                    placeholder="Introduce la descripción"
                                />
                            </FormControl>
                            {!level == 1 &&
                                <div className='flex flex-row gap-3'>
                                    <FormControl id="start_date" isRequired>
                                        <FormLabel>Fecha de Inicio</FormLabel>
                                        <Input
                                            type="date"
                                            name="start_date"
                                            value={formDataProjects.start_date}
                                            onChange={handleStartDateChange}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </FormControl>
                                    <FormControl id="end_date" isRequired>
                                        <FormLabel>Fecha de Fin</FormLabel>
                                        <Input
                                            type="date"
                                            name="end_date"
                                            value={formDataProjects.end_date}
                                            onChange={handleChange}
                                            min={minEndDate}
                                            disabled={!formDataProjects?.start_date || false}
                                        />
                                    </FormControl>
                                </div>}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' onClick={onCloseProject}>
                            Cancelar
                        </Button>
                        <Button variant='ghost' onClick={handleSubmit}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};
export default DocumentManager;