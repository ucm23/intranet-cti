import React, { useEffect } from 'react';
import { List, Avatar } from 'antd';
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { LogoutOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const LabelProfile = ({ collapsed, signOut }) => {
    const information_user = useSelector(state => state.login.information_user);
    const { first_name, email, position } = information_user;

    useEffect(() => {
        console.log("🚀 ~ LabelProfile ~ information_user:", information_user)
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleKeyDown = (event) => event.shiftKey && event.key === 'E' && signOut();

    const renderItem = () => (
        <List.Item>
            <List.Item.Meta
                className='list.item.meta'
                avatar={
                    <Avatar size='default' className='list-item-meta-avatar list-item-meta-title' style={{ marginRight: collapsed ? 7 : 0 }}>
                        {first_name && first_name.charAt(0)}{/*last_name && last_name.charAt(0)*/}
                    </Avatar>
                }
                title={!collapsed && <h1 className='list-item-meta-title'>{position}</h1>}
                description={!collapsed && <h1 className='list-item-meta-description'>{first_name}</h1>}
            />
        </List.Item>
    )

    return (
        <Menu style={{ zIndex: 1000 }}>
            <MenuButton as={List}>
                <List itemLayout="horizontal" dataSource={[0]} renderItem={renderItem} />
            </MenuButton>
            <MenuList className='menu-lis-profile-sider' style={{ position: 'static', zIndex: 1000 }}>
                <div className='menu-list-profile-header'>
                    <Avatar size='large' className='list-item-meta-avatar list-item-meta-title'>{first_name && first_name.charAt(0)}{/*last_name && last_name.charAt(0)*/}</Avatar>
                    <h1 style={{ fontSize: 12, marginTop: 15, marginBottom: 0 }}>{position}</h1>
                    <h1 style={{ fontSize: 11 }}>{email}</h1>
                </div>
                <MenuDivider />
                <MenuItem /*href='#'*/ onClick={() => signOut()} icon={<LogoutOutlined />} command='⇧E'>
                    Salir
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default LabelProfile;