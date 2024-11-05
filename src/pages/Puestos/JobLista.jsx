// JobList.js
import React from "react";
import JobProfile from "./JobProfile";

const jobData = [
  {
    id: 1,
    puesto: "Director General",
    educacion: "Licenciatura en Ingeniería en Sistemas, Administración de Empresas, Informática o afines. Maestría en Administración de Negocios (MBA) o especialización en tecnología (deseable).",
    experiencia: "Mínimo 10 años de experiencia en roles directivos en empresas de tecnología, consultoría en sistemas o desarrollo de software. Experiencia en la creación y gestión de marcas de software propias, así como en proyectos de desarrollo y consultoría de soluciones tecnológicas ",
    capacitacion: "Proactividad y capacidad de Innovación y de adaptación a los cambios tecnológicosLa capacitación puede ajustarse según las tecnologías específicas que utilice Grupo CTI y las necesidades cambiantes de sus proyectos."
    
  },
  {
    id: 2,
    puesto: "Jefe Jurídico",
    educacion :"Licenciatura en Derecho. Cédula profesional para el ejercicio de la abogacía en México. Maestría en Derecho Corporativo, Derecho Empresarial o áreas relacionadas (deseable).",
    experiencia: "Mínimo 8-10 años de experiencia en el área jurídica, con al menos 5 años en posiciones de liderazgo dentro de departamentos jurídicos de empresas tecnológicas, consultoría o similares.Conocimiento en derecho corporativo, comercial, propiedad intelectual, protección de datos y cumplimiento normativo.Experiencia en gestión de litigios y relaciones con despachos externos",
    capacitacion: "Proactividad y capacidad  para el conocimiento . La capacitación puede ajustarse de acuerdo a los intereses legales de la empresa en sus operaciones nacionales e internacionales, gestionando contratos, litigios, temas de propiedad intelectual y cumplimiento normativo."
      
  }
];

const JobLista = () => {
  return (
    <div>
      {jobData.map(job => (
        <JobProfile
          key={job.id}
          puesto={job.puesto}
          educacion={job.educacion}
          experiencia={job.experiencia}
          capacitacion={job.capacitacion}
        />
      ))}
    </div>
  );
};

export default JobLista;
