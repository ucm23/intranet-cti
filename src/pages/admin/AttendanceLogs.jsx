import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseApi';
import {
    LeftOutlined, RightOutlined
} from '@ant-design/icons';
import { indexUsers } from '../../api/users/users';

const AttendanceLogs = () => {
    const [checks, setChecks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [filter, setFilter] = useState('daily');
    const itemsPerPage = 10;

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const { status, data } = await indexUsers({})
        console.log("🚀 ~ getUsers ~ data:", data)
        if (status) setUsers(data);
    };

    useEffect(() => {
        getUsers()
    }, [])
    

    const loadChecks = async (page = 1) => {
        setLoading(true);
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage - 1;
        try {


        } catch (error) {
            console.error('Error loading checks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        //loadChecks(currentPage);
    }, [currentPage]);

    const totalPages = Math.ceil(totalRecords / itemsPerPage);
    const startRecord = (currentPage - 1) * itemsPerPage + 1;
    const endRecord = Math.min(currentPage * itemsPerPage, totalRecords);

    // Función para determinar el estado basado en la hora
    /*const getStatus = (checkTime) => {
        if (!checkTime) return { label: 'ABSENT', color: 'error' };

        const hour = new Date(checkTime).getHours();
        const minute = new Date(checkTime).getMinutes();
        const timeValue = hour + minute / 60;

        if (timeValue > 9) return { label: 'LATE', color: 'tertiary' };
        return { label: 'PRESENT', color: 'primary' };
    };*/

    // Formatear hora
    /*const formatTime = (timestamp) => {
        if (!timestamp) return '—';
        return new Date(timestamp).toLocaleTimeString('es-MX', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };*/

    // Formatear fecha
    /*const formatDate = (date) => {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };*/

    return (
        <div className="mx-auto pb-8 bgwhite">
            <div className="flex" style={{ width: '100%' }}>
                <div className="mx-auto pb-8 content-scroll-auto" style={{ flex: '1' }}>
                    <div class="flex justify-between items-end m-3">
                        <div>
                            <h3 class="font-headline-lg text-headline-lg text-on-surface mb-1">Users</h3>
                            <p class="font-body-md text-body-md text-on-surface-variant">Manage and monitor organization access and permissions</p>
                        </div>
                    </div>
                    <div class="flex bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex-col h-full" >
                        <div class="p-6 border-b border-outline-variant/30 flex flex-wrap gap-4 items-center justify-between">
                            <div class="flex gap-3">
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-outline">
                                        <span class="material-symbols-outlined text-[18px]">filter_list</span>
                                    </span>
                                    <select class="pl-10 pr-8 py-2 bg-surface-container-low border border-outline-variant/50 rounded-lg text-sm appearance-none focus:ring-primary/20 focus:border-primary">
                                        <option>All Roles</option>
                                        <option>Admin</option>
                                        <option>Editor</option>
                                        <option>Viewer</option>
                                    </select>
                                </div>
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-outline">
                                        <span class="material-symbols-outlined text-[18px]">fiber_manual_record</span>
                                    </span>
                                    <select class="pl-10 pr-8 py-2 bg-surface-container-low border border-outline-variant/50 rounded-lg text-sm appearance-none focus:ring-primary/20 focus:border-primary">
                                        <option>All Status</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="relative w-full max-w-md">
                                <input
                                    class="w-full pl-4 pr-4 py-2 bg-surface-container-low border border-outline-variant/50 rounded-md text-sm focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Buscar por nombre..." type="text" />
                            </div>
                        </div>
                        <div class="px-6 py-4 border-t border-outline-variant/30 flex items-center justify-between bg-surface-container-low/30 flex-shrink-0">
                            <p class="text-sm text-on-surface-variant">
                                Showing <span class="font-semibold text-on-surface">1</span> to <span class="font-semibold text-on-surface">4</span> of <span class="font-semibold text-on-surface">24</span> users
                            </p>
                            <div class="flex gap-2">
                                <button class="px-3 py-1.5 border border-outline-variant/50 rounded-lg text-sm font-medium hover:bg-surface-container-high transition-colors disabled:opacity-50" disabled="">Previous</button>
                                <button class="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-container transition-all">Next</button>
                            </div>
                        </div>
                        <div class="flex-1 overflow-y-auto min-h-0">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr class="bg-surface-container-low/50">
                                        <th class="px-6 py-4 font-semibold text-xs text-outline uppercase tracking-wider">Nombre</th>
                                        <th class="px-6 py-4 font-semibold text-xs text-outline uppercase tracking-wider">Correo</th>
                                        <th class="px-6 py-4 font-semibold text-xs text-outline uppercase tracking-wider">Rol</th>
                                        <th class="px-6 py-4 font-semibold text-xs text-outline uppercase tracking-wider">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-outline-variant/20">
                                    <tr class="hover:bg-surface-container-low transition-colors group">
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-3">
                                                <img alt="Sarah Jenkins portrait" class="w-10 h-10 rounded-full object-cover bg-surface-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKum6DJ_aokKPGR8tG0GD9DnT-KdFRJb8Ui3gSYAFGyOQ1z2x9_NBaAHE6SLGQxfnf622Oi4DBcVSDSCNxQ5ED-yzSywJqZB8cwFK_aduYmIBzOs" />
                                                <span class="font-medium text-on-surface">Sarah Jenkins</span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-sm text-on-surface-variant">s.jenkins@corp-admin.com</td>
                                        <td class="px-6 py-4">
                                            <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">Admin</span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-1.5 text-xs font-medium text-green-600">
                                                <span class="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                                                Active
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button class="p-1.5 text-outline hover:text-primary transition-colors">
                                                    <span class="material-symbols-outlined text-[18px]">edit</span>
                                                </button>
                                                <button class="p-1.5 text-outline hover:text-error transition-colors">
                                                    <span class="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceLogs;