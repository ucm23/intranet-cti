import React from 'react';
import Navbar from '../../componentes/Navbar';
import { useBreakpointValue } from '@chakra-ui/react';
import logo from '../../img/logo-white.png'
import backgroundImage from '../../img/background.jpg';
import { useNavigate } from 'react-router-dom';
import Footer from '../../componentes/Footer';


const Home = () => {

    const mobile = useBreakpointValue({ base: true, md: false });
    const navigate = useNavigate();


    const goToHome = () => {
        navigate('/');
    };


    return (
        <div style={{ minheight: '100vh', flexdirection: 'column' }}>
            <Navbar backgroundColor="#001529" />
            <div>

            </div>
        </div>
    )
}
export default Home;