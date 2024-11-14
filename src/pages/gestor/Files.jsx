import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { FaFolder, FaSpinner } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineClose, AiOutlineZoomIn, AiOutlineZoomOut, AiOutlineLeft, AiOutlineRight, AiOutlineShareAlt } from "react-icons/ai";
import { FaClockRotateLeft } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import { VscError } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoChevronForwardSharp } from "react-icons/io5";
import { FiMaximize2, FiMinimize2, FiEye } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import color from '../../color';
import { RiFolderSharedLine, RiUpload2Line, RiStickyNoteLine } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Menu, MenuButton, MenuList, MenuItem, Button, Box, useDisclosure, FormControl, FormLabel, Input, Textarea, Portal } from '@chakra-ui/react'
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow } from '@chakra-ui/react'
import { CloseOutlined } from '@ant-design/icons';
import { LuUserPlus2 } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";
import { RxDragHandleDots2 } from "react-icons/rx";
import { createDocs, deleteDocuments, indexDocsImgs, indexDocuments, indexDocumentsByID, updateDoc } from '../../api/docs/docs';
import { createDepartments, indexDepartments } from '../../api/departamentos/departments';
import Chip from '../../components/Chip'
import { createProjects, indexProjects } from '../../api/project/projects';
import { useImageCache } from '../../redux/ImageCacheProvider';
import { usePreviewFile } from '../../redux/PreviewFileContext';
import es from 'date-fns/locale/es';
import { format } from 'date-fns';
import { baseURL, formats_, icons, modules_, openNotificationWithIcon, types } from '../../libs/main';
import { notification, Tooltip, Avatar, List, Empty, Typography, } from 'antd';
import { useSelector } from 'react-redux';
import { indexUsers } from '../../api/users/users';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ColorRing } from 'react-loader-spinner'

