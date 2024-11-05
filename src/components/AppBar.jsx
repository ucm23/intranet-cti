import React, { useState, useEffect } from 'react';
import {
    MenuOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import * as AntIcons from '@ant-design/icons';
import { Layout } from 'antd';
import { useBreakpointValue } from '@chakra-ui/react'
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

const Icon = ({ icon, style }) => {
    const IconComponent = AntIcons[icon];
    return IconComponent ? <IconComponent style={style} /> : null;
};

const AppBar = ({ children, page, extra }) => {

    const navigate = useNavigate();
    const mobile = useBreakpointValue({ base: true, md: false });
    const [loading, setLoading] = useState('MenuOutlined');

    useEffect(() => {
        setTimeout(() => {
            setLoading('ArrowLeftOutlined')
        }, 1250);
    }, []);

    const handleBackToList = () => {
        navigate(`/${page}`, { state: { updated: true }, replace: true, });
    };

    return (
        <Layout style={{ height: '100vh', overflow: 'hidden' }}>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#03296A', height: 46, padding: 0, paddingRight: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="btn-menu-header icon-container" onClick={handleBackToList} >
                        <Icon icon={loading} style={{ color: 'white' }} />
                    </div>
                    <img src="/img/logo-white-removebg.png" alt="/img/logo-blue-removebg.png" style={{ height: 40, marginLeft: !mobile ? 12 : 0 }} />
                </div>
            </Header>
            {extra &&
                <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '0px 12px', borderBottomWidth: 0.5 }}>
                    {extra}
                </Header>
            }
            <Layout>
                <Content className=''>
                    {children}
                </Content>
            </Layout>
        </Layout>

    )
}

export default AppBar;