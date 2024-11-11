import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import es from 'date-fns/locale/es';
import { Box, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createEvents, indexEvents } from '../../api/events/events';
import { indexDepartments } from '../../api/departamentos/departments';
import { indexUsers } from '../../api/users/users';
import moment from 'moment/moment';
import { Button, Dropdown, Checkbox, List, Skeleton } from "antd";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { RightOutlined } from '@ant-design/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Card } from '@chakra-ui/react'
import { FiBriefcase } from 'react-icons/fi';
import { TbUsersPlus } from "react-icons/tb";
import { VscUngroupByRefType } from "react-icons/vsc";
import { IoTimeOutline } from "react-icons/io5";
import { RiSave2Fill } from "react-icons/ri";
import { BsTextParagraph } from "react-icons/bs";
import { MdOutlineLayers } from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";
import ReactQuill from 'react-quill';
import { MultiSelect } from "react-multi-select-component";
import { formats, messagesNotification, modules } from '../../libs/main';
import { notification } from 'antd';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import '../../styles/custom-calendar.css';
import {
    PlusOutlined
} from '@ant-design/icons';

const locales = {
    es: es,
};

const openNotificationWithIcon = (api, type, description) => {
    api[type]({
        message: messagesNotification[type].message,
        description: messagesNotification[type].description || description,
    });
};

const localizer = dateFnsLocalizer({
    format: (date, formatString) => format(date, formatString, { locale: es }),
    parse: (dateString, formatString) => parse(dateString, formatString, new Date(), { locale: es }),
    startOfWeek: () => startOfWeek(new Date(), { locale: es }),
    getDay: (date) => getDay(date),
    locales,
});

