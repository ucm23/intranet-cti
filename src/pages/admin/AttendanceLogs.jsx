import { useState, useEffect } from 'react';
import {
    LeftOutlined, RightOutlined
} from '@ant-design/icons';
import { get_daily_checks, indexUsers } from '../../api/users/users';
import moment from "moment/moment";
import { AiOutlineClose } from "react-icons/ai";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const AttendanceLogs = () => {
    const [checks, setChecks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [users, setUsers] = useState([]);
    const [selectedCheck, setSelectedCheck] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const pageSize = 10; // Siempre 2 como solicitaste

    const getUsers = async () => {
        const { status, data } = await indexUsers({});
        console.log("🚀 ~ getUsers ~ data:", data);
        if (status) setUsers(data);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const loadChecks = async (pageNum = 1) => {
        setLoading(false);
        try {
            let response = await get_daily_checks({
                page: pageNum,
                pageSize
            });

            console.log("🚀 ~ loadChecks ~ response:", response);
            setTotalRecords(response?.data?.totalItems || 0);
            setChecks(response?.data?.data || []);
        } catch (error) {
            console.error('Error loading checks:', error);
        } finally {
            setLoading(true);
        }
    };

    // Calcular total de páginas basado en totalRecords y pageSize
    const totalPages = Math.ceil(totalRecords / pageSize);

    useEffect(() => {
        loadChecks(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleRowClick = (check) => {
        setSelectedCheck(check);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCheck(null);
    };

    // Calcular registros mostrados
    const startRecord = (page - 1) * pageSize + 1;
    const endRecord = Math.min(page * pageSize, totalRecords);

    // Obtener información del usuario
    const getUserInfo = (userId) => {
        return users.find(user => user?.id === userId);
    };

    // Formatear hora con AM/PM
    const formatTimeWithAmPm = (timestamp) => {
        if (!timestamp) return '—';
        return moment(timestamp).format('hh:mm A');
    };

    // Formatear fecha
    const formatDate = (timestamp) => {
        if (!timestamp) return '—';
        return moment(timestamp).format('DD-MM-YYYY');
    };

    return (
        <div className="mx-auto min-h-screen bg-white content-scroll-auto">
            <div className="flex" style={{ width: '100%' }}>
                <div className="mx-auto pb-8" style={{ flex: '1' }}>
                    <div className="flex justify-between items-end m-3">
                        <div>
                            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-1">Registros de Asistencia</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">Gestionar y monitorear los registros de acceso de los usuarios</p>
                        </div>
                    </div>
                    <div className="flex bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex-col h-full">
                        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/30 flex-shrink-0">
                            <p className="text-sm text-on-surface-variant">
                                Mostrando <span className="font-semibold text-on-surface">{startRecord}</span> a <span className="font-semibold text-on-surface">{endRecord}</span> de <span className="font-semibold text-on-surface">{totalRecords}</span> registros
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                    className="px-3 py-1.5 border border-outline-variant/50 rounded-lg text-sm font-medium hover:bg-surface-container-high transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                >
                                    <LeftOutlined className="text-xs" /> Anterior
                                </button>
                                <span className="px-3 py-1.5 text-sm font-medium">
                                    Página {page} de {totalPages || 1}
                                </span>
                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages || totalPages === 0}
                                    className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                >
                                    Siguiente <RightOutlined className="text-xs" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto min-h-0">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-container-low/50">
                                        <th className="px-6 py-4 font-semibold text-xs text-outline uppercase tracking-wider">Nombre</th>
                                        <th className="px-6 py-4 font-semibold text-xs text-outline uppercase tracking-wider">Correo</th>
                                        <th className="px-6 py-4 font-semibold text-xs text-outline uppercase tracking-wider">Rol</th>
                                        <th className="px-6 py-4 font-semibold text-xs text-outline uppercase tracking-wider">Fecha</th>
                                        <th className="px-6 py-4 font-semibold text-xs text-outline uppercase tracking-wider">Hora</th>
                                    </tr>
                                </thead>
                                {loading && checks.length > 0 ? (
                                    <tbody className="divide-y divide-outline-variant/20">
                                        {checks.map((check, index) => {
                                            const user = getUserInfo(check?.user_id);
                                            return (
                                                <tr
                                                    className="hover:bg-surface-container-low transition-colors group cursor-pointer"
                                                    key={`key-logs-${check?.id}`}
                                                    onClick={() => handleRowClick(check)}
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={check?.photo_url || './img/default-user.png'}
                                                                alt={user?.first_name}
                                                                className="w-10 h-10 rounded-full object-cover bg-surface-container"
                                                                onError={(e) => e.target.src = './img/default-user.png'}
                                                                loading='lazy'
                                                            />
                                                            <span className="font-medium text-on-surface">
                                                                {user ? `${user.first_name}` : 'Usuario no encontrado'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-on-surface-variant">
                                                        {user?.email || '—'}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-xs font-semibold bg-primary/10 text-primary py-1">
                                                            {user?.role?.toUpperCase() || '—'}
                                                        </span>
                                                        <div className="flex text-xs font-medium text-green-600 mt-1">
                                                            {user?.position?.toUpperCase() || '—'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-1.5 text-xs font-medium">
                                                            {formatDate(check?.check_time)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-1.5 text-xs font-medium">
                                                            {formatTimeWithAmPm(check?.check_time)}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                ) : loading && checks.length === 0 ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-on-surface-variant">
                                                No se encontraron registros de asistencia
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-on-surface-variant">
                                                Cargando registros...
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal con información detallada */}
            {showModal && selectedCheck && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
                    <div className=" rounded-sm max-w-2xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-outline-variant/30 px-6 py-2.5 flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-on-surface pb-0">Detalles del Registro</h3>
                            <button onClick={closeModal} className="text-outline hover:text-primary transition-colors">
                                <AiOutlineClose className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 space-y-3 bg-white overflow-y-auto scroll ">
                            {(() => {
                                const user = getUserInfo(selectedCheck?.user_id);
                                return (
                                    <>
                                        <div className="flex gap-4 pb-2 border-b border-outline-variant/30">
                                            <img
                                                src={selectedCheck?.photo_url || './img/default-user.png'}
                                                alt={user?.first_name}
                                                className="w-20 h-20 rounded-full object-cover"
                                                onError={(e) => e.target.src = './img/default-user.png'}
                                                loading='lazy'
                                            />
                                            <div className='flex justify-center flex-col gap-1'>
                                                <h4 className="text-lg font-semibold mb-0 pb-0 pt-0 mt-1">
                                                    {user ? `${user.first_name}` : 'Usuario no encontrado'}
                                                </h4>
                                                <p className="text-sm mb-0 pb-0 pt-0 mt-0">Email: {user?.email || '—'}</p>
                                                <p className="text-sm">Tel: {user?.phone || '—'}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-1.2">
                                            <div>
                                                <label className="text-xs text-outline uppercase tracking-wider">Rol</label>
                                                <p className="text-sm font-medium text-on-surface mt-1">{user?.role?.toUpperCase() || '—'}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs text-outline uppercase tracking-wider">Posición</label>
                                                <p className="text-sm font-medium text-on-surface mt-1">{user?.position?.toUpperCase() || '—'}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs text-outline uppercase tracking-wider">Fecha de Registro</label>
                                                <p className="text-sm font-medium text-on-surface mt-1">{formatDate(selectedCheck?.check_time)}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs text-outline uppercase tracking-wider">Hora de Registro</label>
                                                <p className="text-sm font-medium text-on-surface mt-1">{formatTimeWithAmPm(selectedCheck?.check_time)}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-xs text-outline uppercase tracking-wider">Desde</label>
                                                <p className="text-sm font-medium text-on-surface mt-1">{selectedCheck?.user_agent}</p>
                                                <p className="text-sm font-medium">IP PUBLICA: <strong>{selectedCheck?.ip_address}</strong> </p>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-xs text-outline uppercase tracking-wider mb-2 block">Ubicación del Registro</label>
                                                <div className="mt-2 rounded-sm overflow-hidden border border-outline-variant/30" style={{ height: '235px' }}>
                                                    <LoadScript googleMapsApiKey="AIzaSyBjgHYkHaOw-ZVdT3rBVrfBRUdS33rKQDM">
                                                        <GoogleMap
                                                            mapContainerStyle={{ width: '100%', height: '100%' }}
                                                            center={{
                                                                lat: parseFloat(selectedCheck?.latitude) || 18.268422,
                                                                lng: parseFloat(selectedCheck?.longitude) || -97.157991
                                                            }}
                                                            zoom={15}
                                                            options={{
                                                                zoomControl: true,
                                                                mapTypeControl: false,
                                                                streetViewControl: false,
                                                                fullscreenControl: true
                                                            }}
                                                        >
                                                            <Marker
                                                                position={{
                                                                    lat: parseFloat(selectedCheck?.latitude) || 18.268422,
                                                                    lng: parseFloat(selectedCheck?.longitude) || -97.157991
                                                                }}
                                                                title="Ubicación del registro"
                                                            />
                                                        </GoogleMap>
                                                    </LoadScript>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceLogs;