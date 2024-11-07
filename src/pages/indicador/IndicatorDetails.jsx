import React, { useState, useEffect } from 'react';
import { AiOutlineRight } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import { ArrowDownOutlined, ArrowUpOutlined, CheckSquareOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import { useBreakpointValue } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { Progress } from 'antd';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
//import { Modal } from 'antd';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
//import '../../styles/estilo.css';
import { indexActivities } from '../../api/project/projects';
import { indexUsers } from '../../api/users/users';
import { Avatar } from 'antd';
import { RxClipboardCopy } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
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
} from '@chakra-ui/react'
import { FiBriefcase } from 'react-icons/fi';
import { TbUsersPlus } from "react-icons/tb";
import { VscUngroupByRefType } from "react-icons/vsc";
import { IoTimeOutline } from "react-icons/io5";
import { RiSave2Fill } from "react-icons/ri";
import { BsTextParagraph } from "react-icons/bs";
import { MdOutlineLayers } from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const colores = [
    'rgba(255, 0, 0, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(0, 255, 0, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 255, 0, 0.6)',
    'rgba(128, 0, 128, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 165, 0, 0.6)',

];

const chartStyles = {
    width: '70%',
    height: '400px',
};

const proyectos = [
    {
        name: 'Intranet',
        id: 1,
        actividades: [
            {
                name: 'Login',
                description: 'Diseñar un formulario bonito con ciertas validaciones de usuario',
                avance: 0,
                responsable: 1,
                start_date: '25-10-2024',
                end_date: '25-11-2024',
                tasks: [
                    { name: 'Crear un componente de Login', complete: true },
                    { name: 'Añadir REDUX', complete: false },
                ]
            },
            {
                name: 'NOTICIAS',
                description: 'Diseñar una lista de NOTICIAS bonito con ciertas especificaciones',
                avance: 100,
                responsable: 1,
                start_date: '25-10-2024',
                end_date: '25-11-2024',
                tasks: [
                    { name: 'Crear un componente de Login', complete: true },
                    { name: 'Añadir REDUX', complete: true },
                    { name: 'Conectar con la API', complete: true },
                ]
            },
            {
                name: 'GESTOR DE DOCUMENTOS',
                description: 'Diseñar un GESTOR DE DOCUMENTOS igual que Google Drive',
                avance: 50,
                responsable: 1,
                start_date: '25-10-2024',
                end_date: '25-11-2024',
                tasks: [
                    { name: 'Crear un componente de Login', complete: false },
                    { name: 'Añadir REDUX', complete: false },
                    { name: 'Conectar con la API', complete: true },
                    { name: 'Validaciones', complete: false },
                ]
            },
        ],
    },

    {
        name: 'VICTUM RE',
        id: 2,
        actividades: [
            {
                name: 'Login',
                description: 'Diseñar un formulario bonito con ciertas validaciones de usuario',
                avance: 0,
                responsable: 1,
                start_date: '25-10-2024',
                end_date: '25-11-2024',
                tasks: [
                    { name: 'Crear un componente de Login', complete: true },
                    { name: 'Añadir REDUX', complete: false },
                ]
            },
            {
                name: 'MODULO 1',
                description: 'Diseñar una lista de NOTICIAS bonito con ciertas especificaciones',
                avance: 100,
                responsable: 1,
                start_date: '25-10-2024',
                end_date: '25-11-2024',
                tasks: [
                    { name: 'Crear un componente de Login', complete: true },
                    { name: 'Añadir REDUX', complete: true },
                    { name: 'Conectar con la API', complete: true },
                ]
            },
            {
                name: 'MODULO 2',
                description: 'Diseñar un GESTOR DE DOCUMENTOS igual que Google Drive',
                avance: 50,
                responsable: 1,
                start_date: '25-10-2024',
                end_date: '25-11-2024',
                tasks: [
                    { name: 'Crear un componente de Login', complete: false },
                    { name: 'Añadir REDUX', complete: false },
                    { name: 'Conectar con la API', complete: true },
                    { name: 'Validaciones', complete: false },
                ]
            },
        ],
    },
];

