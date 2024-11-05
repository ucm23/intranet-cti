import React, { useState } from 'react';
import Navbar from '../../componentes/Navbar';
import logo from '../../img/logo-white.png';
import { useNavigate } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import esES from 'date-fns/locale/es';
import { useBreakpointValue } from '@chakra-ui/react'


const locales = {
    'es': esES,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: 'Reunión de equipo',
        start: new Date(2023, 7, 29, 10, 0),
        end: new Date(2023, 7, 29, 12, 0),
    },
    {
        title: 'Lanzamiento del producto',
        start: new Date(2023, 7, 30, 14, 0),
        end: new Date(2023, 7, 30, 15, 0),
    },
    {
        title: 'Conferencia',
        start: new Date(2023, 8, 1, 9, 0),
        end: new Date(2023, 8, 1, 10, 0),
    },
];


const Calendario = () => {

    const mobile = useBreakpointValue({ base: true, md: false });
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    };
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Navbar backgroundColor="#001529" />

            {/* <div style={{ width: '85%', height: '85vh' }}> */}
            <div>
                <h1 style={{ textAlign: 'center', color: 'black', fontSize: '22px',fontFamily: 'copperplate gothic bold', top:'30px' }}>Calendario de Eventos</h1>
                <br></br>
                <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 400, width: '95%', alignItems: 'center', textAlign: 'center', marginLeft: '20', marginTop: '10' }}
                            defaultView="month"
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
                        />
                    
                    <div className="container" style={{
                    position: 'absolute',
                    top: '95%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo semitransparente
                    color: 'black', // Texto blanco para contraste
                    padding: '20px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    width: '100',
                    height: '3vh',
                    overflow: 'hidden',
                    overflowX: 'hidden',
                    maxWidth: '800px',
                    // border: '2px solid #000'
                }}>

                </div>




            </div>
        </div>
    )
}

export default Calendario