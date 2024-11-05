import * as React from 'react';
import Navbar from '../../componentes/Navbar';
import logo from '../../img/logo-white.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useBreakpointValue } from '@chakra-ui/react'



const Encabezadologo = () => {
    const mobile = useBreakpointValue({ base: true, md: false });


    return (
        <Navbar mobile={mobile}>
            <div style={{ height: '100vh', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#001529', overflow: 'hidden', }}>
                    <img src={logo} alt="Logo" style={{ width: '130px', height: 'auto', 'logo-small': 'logo', verticalAlign: 'middle' }} />
                </div>
            </div>

        </Navbar>
    )
}

export default Encabezadologo;