const Calendar = () => {
    const information_user = useSelector(state => state.login.information_user);
    const { id: user_id } = information_user;
    const mobile = useBreakpointValue({ base: true, md: false });
    const navigate = useNavigate();
    const { isOpen: isOpenEvent, onOpen: onOpenEvent, onClose: onCloseEvent } = useDisclosure()
    const [newEvent, setNewEvent] = useState({
        department_id: 0,
        user_id,
        title: '',
        description: '',
        link: '',
        start: null,
        end: null,
        type: '',
        participants_ids: ''
    });
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, description) => openNotificationWithIcon(api, type, description)
    const [selected, setSelected] = useState([]);
    const [users, setUsers] = useState([]);
    const [body, setBody] = useState('');
    const [departaments, setDepartaments] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventsByDay, setEventsByDay] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEditDelete, setShowEditDelete] = useState(true);
    const [dateSelect, setDateSelect] = useState(new Date().toISOString().split('T')[0])

    useEffect(() => {
        getDepartments()
        getUsers()
        getEvents()
    }, [])

    const getEvents = async () => {
        const { status, data } = await indexEvents({})
        if (status) setEvents(data)
    };

    const getDepartments = async () => {
        const { status, data } = await indexDepartments({})
        if (status) setDepartaments(data)
    };

    const getUsers = async () => {
        const { status, data } = await indexUsers({})
        if (status) setUsers(data);
    };

    const formatDateTime = (date) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(date).toLocaleTimeString([], options);
    };

    const validateEvent = () => {
        const requiredFields = [
            { field: newEvent.department_id, message: 'Debe seleccionar el departamento' },
            { field: newEvent.type, message: 'Debe seleccionar el tipo de evento' },
            { field: selected.length, message: 'Debe seleccionar al menos un participante' },
            { field: newEvent.title, message: 'El campo título es obligatorio' },
            { field: newEvent.start, message: 'Es necesario establecer una fecha y hora de inicio' },
            { field: newEvent.end, message: 'Es necesario establecer una fecha y hora de fin' },
        ];

        for (const { field, message } of requiredFields) {
            if (!field) {
                openNotification('warning', message);
                return false;
            }
        }
        return true;
    };

    const handleAddEvent = async () => {
        console.log("🚀 ~ handleAddEvent ~ !validateEvent() || newEvent.start < newEvent.end:", (newEvent.start < newEvent.end))
        if (!validateEvent()/* && newEvent.start < newEvent.end*/) return;
        try {
            newEvent.department_id = parseInt(newEvent.department_id)
            if (newEvent.link) newEvent.url = newEvent.link;
            delete newEvent.link;
            newEvent.event_type = newEvent.type;
            delete newEvent.type;
            newEvent.description = body;
            //newEvent.start_date = moment(newEvent.start).format('YYYY-MM-DDTH:MM');
            let date = new Date(newEvent.start);
            let localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            newEvent.start_date = localDate;
            //newEvent.end_date = moment(newEvent.end).format('YYYY-MM-DDTH:MM');
            date = new Date(newEvent.end);
            localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            newEvent.end_date = localDate;
            delete newEvent.start;
            delete newEvent.end;
            newEvent.user_id = user_id;
            newEvent.participants_ids = selected.map(item => item?.value)
            console.log("Estado de newEvent:", newEvent);
            const response = await createEvents({ event: newEvent });
            console.log("Respuesta del servidor:", response);
            if (response?.status) {
                openNotification('success', 'Evento creado con éxito');
                getEvents()
                //onCloseEvent();
            } else openNotification('warning', 'No hemos podido crear el evento, verifique los campos');
        } catch (error) {
            console.error("Error en la petición:", error);
            openNotification('error', 'Ha ocurrido un error, intenté de nuevo');
        }

    }



    const handleEditEvent = (event) => {
        setSelectedEvent(event);
        setNewEvent({ title: event.title, description: event.description, link: event.link, type: event.type, area: event.area, start: event.start, end: event.end })
        // setNewEvent({ title: event.title,start: event.start, end: event.end });
    };

    const handleUpdateEvent = () => {
        if (newEvent.title && newEvent.start && newEvent.end && newEvent.start < newEvent.end) {
            const updatedEvents = events.map(evt =>
                evt.start === selectedEvent.start ? { ...evt, title: newEvent.title, start: newEvent.start, end: newEvent.end } : evt
            );
            setEvents(updatedEvents);
            setSelectedEvent(null);
            // setNewEvent({ title: '', start: null, end: null });
            setNewEvent({ title: '', description: '', link: '', type: '', area: '', start: null, end: null });
        } else {
            // alert('Por favor, complete todos los campos correctamente.');
        }
    };

    const handleDeleteEvent = () => {
        const updatedEvents = events.filter(evt => evt.start !== selectedEvent.start);
        setEvents(updatedEvents);
        setSelectedEvent(null);
        // setNewEvent({ title: '', start: null, end: null });
        setNewEvent({ title: '', description: '', link: '', type: '', area: '', start: null, end: null });
    };

    const handleCancel = () => {
        // Restablecer el estado al cancelar
        setSelectedEvent(null); // Limpiar el evento seleccionado
        setNewEvent({ title: '', description: '', link: '', type: '', area: '', start: null, end: null }); // Limpiar formulario
        setShowEditDelete(true); // Mostrar nuevamente los botones de editar y eliminar si corresponde
    };

    const items = [
        {
            label: 'Cumpleaños',
            key: '1',
        },
        {
            label: 'Reunión programada',
            key: '2',
        },
    ];

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const options = [
        {
            label: 'Cumpleaños',
            value: 1,
        },
        {
            label: 'Reuniones',
            value: 2,
        },
        {
            label: 'Curso',
            value: 3,
        },
    ];

    const handleSelectSlot = (slotInfo) => {
        let date = new Date(slotInfo?.start);
        const filter = events.filter(event => {
            const eventDate = /*new Date(event.start).toISOString().split('T')[0];*/ new Date(event?.start.getTime() - date.getTimezoneOffset() * 60000);
            return eventDate < /*new Date(slotInfo?.start).toISOString().split('T')[0];*/ new Date(slotInfo?.start.getTime() - date.getTimezoneOffset() * 60000);
        });
        setEventsByDay(filter)
        setDateSelect(new Date(slotInfo?.start).toISOString().split('T')[0])
    };

    return (
        <div className="mx-auto min-h-screen bgwhite">
            {contextHolder}
            <div
                /*percentage={true}
                primaryMinSize={50}
                primaryMaxSize={100}
                secondaryMinSize={20}
                secondaryMaxSize={50}
                secondaryInitialSize={25}*/
                //customClassName="my-inner-splitter-layout"
                style={{ display: 'flex', flexDirection: 'row', height: '94vh' }}
            >
                <div style={{ height: '100%', width: '70%' }}>
                    <div className="flex justify-between items-center py-6 mx-2">
                        <h2 className="text-3xl font-bold text-gray-800">Calendario</h2>
                        <Button
                            type="primary"
                            //loading={false}
                            icon={<PlusOutlined />}
                            //menu={{ items }}
                            size='large'
                            onClick={onOpenEvent}
                        //style={{ padding: '10px 0px 10px 8px' }}
                        >
                            Añadir
                        </Button>
                    </div>


                    <BigCalendar
                        selectable
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{
                            width: '100%',
                            height: '89%',
                            fontSize: '11px'
                        }}
                        defaultView="month"
                        onSelectSlot={handleSelectSlot}
                        views={['month', 'week', 'day']}
                        messages={{
                            today: 'Hoy',
                            previous: 'Anterior',
                            next: 'Siguiente',
                            month: 'Mes',
                            week: 'Semana',
                            day: 'Día',
                            agenda: 'Agenda',
                            date: 'Fecha',
                            time: 'Hora',
                            event: 'Evento',
                            noEventsInRange: 'No hay eventos en este rango.',
                        }}
                        className="custom-calendar"  // Agregamos clase personalizada
                        onSelectEvent={handleEditEvent}
                    />
                </div>
                <div style={{ padding: '10px 0px 10px 8px', width: '30%' }}>
                    <h2>
                        <Box as='span' flex='1' textAlign='left'>
                            {dateSelect}
                        </Box>
                    </h2>
                    <List
                        className="demo-loadmore-list"
                        loading={false}
                        itemLayout="horizontal"
                        //loadMore={loadMore}
                        dataSource={eventsByDay}
                        renderItem={(item) => {
                            return (
                                <List.Item
                                    actions={[<RightOutlined />]}
                                >
                                    <Skeleton avatar title={false} loading={item?.loading} active>
                                        <div className="div-items-events" />
                                        <List.Item.Meta
                                            title={<a>{item?.title}</a>}
                                            description={<p className='my-0 my-0'><div className='line-clamp-1' dangerouslySetInnerHTML={{ __html: item?.description }} /></p>}
                                        />
                                        {/*<div>content</div>*/}
                                    </Skeleton>
                                </List.Item>
                            )
                        }}
                    />
                </div>
            </div>
            <Modal onClose={onCloseEvent} size={'3xl'} isOpen={isOpenEvent} scrollBehavior={'inside'} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='modal-header-bg'>Nuevo evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='modal-body-create'>
                        <Card style={{ display: 'flex', flexDirection: 'row', padding: 3, gap: 6, marginTop: 16 }}>
                            <div className='select-options-form div-container-inputs-form'>
                                <FiBriefcase style={{ fontSize: 15, color: '#ccc', marginRight: 4 }} />
                                <select
                                    value={newEvent.department_id}
                                    onChange={(e) => setNewEvent({ ...newEvent, department_id: e.target.value })}
                                    className='without-focus'
                                >
                                    <option>Departamento</option>
                                    {departaments.length > 0 ?
                                        departaments.map((item) => <option key={`sel-dep-event-${item?.id}-${item?.name}`} value={item?.id}>{item?.name}</option>)
                                        : <option disabled>No hay departamentos disponibles</option>}
                                </select>
                            </div>
                            <div style={{ width: 1, height: 'auto', backgroundColor: '#B6B6B699' }} />
                            <div className='select-options-form div-container-inputs-form'>
                                <MdOutlineLayers style={{ fontSize: 15, color: '#ccc', marginRight: 4 }} />
                                <select
                                    value={newEvent.type}
                                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                                    className='without-focus'
                                >
                                    <option>Tipo</option>
                                    {['Reunión', 'Curso', 'Cumpleaños', 'Otro'].map((item) => <option key={`sel-type-event-${item}`} value={item}>{item}</option>)}
                                </select>
                            </div>
                        </Card>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8, paddingTop: 6, gap: 6 }}>
                            <div className='div-container-inputs-form'>
                                <VscUngroupByRefType style={{ fontSize: 25, color: '#00a0df80', border: '1px solid #B6B6B650', borderRadius: 3, padding: 2, marginRight: 4 }} />
                                <input
                                    type="text"
                                    placeholder="Agregar título"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    //className='input-select-calendar'
                                    className='input-text-form'
                                    style={{ fontSize: 20 }}
                                />
                            </div>

                            <div className='div-container-inputs-form' style={{ marginTop: 6, marginBottom: 6 }}>
                                <TbUsersPlus style={{ fontSize: 22, color: '#ccc', padding: 2, marginRight: 8 }} />
                                <MultiSelect
                                    options={users.filter((item) => item?.id !== user_id)}
                                    value={selected}
                                    onChange={setSelected}
                                    //labelledBy="Select"
                                    className='input-multi-text-form'
                                    labelledBy="Select"
                                    hasSelectAll={false}
                                    overrideStrings={{
                                        "selectSomeItems": "Selecciona...",
                                        "allItemsAreSelected": "Todos los usuarios estan invitados",
                                        "search": "Buscar",
                                        "clearSearch": "Limpiar búsqueda",
                                        "clearSelected": "Limpiar seleccionados",
                                        "noOptions": "No hay opciones disponibles"
                                    }}
                                />
                            </div>
                            <div className='div-container-inputs-form'>
                                <CiVideoOn style={{ fontSize: 22, color: '#ccc', padding: 2, marginRight: 8 }} />
                                <input
                                    type="text"
                                    placeholder="Liga de videoconferencia"
                                    value={newEvent.link}
                                    onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })}
                                    //className='input-select-calendar'
                                    className='input-text-form'
                                //style={{ fontSize: 20 }}
                                />
                            </div>
                            <div className='div-container-inputs-form'>
                                <IoTimeOutline style={{ fontSize: 22, color: '#ccc', padding: 2, marginRight: 8 }} />
                                <div className='div-container-inputs-form' style={{ gap: 4 }}>
                                    <DatePicker
                                        placeholderText="Fecha de inicio"
                                        selected={newEvent.start}
                                        onChange={(start) => setNewEvent({ ...newEvent, start })}
                                        showTimeSelect
                                        //dateFormat="Pp"
                                        customInput={<input className='input-date-calendar' />}
                                        locale={es}
                                        timeFormat="HH:mm"
                                        timeIntervals={30}
                                        timeCaption="time"
                                        dateFormat="d-MMMM-yyyy h:mm aa"
                                    />
                                    <p style={{ color: '#B6B6B650' }}>_</p>
                                    <DatePicker
                                        placeholderText="Fecha de finalización"
                                        selected={newEvent.end}
                                        onChange={(end) => setNewEvent({ ...newEvent, end })}
                                        showTimeSelect
                                        //dateFormat="Pp"
                                        minDate={newEvent.start || null}
                                        customInput={<input className='input-date-calendar' />}
                                        disabled={!newEvent.start}
                                        locale={es}
                                        timeFormat="HH:mm"
                                        timeIntervals={30}
                                        timeCaption="time"
                                        dateFormat="d-MMMM-yyyy h:mm aa"
                                    />
                                </div>
                            </div>
                            <div className='div-container-inputs-form' style={{ alignItems: 'flex-start' }}>
                                <BsTextParagraph style={{ fontSize: 22, color: '#ccc', padding: 2, marginRight: 8 }} />
                                <div style={{ width: '100%', height: 180 }}>
                                    <ReactQuill
                                        modules={modules}
                                        formats={formats}
                                        theme="snow"
                                        value={body}
                                        onChange={setBody}
                                        placeholder="Agregar contenido..."
                                        style={{ height: 135 }}
                                    />
                                </div>
                            </div>

                            <div className='div-container-inputs-form' style={{ justifyContent: 'flex-end', marginTop: 16, marginBottom: 14 }}>
                                <Button type='primary' onClick={handleAddEvent}>
                                    <RiSave2Fill style={{ fontSize: 20, color: 'white', marginRight: 6 }} />
                                    Guardar
                                </Button>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
};

export default Calendar;