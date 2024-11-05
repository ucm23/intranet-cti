import React from 'react';
import '../styles/ValoresCorporativos.css'

const ValoresCorporativos = () => {
    return (
        <div className="valores-container">
            <h1 className="titulo-principal">Nuestra Filosofía</h1>
            <div className="valores-grid">
                <div className="valor-item">
                    <h2 className="subrayado">Misión</h2>
                    <p className="justificado">
                       Impulsar y reforzar la innovación y desarrollo tecnológico, para el sector
                        privado y de servicios, (a través de nuestros valores), con la finalidad de mejorar continuamente los procesos
                        mediante herramientas tecnológicas y personal especializado (calificado, competente) para contribuir al crecimiento
                        económico de nuestros clientes, colaboradores y socios.
                    </p>
                </div>
                <div className="valor-item">
                    <h2 className="subrayado">Visión</h2>
                    <p className="justificado">
                        Ser el aliado estratégico en tecnología que nos permita posicionarnos como el principal referente
                        en soluciones de sistemas inteligentes de transporte, tecnologías de la información y ciberseguridad en
                        México, Estados Unidos, Canadá y Sur de América.
                    </p>
                </div>
                <div className="valor-item">
                    <h2 className="subrayado">Política de Calidad</h2>
                    <p className="justificado">
                        Somos un equipo de alianzas estratégicas y fortalecemos nuestras relaciones de confianza con nuestros clientes,
                        socios y mayoristas. Brindamos calidad y valor agregado en cada uno de nuestros servicios y contribuimos en la innovación tecnológica
                        de nuestro país, a través de nuestros propios desarrollos y consultores calificados.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ValoresCorporativos;
