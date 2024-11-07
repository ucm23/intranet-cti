import React, { useState, useEffect } from 'react';
import { FaFolder } from "react-icons/fa";
import color from '../../color';
import { Box } from '@chakra-ui/react'
import { indexProjects } from '../../api/project/projects';
import { openNotificationWithIcon } from '../../libs/main';
import { Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const Indicator = () => {

    const navigate = useNavigate();
    const [level, setLevel] = useState(0);
    const [projects, setProjects] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, description) => openNotificationWithIcon(api, type, description)

    useEffect(() => {
        getProjects()
    }, [])

    const getProjects = async () => {
        try {
            const projects = await indexProjects({})
            if (projects?.status) setProjects(projects?.data)
        } catch (error) {
            console.error("🚀 ~ getProjects ~ error:", error)
        }
    }

    return (
        <div className="mx-auto pr-4 pb-8 bgwhite">
            {contextHolder}
            <div className="flex" style={{ width: '100%' }}>
                <div className="mx-auto pb-8 content-scroll-auto" style={{ flex: '1' }}>
                    <div className="flex justify-between items-center mb-2 pl-6 mt-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-0 pb-0 mt-8" style={{ paddingLeft: 8 }}>Indicadores</h2>
                        <Button
                            //icon={<PlusOutlined />}
                            //onClick={() => navigate("/addnews")}
                            type="primary">
                            Añadir
                        </Button>
                    </div>
                    <div className="p-4 pt-0 pb-0">
                        <Box className={`height-75vh`} style={{ padding: 8 }} >
                            <h2 className="text-sm font-semibold text-gray-800 mb-3">Proyectos</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                                {projects.map((project, index) => (
                                    <div
                                        key={`projects-${project?.id}-${index}`}
                                        className="p-3 rounded hover:shadow-md transition-shadow duration-200 cursor-pointer"
                                        style={{ backgroundColor: color?.bgFiles }}
                                        onClick={() => navigate('/indicatorDetails', { state: { project } })}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <FaFolder style={{ fontSize: 18 }} className="text-yellow-400" />
                                            <div className="flex-1">
                                                <h3 className="font-normal text-sm text-gray-800 line-clamp-1">{project?.name}</h3>
                                                <p className="text-sm text-gray-500 pb-0 line-clamp-1">{departments.length} elementos</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Indicator;