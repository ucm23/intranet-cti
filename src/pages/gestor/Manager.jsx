import React, { useState, useEffect, useRef } from 'react';
import { FolderOpenOutlined, FolderOutlined, FileOutlined, FilePdfOutlined } from '@ant-design/icons';
import { indexDocuments, indexDocumentsByID } from '../../api/docs/docs';
import Slider from "react-slick";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Box,
} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { Carousel } from "react-bootstrap";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

//import { Page, Text, View, Document, StyleSheet, } from '@react-pdf/renderer';
//import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { Document, Page } from "react-pdf";


const settings = {
    dots: false,
    infinite: false,
    //speed: 500,
    slidesToShow: 1,
};

const fileStructure = [
    {
        id: 1,
        name: 'Administración',
        type: 'folder',
        children: [
            {
                id: 2,
                name: 'VICTUM INTRANET',
                type: 'folder',
                children: [
                    { id: 3, name: 'Gestión de Recursos', type: 'file' },
                ],
            },
        ],
    },
    {
        id: 4,
        name: 'Recursos Humanos',
        type: 'folder',
        children: [
            {
                id: 5,
                name: 'VICTUM GEO',
                type: 'folder',
                children: [
                    { id: 6, name: 'Proceso de Inducción', type: 'file' },
                    { id: 7, name: 'Proceso de Inducción', type: 'folder', children: [] },
                ],
            },
        ],
    },
];

const ImageLoader = ({ id }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        loadURL();
    }, [id]);

    const loadURL = async () => {
        const img = await indexDocumentsByID({ id });
        setImageUrl(img?.data);
    };
    return (imageUrl ?
        <div className='div-pdf'>
            <img src={imageUrl} alt={`img-${id}`} style={{ borderRadius: '8px', }} />
        </div> : <p>Cargando...</p>);
};

const PDFLoader = ({ id }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const loadURL = async () => {
            const pdf = await indexDocumentsByID({ id, blob: true });
            setImageUrl(pdf);
        };
        loadURL()
    }, [id]);

    return (imageUrl ?
        /*<div className='div-pdf'>
            <PDFViewerComp
                key='view'
                file={imageUrl} />
        </div>
        : <p>Cargando...</p>);*/
        <div className='div-pdf'>
            <img src={imageUrl} alt={`img-${id}`} style={{ borderRadius: '8px', }} />
        </div> : <p>Cargando...</p>);
};