const DocumentManager = () => {
    const information_user = useSelector(state => state.login.information_user);
    const { id: user_id, role } = information_user;
    const [level, setLevel] = useState(0);
    const [projects, setProjects] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [uploadResults, setUploadResults] = useState([]);
    const { isOpen: isOpenProject, onOpen: onOpenProject, onClose: onCloseProject } = useDisclosure()
    const { isOpen: isOpenShare, onOpen: onOpenShare, onClose: onCloseShare } = useDisclosure()
    const { isOpen: isOpenMove, onOpen: onOpenMove, onClose: onCloseMove } = useDisclosure()
    const { isOpen: isOpenNote, onOpen: onOpenNote, onClose: onCloseNote } = useDisclosure()
    const today = new Date();
    const tomorrow = new Date();
    const modalRef = useRef(null);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, description) => openNotificationWithIcon(api, type, description)
    const [colors, setColor] = useState({});
    const [minEndDate, setMinEndDate] = useState('');
    const [selected, setSelected] = useState([]);
    const [selectedShare, setSelectedShare] = useState([]);
    const [users, setUsers] = useState([]);

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
        const projectName = formDataProjects.name?.trim();
        if (!projectName) {
            openNotification('warning', 'Añada un nombre');
            return;
        }
        const projectExists = projects.some(item => item?.name.trim().toLowerCase() === projectName.toLowerCase());
        const departmentExists = departments.some(item => item?.name.trim().toLowerCase() === projectName.toLowerCase());

        if (projectExists || departmentExists) {
            openNotification('warning',
                projectExists
                    ? 'Ya existe un proyecto con el mismo nombre'
                    : 'Ya existe un departamento con el mismo nombre'
            );
            return;
        }
        const startDate = new Date(formDataProjects?.start_date);
        const endDate = new Date(formDataProjects?.end_date);
        if (level < 1 && startDate >= endDate) {
            openNotification('warning', "La Fecha de Inicio debe ser anterior a la Fecha de Fin.");
            return;
        }
        let data = {
            user_id,
            ...formDataProjects,
            status: "activo",
            color: colors
        };
        if (!data.description) delete data.description;
        if (level < 1) {
            data.departments_ids = selected.flatMap(item => item?.id);
            if (data.departments_ids.length === 0) {
                openNotification('warning', "Debe seleccionar al menos un departamento.");
                return;
            }
            delete data.color;
        } else if (level === 1) {
            delete data.start_date;
            delete data.end_date;
            delete data.user_id;
            delete data.status;
            data.color = '#B6B6B6';
        }
        try {
            setIsLoading(true);
            console.log("🚀 ~ handleSubmit ~ data:", data);
            const response = level < 1 ? await createProjects({ data }) : await createDepartments({ data });
            console.log("🚀 ~ handleSubmit ~ response:", response);
            await (level < 1 ? getProjects() : getDepartments());
            defaultModal();
        } catch (error) {
            console.error("🚀 ~ handleSubmit ~ error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteItem = async ({ id }) => {
        try {
            let response = await deleteDocuments({ id })
            if (response?.status) await getDocuments()
        } catch (error) {
            console.error("🚀 ~ deleteItem ~ error:", error);
        } finally {
            setPreviewFile(null)
        }
    };

    const getUsers = async () => {
        const { status, data } = await indexUsers({})
        if (status) setUsers(data);
    };

    useEffect(() => {
        //setPreviewFile(null)
        getUsers()
        getProjects()
        getDepartments()
        getDocuments()
        tomorrow.setDate(today.getDate() + 1);
    }, [])

    const getDocuments = async () => {
        try {
            const { status, data } = await indexDocuments({})
            if (status) setDocuments(data)
        } catch (error) {
            console.error("🚀 ~ getDocuments ~ error:", error)
        } finally {
            setIsLoading(false);
        }
    }

    const getProjects = async () => {
        try {
            const { status, data } = await indexProjects({})
            if (status) setProjects(data)
        } catch (error) {
            console.error("🚀 ~ getProjects ~ error:", error)
        }
    }

    const getDepartments = async () => {
        try {
            const { status, data } = await indexDepartments({})
            if (status) setDepartments(data)
        } catch (error) {
            console.error("🚀 ~ getDepartments ~ error:", error)
        }
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [zoom, setZoom] = useState(100);
    const [images, setImages] = useState([])

    const closeModal = () => {
        setSelectedImage(null);
        setZoom(100);
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
    };

    const handleNext = () => {
        const newIndex = (selectedIndex + 1) % images.length;
        setSelectedIndex(newIndex);
        setSelectedImage(images[newIndex]);
        setZoom(100);
    };

    const handleProjectSelect = (project) => {
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

    const openNote = () => {
        let data = users.map(item => ({ ...item }))
        setSelectedShare(data);
        onOpenNote()
    }

    const menus = {
        project: [
            { option: 'Proyecto nuevo', icon: <RiFolderSharedLine />, onClick: onOpenProject },
            { option: 'Crear archivo de notas', icon: <RiStickyNoteLine />, onClick: openNote },
            { option: 'Subir archivo', icon: <RiUpload2Line />, onClick: handleButtonClick },
        ],
        department: [
            //{ option: 'Departamento nuevo', onClick: onOpenProject },
            { option: 'Crear archivo de notas', icon: <RiStickyNoteLine />, onClick: openNote },
            { option: 'Subir archivo', icon: <RiUpload2Line />, onClick: handleButtonClick },
        ],
        documents: [
            { option: 'Crear archivo de notas', icon: <RiStickyNoteLine />, onClick: openNote },
            { option: 'Subir archivo', icon: <RiUpload2Line />, onClick: handleButtonClick },
        ],
    }

    const MenuGeneric = ({ type }) => {
        const filteredMenus = menus[type].filter(item => {
            if (role === 'editor' && item.option === 'Proyecto nuevo') return false;
            return true;
        });
        return (
            <MenuList>
                {filteredMenus.map((item, index) => <MenuItem key={`menus-options-${index}`} icon={item?.icon} onClick={() => item?.onClick()}>{item?.option}</MenuItem>)}
                {/*menus[type].map((item, index) => (
                    <MenuItem key={`menus-${index}`} icon={item?.icon} onClick={() => item?.onClick()}>{item?.option}</MenuItem>
                ))*/}
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
                    <MenuButton style={{ marginLeft: -16 }} _hover={{ bg: 'transparent' }} onClick={() => goBack(0)} as={Button} colorScheme='teal' variant='ghost' rightIcon={(level === 0 && role != 'lector') ? <IoMdArrowDropdown /> : null}>
                        root
                    </MenuButton>
                    {(level === 0 && role != 'lector') && <MenuGeneric type={'project'} />}
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
                            <MenuButton onClick={() => level != 1 && goBack(1)} as={Button} colorScheme='teal' variant='ghost' rightIcon={(level == 1 && role != 'lector') ? <IoMdArrowDropdown /> : null}>
                                {projectName}
                            </MenuButton>
                            {(level == 1 && role != 'lector') && <MenuGeneric type={'department'} />}
                        </Menu>
                    </>
                )}
                {level > 1 && (
                    <>
                        <IoChevronForwardSharp />
                        <Menu isLazy>
                            <MenuButton /*onClick={() => level < 2 && onNavigateBack(2)}*/ as={Button} colorScheme='teal' variant='ghost' rightIcon={(level == 2 && role != 'lector') ? <IoMdArrowDropdown /> : null}>
                                {departmentName}
                            </MenuButton>
                            {(level == 2 && role != 'lector') && <MenuGeneric type={'documents'} />}
                        </Menu>
                    </>
                )}
            </div>
        );
    };

    const ProjectList = ({ isLoading, projects, onProjectSelect, project_id }) => {
        return isLoading ? <div className="flex justify-center items-center height-icon-500"> <FaSpinner style={{ fontSize: 25 }} className="animate-spin text-blue-400" /> </div> :
            <div>
                <h2 className="text-sm font-semibold text-gray-800 mb-3">Proyectos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {projects.map((folder, index) => (
                        <div
                            key={`files-projects-${folder.id}-${index}`}
                            className="p-3 rounded hover:shadow-md transition-shadow duration-200 cursor-pointer"
                            style={{ backgroundColor: color?.bgFiles }}
                            onClick={() => handleFilePreview(folder, true)}
                            onDoubleClick={() => {
                                //handleFilePreview({ ...folder, type: 'folder_projs' })
                                onProjectSelect(folder)
                            }}
                        >
                            <div className="flex items-center space-x-2">
                                <FaFolder style={{ fontSize: 18 }} className="text-yellow-400" />
                                <div className="flex-1">
                                    <h3 className="font-normal text-sm text-gray-800 line-clamp-1">{folder.name}</h3>
                                    <p className="text-sm text-gray-500 pb-0 line-clamp-1">{folder?.departments_ids.length} elementos</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    };

    const DepartmentList_ = ({ isLoading, departments, documents, project_id, selectedProject, department_id, onDepartmentSelect }) => {
        /*if (departments.every(folder => !selectedProject?.departments_ids.includes(folder.id))) {
            return
        }*/
        return isLoading ? <div className="flex justify-center items-center height-icon-500"> <FaSpinner style={{ fontSize: 25 }} className="animate-spin text-blue-400" /> </div> :
            <div>
                <h2 className="text-sm font-semibold text-gray-800 mb-3">Departamentos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {departments.map((folder, index) => {
                        const linkedDocs = documents.filter((doc) => doc.department_id === folder.id && doc.project_id === project_id).length || null;
                        const isSelected = selectedProject?.departments_ids.includes(folder?.id);

                        return isSelected && (
                            <div
                                key={`files-departaments-${folder.id}-${index}`}
                                className="rounded hover:shadow-md transition-shadow duration-200 cursor-pointer flex items-center p-3 "
                                style={{ backgroundColor: color?.bgFiles }}
                                onClick={() => handleFilePreview(folder, true)}
                                onDoubleClick={() => onDepartmentSelect(folder)}
                            >
                                <div className="flex flex-row items-center space-x-2">
                                    <FaFolder style={{ fontSize: 18, color: '#008080' }} />
                                    <div>
                                        <h3 className="font-normal text-sm text-gray-800 line-clamp-1 pb-0">{folder?.name}</h3>
                                        {linkedDocs && <p className="text-sm text-gray-500 pb-0 line-clamp-1">{linkedDocs} elementos</p>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {(selectedProject?.departments_ids.length !== departments.length && role != 'lector') &&
                        <div
                            className="flex items-center p-3 rounded hover:shadow-md transition-shadow duration-200 cursor-pointer"
                            style={{ backgroundColor: color?.bgFiles }}
                        //onClick={() => handleFilePreview(folder)}
                        >
                            <div className="flex items-center space-x-2">
                                <FaPlusCircle style={{ fontSize: 30, color: color.blueWord }} />
                                <h3 style={{ color: color.blueWord }} className="text-sm text-gray-800 pb-0 font-semibold">Agregar departamento</h3>
                            </div>
                        </div>
                    }

                </div>
            </div>
    };

    const { previewFile, setPreviewFile } = usePreviewFile()
    const handleFilePreview = (file) => {
        setPreviewFile(null)
        setPreviewFile(file);
    };

    const selectedUser = (file) => {
        let data = users.filter(item => item?.role == 'administrador' || file?.users_ids.includes(item?.id)).map(item => ({ ...item }))
        setSelectedShare(data);
    }

    const handlePreview = useCallback((file, modal, index, mode) => {
        if (modal) {
            setSelectedIndex(index);
            setSelectedImage(file);
            setZoom(100);
        }
        if (mode) {
            setSelectedNote(file)
            setblocName(file?.file_name.replace(/\.txt$/, ""))
            handleDownload({ id: file?.id })
        }
        selectedUser(file)
        handleFilePreview(file);
    }, [handleFilePreview]);

    const handleDocs = async (file) => {
        try {
            const pdf = await indexDocumentsByID({ id: file?.id, blob: true });
            console.log("🚀 ~ handleDocs ~ pdf:", pdf)
            const docUrl = pdf?.data;
            window.open(docUrl, '_blank');
        } catch (error) {
            console.error("Error en la llamada a la API:", error);
            throw new Error('Error al obtener el documento');
        }
    };

    const onDoubleClick_ = (file, index, mode, share, move, again) => {
        if (mode || index || share) {
            if (!again) selectedUser()
            handlePreview(file, true); // QUITAR IMPORTANTE
        }
        if (move) {
            onOpenMove();
            return;
        }
        if (file.type.startsWith('text')) {
            setblocEdit(true)
            if (share) {
                onOpenShare()
                return
            }
            handlePreview(file, false, 0, true);
            return;
        }
        if (file.type.startsWith('image')) {
            setImages(documents.filter(item => item.type.startsWith('image')));
            if (!share) handlePreview(file, true, index); else onOpenShare();
        }
        //else if (!share) handleDocs(file); else onOpenShare();
        if (share) onOpenShare();

    }

    const handleDownload = async ({ id }) => {
        try {
            const data = await indexDocumentsByID({ id, blob: true });
            console.log("🚀 ~ handleDownload ~ data:", data)
            setblocContent(data);
        } catch (error) {
            console.error("Error al descargar el archivo:", error);
        } finally {
            onOpenNote()
        }
    };

    const updateDocs = async ({ id, file, share }) => {
        let formData = new FormData();
        //formData.append("id", id);
        if (file) {
            formData.append("file", file);
        }
        if (share) {
            let ids = selectedShare.map(item => item?.id)
            formData.append("users_ids", JSON.stringify(ids))
        }
        try {
            let { status, data } = await updateDoc({ id, data: formData })
            if (status) {
                if (share) setDocuments((prevDocuments) => [data, ...prevDocuments.filter((doc) => doc.id !== id)]);
            }
        } catch (error) {
            console.log("🚀 ~ sendShare ~ error:", error)
        } finally {
            if (share) onCloseShare()
            if (file) setPreviewFile(null)
        }
    }

    /*const DocumentList = ({ isLoading, documents }) => {
        return isLoading ? <div className="flex justify-center items-center height-icon-500"> <FaSpinner style={{ fontSize: 25 }} className="animate-spin text-blue-400" /> </div> :
            <div>
                {documents.length === 0 ?
                    <div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                        <Empty
                            image="../img/empty_folder.png"
                            imageStyle={{ height: 200 }}
                            description={
                                <Typography.Text>
                                    <p className="text-center font-bold text-lg text-black mt-3 mb-0">Arrastra y suelta los archivos aquí</p>
                                    <p className="text-center text-gray-600 mt-0">o usa el botón "Subir archivo" <br /><p className="text-xxs">Máx. 10 MB</p></p>
                                </Typography.Text>
                            }
                        />
                    </div>
                    : <div>
                        <h2 className="text-sm font-semibold text-gray-800 my-3">Documentos</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 pb-24">
                            {documents.map((file, index) => {
                                const isSelected = !role.startsWith('admin') ? file?.users_ids.includes(user_id) : true;
                                return (isSelected) && (
                                    <div
                                        key={`files-docs-${file?.id}-${index}`}
                                        className="rounded hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden"
                                        style={{ backgroundColor: color?.bgFiles }}
                                    >
                                        <div className="p-3 pb-0" onClick={() => handlePreview(file)}>
                                            {file?.type.startsWith('image') ? <ImageLoader id={file?.id} className={"w-full h-32 object-cover rounded"} /> :
                                                <div className='flex w-full h-32 object-cover rounded items-center justify-center'>
                                                    <span style={{ transform: 'scale(4)', display: 'inline-block' }}>{getFileIcon(file?.type)}</span>
                                                </div>}
                                        </div>
                                        <div className="p-3 pt-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center min-w-0">
                                                    <span className="font-medium text-xs text-gray-800 truncate line-clamp-1">{file?.file_name}</span>
                                                </div>
                                                <Menu isLazy>
                                                    <MenuButton _hover={{ bg: 'transparent' }} colorScheme='teal' variant='ghost' style={{ cursor: "context-menu", padding: 5 }}>
                                                        <BsThreeDotsVertical className="text-gray-400 pl-0 ml-0 flex-shrink-0" />
                                                    </MenuButton>
                                                    <MenuList>
                                                        <MenuItem icon={<FiEye />} onClick={() => onDoubleClick_(file, index, true)}>Abrir</MenuItem>
                                                        {role.startsWith('admin') && <>
                                                            <MenuItem icon={<LuUserPlus2 />} onClick={() => onDoubleClick_(file, index, true, true)}>Compartir</MenuItem>
                                                            <MenuItem icon={<RiFolderSharedLine />} onClick={() => onDoubleClick_(file, index, true, false, true)}>Mover</MenuItem>
                                                            <MenuItem icon={<MdDeleteOutline />} onClick={() => deleteItem({ id: file?.id })}>Eliminar</MenuItem>
                                                        </>}
                                                    </MenuList>
                                                </Menu>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>;
    };*/

    const DocumentList = ({ isLoading, documents }) => {
        const selectedDocuments = documents.filter((file) => {
            const isSelected = !role.startsWith('admin') ? file?.users_ids.includes(user_id) : true;
            return isSelected;
        });

        return isLoading ? (
            <div className="flex justify-center items-center height-icon-500">
                <FaSpinner style={{ fontSize: 25 }} className="animate-spin text-blue-400" />
            </div>
        ) : (
            <div>
                {selectedDocuments.length === 0 ? (
                    <div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Empty
                            image="../img/empty_folder.png"
                            imageStyle={{ height: 200 }}
                            description={
                                <Typography.Text>
                                    <p className="text-center font-bold text-lg text-black mt-3 mb-0">Arrastra y suelta los archivos aquí</p>
                                    <p className="text-center text-gray-600 mt-0">o usa el botón "Subir archivo" <br /><p className="text-xxs">Máx. 10 MB</p></p>
                                </Typography.Text>
                            }
                        />
                    </div>
                ) : (
                    <div>
                        <h2 className="text-sm font-semibold text-gray-800 my-3">Documentos</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 pb-24">
                            {selectedDocuments.map((file, index) => (
                                <div
                                    key={`files-docs-${file?.id}-${index}`}
                                    className="rounded hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden"
                                    style={{ backgroundColor: color?.bgFiles }}
                                >
                                    <div
                                        className="p-3 pb-0"
                                        onClick={() => handlePreview(file)}
                                        onDoubleClickCapture={() => onDoubleClick_(file, index, true)}
                                    >
                                        {file?.type.startsWith('image') ? <ImageLoader id={file?.id} className={"w-full h-32 object-cover rounded"} /> :
                                            <div className='flex w-full h-32 object-cover rounded items-center justify-center'>
                                                <span style={{ transform: 'scale(4)', display: 'inline-block' }}>{getFileIcon(file?.type)}</span>
                                            </div>}
                                    </div>
                                    <div className="p-3 pt-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center min-w-0">
                                                <span className="font-medium text-xs text-gray-800 truncate line-clamp-1">
                                                    {file?.file_name}
                                                </span>
                                            </div>
                                            <Menu isLazy>
                                                <MenuButton _hover={{ bg: 'transparent' }} colorScheme='teal' variant='ghost' style={{ cursor: "context-menu", padding: 5 }}>
                                                    <BsThreeDotsVertical className="text-gray-400 pl-0 ml-0 flex-shrink-0" />
                                                </MenuButton>
                                                <MenuList>
                                                    <MenuItem icon={<FiEye />} onClick={() => onDoubleClick_(file, index, true)}>Abrir</MenuItem>
                                                    {role !== 'lector' && (
                                                        <>
                                                            <MenuItem icon={<LuUserPlus2 />} onClick={() => onDoubleClick_(file, index, true, true)}>Compartir</MenuItem>
                                                            <MenuItem icon={<RiFolderSharedLine />} onClick={() => onDoubleClick_(file, index, true, false, true)}>Mover</MenuItem>
                                                            <MenuItem icon={<MdDeleteOutline />} onClick={() => deleteItem({ id: file?.id })}>Eliminar</MenuItem>
                                                        </>
                                                    )}
                                                </MenuList>
                                            </Menu>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
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

    const LoaderPDF = () => {
        return (
            <div className={`flex flex-col justify-center items-center gap-3`}>
                <FaFilePdf style={{ fontSize: 175 }} color="red" />
                <ColorRing
                    visible={true}
                    height="45"
                    width="45"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    //colors={['#e15b64', '#f47e60', '#f8b26a', , '#849b87']}
                    //colors={[ "#34A853", "#FBBC05", "#4285F4", "#EA4335", '#abbd81']}
                    colors={["#34A853", "#abbd81", "#0066CC", "#1A73E8", "#305F72"]}
                />
            </div>
        )
    }

    const PdfViewer = ({ pdfBlob }) => {
        const [pdfUrl, setPdfUrl] = useState(null);

        useEffect(() => {
            //const pdfBlobWithType = new Blob([pdfBlob], { type: 'application/pdf' });
            const pdfBlobWithType = new File([pdfBlob], "NombrePersonalizado.pdf", { type: "application/pdf" });
            const url = URL.createObjectURL(pdfBlobWithType);
            setPdfUrl(url);
            return () => URL.revokeObjectURL(url);
        }, [pdfBlob]);

        if (!pdfUrl) return <LoaderPDF />
        else return (
            <div className="pdf-container">
                <embed
                    //src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    src={`${pdfUrl}#toolbar=0`}
                    //src={pdfUrl}
                    type="application/pdf"
                    className="pdf-embed"
                />
            </div>
        )
    };

    const PDFLoader = ({ id }) => {
        const [imageUrl, setImageUrl] = useState(null);
        useEffect(() => {
            const loadURL = async () => {
                const pdf = await indexDocumentsByID({ id, blob: true });
                console.log("🚀 ~ loadURL ~ pdf:", pdf)
                setImageUrl(pdf);
            };
            loadURL()
        }, [id]);
        if (!imageUrl) return <LoaderPDF />
        else return <PdfViewer pdfBlob={imageUrl} />
    };

    const SkeletonItem = () => (
        <div className="bg-gray-300 h-6 w-48 mb-4 animate-pulse rounded-md"></div>
    );

    const [filesLoad, setFilesLoad] = useState([])

    const handleDrop = async (event, mode, txt) => {
        console.log("🚀 ~ handleDrop ~ event:", event)
        event.preventDefault();
        setVisibleDrog(false);
        if (role == 'lector') {
            openNotification('warning', 'Al parecer no tienes permisos para subir documentos');
            return
        }
        setUploadResults([])
        let files = []
        if (txt) {
            const file = new Blob([blocContent], { type: "text/plain" });
            const fileName = blocName + ".txt";
            files = [new File([file], fileName, { type: "text/plain" })];
        } else files = mode ? Array.from(event?.dataTransfer?.files) : Array.from(event?.target?.files);
        if (!files.length) return;

        try {
            if (blocEdit && txt) {
                updateDocs({ id: selectedNote?.id, file: files[0], share: true })
                return;
            }
            let count = 0;
            setFilesLoad(files);
            setIsLoading(true);
            setVisibleList(true)
            for (const file of files || []) {
                let data = new FormData();
                data.append("file", file);
                data.append("name", user_id);
                data.append("type", file.type);
                if (txt) data.append("users_ids", JSON.stringify(selectedShare.map((chip) => chip.id)))
                else data.append("users_ids", JSON.stringify([user_id]))

                if (level == 1) data.append("project_id", selectedProject?.id);
                if (level == 2) {
                    data.append("project_id", selectedProject?.id);
                    data.append("department_id", selectedDepartment?.id);
                }
                let success = false;
                try {
                    const { status } = await createDocs({ data });
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
            if (txt) onCloseNote();
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

    const getFileIcon = (fileType) => icons[fileType] || icons["default"];

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setDragging(true);
        setInitialMousePos({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = ({ clientX, clientY }) => {
        if (dragging) setPosition({ x: Math.abs(clientX - initialMousePos.x), y: Math.abs(clientY - initialMousePos.y) });
    };

    const handleMouseUp = () => setDragging(false);

    const defaultModal = () => {
        setPosition({ x: 0, y: 0 });
        setDragging(false);
        setInitialMousePos({ x: 0, y: 0 });
        onCloseProject();
    }

    const [maximize, setMaximize] = useState(false);
    const [view, setView] = useState({ type: 'projects', id: null });

    useEffect(() => {
        if (projects.length && departments.length) setdataSource(getDataSource());
    }, [projects, departments, view])

    const getDataSource = () => {
        console.log("🚀 ~ DocumentManager ~ view:", view)

        console.log("🚀 ~ getDataSource ~ projects:", projects)
        if (view.type === 'projects') {
            return projects;
        } else if (view.type === 'departments') {
            return departments.filter((dep) => projects.find((proj) => proj.id === view.id)?.departments_ids.includes(dep.id));
        } /*else if (view.type === 'documents') {
            return []; //documents.filter((doc) => doc.project_id === view.id);
        }*/
        return [];
    };

    const handleItemClick = (item) => {
        if (view.type === 'projects') {
            setView({ type: 'departments', id: item.id });
        } else if (view.type === 'departments') {
            setView({ type: 'documents', id: item.id });
        }
    };

    const handleBack = () => {
        if (view.type === 'documents') {
            setView({ type: 'departments', id: projects.find((proj) => proj.departments_ids.includes(view.id))?.id });
        } else if (view.type === 'departments') {
            setView({ type: 'projects', id: null });
        }
    };

    const [dataSource, setdataSource] = useState(null)
    const [blocName, setblocName] = useState("");
    const [blocContent, setblocContent] = useState("");
    const [blocEdit, setblocEdit] = useState(false);

    const handleDelete_ = (chipToDelete) => {
        setSelectedShare((prevChips) => prevChips.filter((chip) => chip.id !== chipToDelete.id));
    };

    const revealIds = (e) => {
        if (!blocName) {
            openNotification('warning', 'Añada un nombre');
            return;
        }
        handleDrop(e, false, true)
    };
    const handleCheckboxChange = (user) => {
        setSelectedShare((prevSelected) => {
            const userExists = prevSelected.some((u) => u.id === user.id);
            if (userExists) return prevSelected.filter((u) => u.id !== user.id);
            else return [...prevSelected, user];
        });
    };

    return (
        <div className="mx-auto pb-8 bgwhite">
            {contextHolder}
            <div className="flex" style={{ width: '100%' }}>
                <div className="mx-auto pb-8 content-scroll-auto" style={{ flex: '1' }}>
                    <div className="flex justify-between items-center mb-2 pl-6 mt-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-0 pb-0 mt-8" style={{ paddingLeft: 8 }}>Gestor de archivos</h2>
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
                                    <DepartmentList_ isLoading={isLoading} departments={departments} documents={documents} department_id={selectedDepartment?.id} project_id={selectedProject?.id} selectedProject={selectedProject} onDepartmentSelect={handleDepartmentSelect} />
                                    <DocumentList isLoading={isLoading} documents={filteredDocumentsForLevel()} />
                                </>
                            )}
                            {level === 2 && <DocumentList isLoading={isLoading} documents={filteredDocumentsForLevel()} />}
                        </Box>
                    </div>
                </div>
                <div className="border-l p-3" style={{ width: '290px' }}>
                    {previewFile ?
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
                                    {previewFile.file_name}
                                </p>
                                <p className="font-small">
                                    <span className='font-semibold'>Tipo</span>  <br />
                                    {previewFile?.type ?
                                        types[previewFile.type] || types['default'] :
                                        previewFile?.color ? 'Departamento' : 'Proyecto'
                                    }
                                </p>
                                {previewFile?.type &&
                                    <p className="font-small">
                                        <span className='font-semibold'>Usuarios con acceso</span>  <br />
                                        <Avatar.Group>
                                            {selectedShare.map((item_, index) =>
                                                <Tooltip key={`selectedUsers-${item_?.id}-${index}`} title={`${item_?.label}`}>
                                                    <Avatar style={{ background: item_?.last_name }}>{item_?.label.charAt(0)}</Avatar>
                                                </Tooltip>
                                            )}
                                            {(selectedShare.length !== users.length && role.startsWith('admin')) &&
                                                <Tooltip title={`Añadir más`}>
                                                    <Avatar onClick={() => onDoubleClick_(previewFile, true, false, true, false, true)} style={{ background: '#163370' }}>+</Avatar>
                                                </Tooltip>}
                                        </Avatar.Group>
                                    </p>
                                }
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
                        : <div className="flex items-center justify-center h-full text-gray-500">
                            <Empty
                                image="../img/empty_details.png"
                                imageStyle={{ height: 200 }}
                                description={<Typography.Text><p className="text-center text-gray-600 mt-0">Selecciona un elemento para ver los detalles</p> </Typography.Text>}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className='modal-bottom-load-files shadow' style={{ display: visibleList ? 'flex' : 'none' }}>
                <div className='head-bottom'>
                    <h1 style={{ fontSize: '1rem' }} className='font-semibold'>{filesLoad.length} elementos</h1>
                    <CloseOutlined onClick={() => setVisibleList(false)} />
                </div>
                <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {filesLoad.map((file, index) => (
                        <div key={index} className='flex flex-row items-center p-2.5 justify-between'>
                            <div className='flex flex-row items-center'>
                                {getFileIcon(file?.type)}
                                <p className='flex font-semibold mb-0 pl-2.5 text-sm'>
                                    {file.name}
                                </p>
                            </div>
                            <dic className='flex flex-row items-center'>
                                {!uploadResults[index]?.success ? <FaSpinner className="animate-spin text-blue-400" /> : uploadResults[index]?.success == 1 ? <CiCircleCheck color='green' /> : <VscError color='blue' />}
                            </dic>
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
                                <h3 className="text-sm font-semibold text-white pb-0 mb-0">{selectedImage?.file_name || selectedImage?.name}</h3>
                            </div>
                            <div className="flex gap-2">
                                {/*<button
                                    onClick={handleDownload}
                                    className="p-2 hover:bg-gray-800 rounded-full text-blue-400"
                                >
                                    <AiOutlineDownload className="w-5 h-5" />
                                </button>*/}
                                <button
                                    onClick={onOpenShare}
                                    className="p-2 hover:bg-gray-800 rounded-full text-white"
                                >
                                    <AiOutlineShareAlt className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete({ id: selectedImage?.id })}
                                    className="p-2 hover:bg-gray-800 rounded-full text-white"
                                >
                                    <AiOutlineDelete className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className={`flex-1 flex justify-center ${!selectedImage?.type.endsWith('pdf') && 'p-4 items-center'} pt-0 relative`}>
                            {selectedImage?.type.startsWith('image') &&
                                <button
                                    onClick={handlePrevious}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all z-50"
                                >
                                    <AiOutlineLeft className="w-6 h-6" />
                                </button>}
                            <div className={`relative w-full flex ${!selectedImage?.type.endsWith('pdf') && 'items-center'} justify-center`}>
                                {selectedImage?.type.startsWith('image') && <ImageLoader style={{ transform: `scale(${zoom / 100})` }} id={selectedImage?.id} className="max-w-[70%] max-h-[70%] object-contain transition-transform duration-300 ease-in-out shadow-xl" />}
                                {selectedImage?.type.endsWith('pdf') && <PDFLoader id={selectedImage?.id} />}
                                {selectedImage?.type.startsWith('image') &&
                                    <div className={`absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4 p-3 rounded-full bg-black bg-opacity-50 position-fixed-50`}>
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
                            {selectedImage?.type.startsWith('image') &&
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all"
                                >
                                    <AiOutlineRight className="w-6 h-6" />
                                </button>}
                        </div>
                    </div>
                </div>
            )}
            <Modal closeOnOverlayClick={false} isOpen={isOpenProject} onClose={defaultModal} isCentered>
                <ModalOverlay />
                <ModalContent
                    maxW="500px"
                    style={{
                        position: position.y && 'absolute',
                        top: position.y && `${position.y}px`,
                        left: position.x && `${position.x}px`
                    }}
                //onMouseUp={handleMouseUp}
                >
                    <ModalHeader>
                        <RxDragHandleDots2
                            cursor="move"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            className='pb-0 mb-0'
                            style={{ transform: 'rotate(90deg)', position: 'absolute', top: 12, left: 240, color: '#B6B6B670' }}
                        />
                        {!level == 1 ? 'Proyecto' : 'Departamento'} nuevo
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className='space-y-2'>
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
                                <div className='flex flex-col gap-3'>
                                    <MultiSelect
                                        options={departments}
                                        value={selected}
                                        onChange={setSelected}
                                        labelledBy="name"
                                        className='input-multi-text-form-files'
                                        hasSelectAll={true}
                                        style={{ fontSize: 18 }}
                                        overrideStrings={{
                                            "selectSomeItems": "Seleccionar departamentos",
                                            "allItemsAreSelected": "Todos los departamentos ligados",
                                            "search": "Buscar",
                                            "clearSearch": "Limpiar búsqueda",
                                            "clearSelected": "Limpiar seleccionados",
                                            "noOptions": "No hay opciones disponibles",
                                            "selectAll": "Seleccionar todo",
                                        }}
                                    />
                                    <div className='flex flex-row gap-3'>
                                        <FormControl id="start_date" isRequired>
                                            <FormLabel>Fecha de Inicio</FormLabel>
                                            <Input
                                                type="date"
                                                name="start_date"
                                                value={formDataProjects.start_date}
                                                onChange={handleStartDateChange}
                                            //min={new Date().toISOString().split('T')[0]}
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
                                    </div>
                                </div>}
                        </div>
                    </ModalBody>
                    <ModalFooter className='gap-1 border-t-1'>
                        <Button variant='ghost' onClick={defaultModal}>
                            Cancelar
                        </Button>
                        <Button variant='solid' onClick={handleSubmit}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal closeOnOverlayClick={false} isOpen={isOpenShare} onClose={onCloseShare} isCentered scrollBehavior={'outside'} size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <div className='font-normal w-[9/10] pt-3.5'>
                            Compartir "{previewFile?.file_name}"
                        </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='p-0 m-0'>
                        <div className='space-y-2'>
                            <div className='flex flex-col gap-y-1.5'>
                                <MultiSelect
                                    options={users/*.filter(item => item?.id !== user_id)*/}
                                    value={selectedShare}
                                    onChange={setSelectedShare}
                                    labelledBy="name"
                                    className='input-multi-text-form-files px-4 pt-3.5'
                                    hasSelectAll={true}
                                    style={{ fontSize: 18 }}
                                    overrideStrings={{
                                        "selectSomeItems": "Seleccionar usuarios",
                                        "allItemsAreSelected": "Se compartira con todos los usuarios",
                                        "search": "Buscar",
                                        "clearSearch": "Limpiar búsqueda",
                                        "clearSelected": "Limpiar seleccionados",
                                        "noOptions": "No hay opciones disponibles",
                                        "selectAll": "Seleccionar todo",
                                    }}
                                />
                                <p className='pb-0 px-4 pt-2 font-medium'>Personas que tienen acceso</p>
                                <List
                                    //className="demo-loadmore-list"
                                    //itemLayout="horizontal"
                                    style={{ height: 300, maxHeight: 300, overflowY: 'auto' }}
                                    //dataSource={[users.find(item => item?.id == user_id), ...selectedShare]}
                                    dataSource={selectedShare}
                                    renderItem={(item, index) => (
                                        <List.Item key={`selectedShare-${item?.id}-${index}`} actions={previewFile?.name == item?.value && [<div className="pr-2">Propietario</div>]}>
                                            <List.Item.Meta
                                                avatar={<Avatar style={{ background: item?.last_name }}>{item?.label && item?.label.charAt(0)}</Avatar>}
                                                title={`${item?.label}`}
                                                description={item?.email}
                                                className='flex flex-row items-center pl-5'
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className='gap-1 border-t-1 flex justify-between'>
                        <Button variant='ghost' rounded={100} onClick={onCloseShare}>
                            Cancelar
                        </Button>
                        <Button variant='solid' rounded={100} bgColor={color?.primary} color={'white'} onClick={() => updateDocs({ id: previewFile?.id, share: true })}>
                            Compartir
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal closeOnOverlayClick={false} isOpen={isOpenMove} onClose={onCloseMove} isCentered scrollBehavior={'outside'} size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <div className='font-normal w-96 pt-3.5'>
                            Mover "{previewFile?.file_name}"
                        </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='p-0 m-0'>
                        <div className='space-y-1.2'>
                            <div className='flex flex-col gap-y-1.5'>
                                <div className='flex flex-row px-4 pt-1.5 gap-1'>
                                    <p className='pb-0 font-medium'>Ubicación actual del archivo: </p>
                                    <p className='pb-0 font-medium border border-gray-500 rounded px-1 flex flex-row items-center gap-1'>
                                        {level == 0 && <FaFolder style={{ fontSize: 15 }} color="gray" />}
                                        {level == 1 && selectedProject?.name}
                                        {level == 2 && selectedDepartment?.name}
                                    </p>
                                </div>
                                <div className='pb-0 px-4'>
                                    <div>
                                        <Button onClick={handleBack} style={{ marginBottom: 16 }} disabled={view.type == 'projects'}>
                                            Volver
                                        </Button>

                                        <List
                                            dataSource={dataSource}
                                            style={{ height: 300, maxHeight: 300, overflowY: 'auto' }}
                                            renderItem={(item) => (
                                                <List.Item key={item.id} onClick={() => handleItemClick(item)} actions={[<Button onClick={() => { }} className="pr-2">Mover</Button>]}>
                                                    <List.Item.Meta
                                                        avatar={<FaFolder style={{ fontSize: 18, color: view.type === 'projects' ? '#008080' : '#facc15' }} />}
                                                        title={<a>{item.name}</a>}
                                                        className='flex flex-row items-center'
                                                    />
                                                </List.Item>
                                            )}
                                            locale={{
                                                emptyText: <Empty description="No hay contenido disponible" />,
                                            }}
                                        />
                                    </div>
                                </div>
                                {/*<p className='pb-0 px-4 font-medium flex flex-row items-center gap-1 text-sm'>
                                    <FaFolder style={{ fontSize: 15 }} color="gray" /> <MdOutlineKeyboardArrowRight /> {selectedProject?.name} <MdOutlineKeyboardArrowRight /> {selectedDepartment?.name}
                                </p>*/}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className='gap-1 border-t-1 flex justify-between'>
                        <Button variant='ghost' rounded={100} onClick={onCloseMove}>
                            Cancelar
                        </Button>
                        <Button variant='solid' rounded={100} bgColor={color?.primary} color={'white'} onClick={onCloseMove}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal closeOnOverlayClick={false} isOpen={isOpenNote} onClose={onCloseNote} isCentered scrollBehavior={'inside'} size={!maximize ? '3xl' : 'full'}>
                <ModalOverlay />
                <ModalContent height="500px">
                    <ModalHeader>
                        <div className='font-semibold w-96 pt-0'>{blocEdit ? 'Editar' : 'Nueva'} nota</div>
                    </ModalHeader>
                    <ModalCloseButton />
                    {maximize ? <FiMinimize2 onClick={() => setMaximize(!maximize)} className='absolute top-[16px] right-[46px] cursor-pointer text-[#1a202c]' /> :
                        <FiMaximize2 onClick={() => setMaximize(!maximize)} className='absolute top-[16px] right-[46px] cursor-pointer text-[#1a202c]' />}
                    <ModalBody className='p-0 m-0'>
                        <div className='space-y-1.2'>
                            <div className='flex flex-col gap-y-1.5 px-6'>
                                <div className='flex flex-col gap-[12px]'>
                                    <div className='mt-0.5'>
                                        <input
                                            type="text"
                                            placeholder="Notas importantes, registro de reuniones..."
                                            value={blocName}
                                            onChange={(e) => setblocName(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <div className='flex flex-row justify-between'>
                                            <p className='pb-0 text-sm'>Compartir con:</p>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <div>
                                                        <Button leftIcon={<FiPlus />} size={'xs'} /*disabled={!(selectedShare.length != users.length)}*/>
                                                            Añadir usuarios
                                                        </Button>
                                                    </div>
                                                </PopoverTrigger>
                                                <Portal>
                                                    <PopoverContent>
                                                        <PopoverArrow />
                                                        <PopoverBody>
                                                            <p className='mb-0 py-1.5 font-bold text-center text-sm'>Miembros</p>
                                                            <div style={{ maxHeight: 340, overflow: 'auto' }}>
                                                                {users.map((user, index) => {
                                                                    const isSelected = selectedShare.some((u) => u.id === user.id);
                                                                    const isDisabled = selectedShare.some((u) => u.id === user.id && u.disabled);
                                                                    const disabled = user?.disabled || isDisabled;
                                                                    return (
                                                                        <div key={`us${user?.id}${index}`} className={`flex items-center justify-between p-1.5 ${(disabled) ? 'opacity-30' : 'hover:bg-gray-200'}`} onClick={() => { if (!(disabled)) handleCheckboxChange(user) }}>
                                                                            <div className='flex flex-row items-center gap-1.5'>
                                                                                <Tooltip title={`${user?.label}`}>
                                                                                    <Avatar style={{ background: user?.last_name }}>{user?.label.charAt(0)}{user?.label.split(" ")[1][0]}</Avatar>
                                                                                </Tooltip>
                                                                                <span className={disabled ? 'text-gray-500' : ''}>
                                                                                    {user?.label}
                                                                                </span>
                                                                            </div>
                                                                            <input type="checkbox" checked={isSelected} disabled={disabled} className="mr-2"
                                                                            //onChange={() => handleCheckboxChange(user)}
                                                                            />
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Portal>
                                            </Popover>
                                        </div>
                                        <div className='flex flex-row flex-wrap gap-1'>
                                            {selectedShare.map((chip) => (
                                                <Chip
                                                    key={chip?.id}
                                                    label={chip?.label}
                                                    color={chip?.last_name}
                                                    disabled={chip?.disabled}
                                                    onDelete={() => handleDelete_(chip)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <ReactQuill
                                            value={blocContent}
                                            onChange={setblocContent}
                                            modules={modules_}
                                            formats={formats_}
                                            className="h-full"
                                        />
                                        {/*<div dangerouslySetInnerHTML={{ __html: blocContent }} />*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className='gap-1 border-t-1 flex justify-between'>
                        <Button variant='ghost' rounded={100} onClick={onCloseNote}>
                            Cancelar
                        </Button>
                        <Button variant='solid' rounded={100} bgColor={color?.primary} color={'white'} onClick={revealIds}>
                            {blocEdit ? 'Guardar' : 'Crear'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};
export default DocumentManager;