const IndicatorDetails = () => {
    const location = useLocation();
    const { project, total } = location.state;
    const mobile = useBreakpointValue({ base: true, md: false });
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modal1Open, setModal1Open] = useState(false);

    const [completado, setCompletado] = useState([]);
    const [pendiente, setPendiente] = useState([]);
    const [enCurso, setEnCurso] = useState([]);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        if (users) searchArray()
    }, [users])

    const getUsers = async () => {
        const { status, data } = await indexUsers({})
        if (status) setUsers(data);
    };

    const searchArray = async () => {
        try {
            let { status, data } = await indexActivities({ id: project?.id })
            if (status) {
                setItem(data)
                if (data.length > 0) {
                    const completedTasks = [];
                    const pendingTasks = [];
                    const inProgressTasks = [];
                    data.forEach(task => {
                        const allMadeTrue = task.notes.every(note => note.made);
                        const allMadeFalse = task.notes.every(note => !note.made);
                        if (allMadeTrue) completedTasks.push(task);
                        else if (allMadeFalse) pendingTasks.push(task);
                        else inProgressTasks.push(task);
                    });
                    setCompletado(completedTasks);
                    setPendiente(pendingTasks);
                    setEnCurso(inProgressTasks);
                }
            }
        } catch (error) {
            console.error("🚀 ~ searchArray ~ error:", error)
        } finally {
            setIsLoading(true)
        }
    }

    const indexUserById = (id) => users.find(item => item?.value == id);
    const countTasks = (notes) => notes.filter(note => note.made).length;

    const getState = (advance) => {
        if (advance === 0) return { name: 'Sin iniciar', color: '#B6B6B6' }
        if (advance == 100) return { name: 'TERMINADO', color: '#008000' }
        else return { name: 'EN CURSO', color: '#ffa500' }
    }

    const getAdvance = (tasks) => {
        let count = 0
        tasks.map(i => {
            if (i?.complete) count++;
            return count
        })
        return count
    }

    const dataProyectos = {
        labels: proyectos.map(proyecto => proyecto.name),
        datasets: [
            {
                label: 'Avance (%)',
                data: proyectos[0]?.actividades.map(proyecto => proyecto.avance),
                backgroundColor: colores.slice(0, proyectos[0]?.actividades.length),
                borderColor: colores.slice(0, proyectos[0]?.actividades.length).map(color => color.replace('0.6', '1')),
                borderWidth: 1,
            },
        ],
    };

    // Opciones para la gráfica de proyectos
    const optionsProyectos = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    },
                },
            },
        },
    };

    // Preparar datos para la gráfica de efectividad 
    const responsables = {};
    proyectos.forEach(proyecto => {
        for (const [responsable, efectividad] of Object.entries(proyecto.efectividades || {})) {
            if (!responsables[responsable]) {
                responsables[responsable] = Array(proyectos.length).fill(0); // Inicializar con 0 por cada proyecto
            }
            // Asignar la efectividad correspondiente a cada proyecto
            const index = proyectos.indexOf(proyecto);
            responsables[responsable][index] = efectividad;
        }
    });

    const dataEfectividad = {
        labels: proyectos.map(proyecto => proyecto.name),
        datasets: Object.entries(responsables).map(([responsable, efectividades], index) => ({
            label: responsable,
            data: efectividades,
            backgroundColor: colores[index % colores.length],
            borderColor: colores[index % colores.length].replace('0.6', '1'),
            borderWidth: 1,
        })),
    };

    // Opciones para la gráfica de efectividad
    const optionsEfectividad = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Proyectos',
                },
            },
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Efectividad (%)',
                },
            },
        },
    };

    const [itemSelected, setItemSelected] = useState(null)

    const viewDetails = ({ item }) => {
        setItemSelected(item)
        setModal1Open(true)
    }

    if (!isLoading) {
        return (
            <div className='flex items-center justify-center flex-row align-middle'>
                <Spin />
            </div>
        )
    } else return (
        <div style={{ height: '100vh' }} className='bgwhite content-scroll-auto'>
            <div className="px-4 sm:px-0 pt-2">
                <h3 className="text-base/7 font-semibold text-gray-900">{project?.name}</h3>
                <p className="mt-0 max-w-2xl text-sm/6 text-gray-500" style={{ width: 180 }}>
                    <Progress percent={total} size="small" />
                </p>
            </div>
            <Tabs isLazy>
                <TabList>
                    <Tab>Resumen</Tab>
                    <Tab>Actividades</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel style={{ backgroundColor: '#B6B6B650' }}>
                        <div className='flex flex-col gap-2'>
                            <div className="sm:px-0">
                                <h3 className="text-base/7 font-semibold text-gray-900">Dashboard del proyecto</h3>
                                <p className="mt-0 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p>
                            </div>
                            <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-5">
                                <Card bordered={false}>
                                    <Statistic title="Active" value={11.28} precision={2} valueStyle={{ color: '#3f8600' }} prefix={<ArrowUpOutlined />} suffix="%" />
                                </Card>
                                <Card bordered={false}>
                                    <Statistic title="Idle" value={9.3} precision={2} valueStyle={{ color: '#cf1322' }} prefix={<ArrowDownOutlined />} suffix="%" />
                                </Card>
                                <Card bordered={false}>
                                    <Statistic title="Active" value={11.28} precision={2} valueStyle={{ color: '#3f8600' }} prefix={<ArrowUpOutlined />} suffix="%" />
                                </Card>
                                <Card bordered={false}>
                                    <Statistic title="Idle" value={9.3} precision={2} valueStyle={{ color: '#cf1322' }} prefix={<ArrowDownOutlined />} suffix="%" />
                                </Card>
                                <Card bordered={false}>
                                    <Statistic title="Active" value={11.28} precision={2} valueStyle={{ color: '#3f8600' }} prefix={<ArrowUpOutlined />} suffix="%" />
                                </Card>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <Card bordered={false} style={{ width: '70%' }}>
                                    <h3 className="text-base/7 font-semibold text-gray-900">Avances por proyecto</h3>
                                    <div style={{ width: '100%' }}>
                                        <Doughnut data={dataProyectos} options={optionsProyectos} />
                                    </div>
                                </Card>
                                <Card bordered={false} style={{ width: '30%' }}>
                                    <h3 className="text-base/7 font-semibold text-gray-900">Efectividad por responsable por proyecto</h3>
                                    <div style={{ width: '100%' }}>
                                        <Bar data={dataEfectividad} options={optionsEfectividad} />
                                    </div>
                                    <h3 className="text-base/7 font-semibold text-gray-900 pt-4">Tareas activas por responsable por proyecto</h3>
                                    <div style={{ width: '100%' }}>
                                        <Doughnut data={dataProyectos} options={optionsProyectos} />
                                    </div>
                                </Card>
                            </div>
                        </div>

                    </TabPanel>
                    <TabPanel>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
                            <div className="flex flex-col rounded shadow gap-1 pb-2" style={{ backgroundColor: '#f1f2f4' }}>
                                <h3 className='text-black pb-0' style={{ padding: 14, fontSize: 14 }}>Pendiente</h3>
                                {pendiente.map((item) => {
                                    let checks = countTasks(item?.notes);
                                    let colorCheck = checks == item?.notes.length;
                                    return (
                                        <div className="group relative rounded bg-white mb-0 mt-0 shadow-sm border border-white hover:border-gray-400 " style={{ margin: 8, padding: '8px 12px 6px' }} onClick={() => viewDetails({ item })}>
                                            <div className='flex flex-row justify-between items-start'>
                                                <h2 className="text-sm font-semibold text-gray-800" style={{ width: '90%' }}>{item?.name}</h2>
                                                <EditOutlined className="hidden group-hover:block" />
                                            </div>
                                            <div className='flex flex-row justify-between'>
                                                <div className='flex flex-row flex-wrap items-center rounded p-1 justify-between gap-1' style={{ border: '0.5px solid #B6B6B650', backgroundColor: colorCheck && 'green', color: colorCheck ? 'white' : '#B6B6B680', fontSize: 14 }}>
                                                    <CheckSquareOutlined /> {checks}/{item?.notes.length}
                                                </div>
                                                <Avatar.Group>
                                                    {item?.notes.map((item_, index) => <Avatar style={{ backgroundColor: colores[index] }}>{indexUserById(item_?.id)?.label.charAt(0)}</Avatar>)}
                                                </Avatar.Group>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {/*<Modal
                title={itemSelected?.name}
                centered
                open={modal1Open}
                onOk={() => setModal1Open(false)}
                onCancel={() => setModal1Open(false)}
            >
                {!itemSelected ? <p>Cargando...</p> :
                    <div>
                        <CheckboxGroup colorScheme='green' defaultValue={[0]}>
                            <div className='flex flex-col'>
                                {itemSelected?.notes.map((item_) => <Checkbox value={item_?.task}>{item_?.task}</Checkbox>)}
                            </div>
                        </CheckboxGroup>
                    </div>
                }
            </Modal>*/}
            <Modal isOpen={modal1Open} onClose={() => setModal1Open(false)} isCentered size={'5xl'}>
                <ModalOverlay />
                <ModalContent style={{ backgroundColor: '##f3f4f5' }}>
                    <ModalCloseButton className='mt-1' />
                    <ModalBody>
                        <div className='gap-3'>
                            {!itemSelected ? <p>Cargando...</p> :
                                <div style={{ display: 'grid', gridTemplateColumns: '8fr 1fr' }}>
                                    <div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            <div className='div-container-inputs-form'>
                                                <VscUngroupByRefType style={{ fontSize: 25, color: '#00a0df80', border: '1px solid #B6B6B650', borderRadius: 3, padding: 2, marginRight: 4 }} />
                                                <input
                                                    type="text"
                                                    placeholder="Agregar título"
                                                    value={itemSelected?.name}
                                                    //onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                                    //className='input-select-calendar'
                                                    className='input-text-form-02'
                                                //style={{ fontSize: 20 }}
                                                />
                                            </div>
                                            <p style={{ paddingLeft: 39 }} className='pb-0 mb-0 text-sm'>Alta</p>
                                            <div style={{ paddingLeft: 39 }} className='flex flex-col gap-y-1.5'>
                                                <div>
                                                    <p className='pb-0 mb-0'>Miembros</p>
                                                    <Avatar.Group>
                                                        {itemSelected?.notes.map((item_, index) => <Avatar style={{ backgroundColor: colores[index] }}>{indexUserById(item_?.id)?.label.charAt(0)}</Avatar>)}
                                                    </Avatar.Group>
                                                </div>
                                                <div>
                                                    <p className='pb-0 mb-0'>Fechas</p>
                                                    <p className='pb-0 mb-0 text-xxs'>{itemSelected?.start_date} - {itemSelected?.end_date}</p>
                                                </div>
                                            </div>
                                            <div className='div-container-inputs-form'>
                                                <VscUngroupByRefType style={{ fontSize: 25, color: '#00a0df80', border: '1px solid #B6B6B650', borderRadius: 3, padding: 2, marginRight: 4 }} />
                                                <div style={{ width: '100%' }}>
                                                    <p className='pb-0 mb-0' style={{ paddingLeft: 39 }}>description</p>
                                                    <textarea
                                                        type="text"
                                                        placeholder="Agregar título"
                                                        value={itemSelected?.description}
                                                        //onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                                        //className='input-select-calendar'
                                                        className='input-text-form-02'
                                                    //style={{ fontSize: 20 }}
                                                    />
                                                </div>

                                            </div>
                                            <div className='div-container-inputs-form'>
                                                <VscUngroupByRefType style={{ fontSize: 25, color: '#00a0df80', border: '1px solid #B6B6B650', borderRadius: 3, padding: 2, marginRight: 4 }} />
                                                <div>
                                                    <p className='pb-0 mb-0' style={{ paddingLeft: 6 }}>Lista</p>
                                                    <CheckboxGroup colorScheme='green' defaultValue={[0]}>
                                                        <div className='flex flex-col'>
                                                            {itemSelected?.notes.map((item_) => <Checkbox value={item_?.task}><p className='text-sm pb-0 mb-0'>{item_?.task}</p></Checkbox>)}
                                                            
                                                        </div>
                                                    </CheckboxGroup>
                                                    <Button variant='ghost' onClick={() => setModal1Open(false)}>
                                                                Añadeelemnto
                                                            </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col mt-5 gap-1'>
                                        <Button leftIcon={<RxClipboardCopy />} size={'sm'} style={{ backgroundColor: '#e7e9eb' }} onClick={() => setModal1Open(false)}>
                                            Duplicar
                                        </Button>
                                        <Button leftIcon={<MdDeleteOutline />}  size={'sm'} style={{ backgroundColor: '#e7e9eb' }} onClick={() => setModal1Open(false)}>
                                            Eliminar
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' onClick={() => setModal1Open(false)}>
                            Cancelar
                        </Button>
                        <Button variant='ghost' onClick={() => setModal1Open(false)}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default IndicatorDetails;