const Manager = () => {
    const [openFolders, setOpenFolders] = useState({});
    const [data, setData] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedDoubleFile, setSelectedDoubleFile] = useState(null);
    const [folderPath, setFolderPath] = useState([]);

    const {
        isOpen: isOpenFile,
        onOpen: onOpenFile,
        onClose: onCloseFile
    } = useDisclosure(9)

    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        getDocuments()
    }, [])

    const menuRef = useRef();


    const handleContextMenu = (e) => {
        e.preventDefault();
        setVisible(true);
        setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) setVisible(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getDocuments = async () => {
        const docs = await indexDocuments({})
        console.log("🚀 ~ getDocuments ~ docs:", docs)
        if (docs?.status) {
            setData(docs?.data)
        }
    }

    const transformToTree = () => {
        const tree = [];
        data.forEach((item) => {
            let projectFolder = tree.find(
                (folder) => folder.name === item?.project?.name
            );

            if (!projectFolder) {
                projectFolder = {
                    id: item.id,
                    name: item?.project?.name,
                    type: "folder",
                    children: [],
                    mime: 'folder',
                    isOpen: false,
                };
                tree.push(projectFolder);
            }
            let departamentFolder = projectFolder.children.find(
                (folder) => folder.name === item?.department?.name
            );
            if (!departamentFolder) {
                departamentFolder = {
                    id: item.id + 100,
                    name: item?.department?.name,
                    type: "folder",
                    children: [],
                    mime: 'folder',
                    isOpen: false,
                };
                projectFolder.children.push(departamentFolder);
            }

            departamentFolder.children.push({
                ...item,
                type: "file",
            });
        });


        console.log("🚀 ~ transformToTree ~ tree:", tree)
        return tree;
    };



    const toggleFolder = (node, parentPath = []) => {
        setOpenFolders((prev) => ({
            ...prev,
            [node.id]: !prev[node.id],
        }));

        if (node.type === 'folder') {
            setSelectedFolder(node);
            setFolderPath([...parentPath, node]);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto
        const files = Array.from(event.dataTransfer.files);
        files.forEach((file) => {
            console.log("🚀 ~ files.forEach ~ file:", file)
            /*toast({
              title: `Archivo cargado: ${file.name}`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });*/
        });
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Permite el drop
    };


    const renderTree = (nodes, parentPath = []) => {
        return nodes.map((node) => {
            if (node.type === 'folder') {
                const isOpen = openFolders[node.id];
                return (
                    <div key={node.id}>
                        <div
                            className="folder"
                            onClick={() => toggleFolder(node, parentPath)}
                            style={{ cursor: 'pointer' }}
                        >
                            {isOpen ? <FolderOpenOutlined /> : <FolderOutlined />} {node.name}
                        </div>
                        {isOpen && (
                            <div className="folder-children" style={{ marginLeft: '20px' }}>
                                {renderTree(node.children, [...parentPath, node])}
                            </div>
                        )}
                    </div>
                );
            } else {
                return (
                    <div key={node.id} className="file" style={{ marginLeft: '20px' }}>
                        <FileOutlined /> {node.name}
                    </div>
                );
            }
        });
    };

    const renderMosaics = (items) => {
        if (!items || items.length === 0) {
            return <p>No files or folders</p>;
        }

        return (
            <div className="mosaic-grid" onContextMenu={handleContextMenu} >
                <Box
                    onContextMenu={handleContextMenu}
                    onClick={handleClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    display="flex"
                    flexWrap='wrap'
                    gap={20}
                    alignContent={'flex-start'}
                    cursor="pointer"
                >
                    {items.map((item, index) => (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <div
                                key={item.id}
                                className="mosaic-item"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    //padding: '10px',
                                    cursor: item.type === 'folder' ? 'pointer' : 'default',
                                }}
                                onClick={() => item.type === 'folder' ? toggleFolder(item, folderPath) : setSelectedFile(item)}
                                onDoubleClick={() => {
                                    setSelectedDoubleFile({ ...item, index: index });
                                    setIndex(index)
                                    onOpenFile();
                                }}
                            >
                                {item.type === 'folder' && <FolderOutlined style={{ fontSize: '40px' }} />}
                                {item?.mime.startsWith('image') && <ImageLoader id={item?.id} />}
                                {item?.mime.endsWith('pdf') && <FilePdfOutlined style={{ fontSize: '40px' }} />}

                            </div>
                            <div style={{ marginTop: '10px', textAlign: 'center' }} className="file-label">{/*item?.file_name ||*/ item?.name} </div>
                        </div>
                    ))}
                    <Menu
                        isOpen={visible}
                        placement="right"
                        closeOnSelect={false}
                    >
                        <MenuList
                            ref={menuRef}
                            position="absolute"
                            left={`${position.x}px`}
                            top={`${position.y}px`}
                            zIndex={1}
                        >
                            <MenuItem onClick={() => { }}>Opción 1</MenuItem>
                            <MenuItem onClick={() => { }}>Opción 2</MenuItem>
                            <MenuItem onClick={() => { }}>Opción 3</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </div>
        );
    };

    const renderBreadcrumbs = () => {
        return (
            <div className="breadcrumbs" style={{ marginBottom: '20px' }}>
                {folderPath.map((folder, index) => (
                    <span key={folder.id} style={{ cursor: 'pointer' }} onClick={() => navigateToFolder(index)}>
                        {folder.name}
                        {index < folderPath.length - 1 && ' > '}
                    </span>
                ))}
            </div>
        );
    };

    const navigateToFolder = (index) => {
        const newFolderPath = folderPath.slice(0, index + 1);
        setSelectedFolder(newFolderPath[newFolderPath.length - 1]);
        setFolderPath(newFolderPath);
    };

    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });



    const handleClick = (e) => {
        console.log(e);
        setVisible(false);
    };

    const handleMenuClick = (e) => {
        console.log("Menu item clicked:", e.key);
        setVisible(false);
    };

    return (
        <div className="file-manager" style={{ display: 'flex', height: '100vh' }}>
            <div className="left-pane" style={{ width: '25%', padding: '10px', borderRight: '1px solid #ddd', overflowY: 'auto' }}>
                {renderTree(transformToTree())}
            </div>
            <div className="right-pane" style={{ width: '75%', padding: '10px', overflowY: 'auto', justifyContent: 'space-between' }}>
                <div style={{ width: '100%', overflowY: 'auto' }}>
                    {folderPath.length > 0 && renderBreadcrumbs()}
                    {selectedFolder ? renderMosaics(selectedFolder.children) : <p>Select a folder on the left to see its contents</p>}
                </div>
                <div style={{ width: '30%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                    {JSON.stringify(selectedFile)}
                    <div>{'Información'}</div>
                    {JSON.stringify(selectedDoubleFile)}
                </div>
            </div>
            <Modal onClose={onCloseFile} size={'full'} isOpen={isOpenFile}>
                <ModalOverlay />
                <ModalContent style={{ background: '#B6B6B685' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', background: '#282828', position: 'fixed', zIndex: 2, width: '100%' }}>
                        <FolderOutlined style={{ color: 'white' }} onClick={onCloseFile} />
                        <h1 style={{ color: 'white' }}>{selectedDoubleFile?.name}</h1>
                    </div>

                    <ModalBody style={{ display: 'flex', justifyContent: 'center', paddingTop: 50, zIndex: 1 }}>
                        {/*selectedDoubleFile?.mime.startsWith('image') && <ImageLoader id={selectedDoubleFile?.id} />*/}
                        {selectedFolder &&
                            <Carousel indicators={false} slide={false} activeIndex={index} onSelect={handleSelect} style={{ width: '100%', zIndex: 1 }}>
                                {selectedFolder?.children.map((item, index) =>
                                    <Carousel.Item key={`file-item-${index}${item?.id}`} interval={2600}>
                                        {item?.mime.startsWith('image') && <ImageLoader id={item?.id} />}
                                        {item?.mime.endsWith('pdf') && <PDFLoader id={item?.id} />}
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Manager;
