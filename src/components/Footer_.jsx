import {
    Stack,
    useBreakpointValue,
    Button,
} from '@chakra-ui/react';
import { Fade } from 'react-awesome-reveal';
import { useState } from 'react'
import { useEffect } from 'react'

export default function Footer_({ modalShow }) {

    const mobile = useBreakpointValue({ base: true, md: false });
    const [direction, setDirection] = useState('row');

    useEffect(() => {
        const newDirection = mobile ? 'column' : 'row';
        setDirection(newDirection);
    }, [mobile]);

    return (
        <div className='bg-footer' style={{ filter: modalShow && 'blur(1px)' }}>
            <section className="_main footer-container container p-footer">
                <Fade damping={0.2} delay={0.2}>
                    <Stack flexDirection={direction} style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }} justifyContent={'space-between'}>
                        <Stack alignItems={mobile ? 'center' : 'initial'}>
                            <img
                                src="/img/logo-intranet-decc-white.png"
                                alt="logo Grupo Ticonsa"
                                style={{ width: 255 }}
                            />
                            <h3 className="footer-title" style={{ fontWeight: 'normal', marginBottom: 20, textAlign: mobile ? 'center' : 'left' }}>©Todos los derechos reservados. Grupo CTI Tech-IN POS 2024.</h3>
                        </Stack>
                    </Stack>
                    <div style={{ background: 'white', height: 1, width: '100%', }} />
                </Fade>
            </section>
        </div>
    )
}