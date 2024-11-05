import React from 'react';

const JobProfile = ({ puesto, educacion, skills, capacitacion }) => {
  return (
    <div className="profile-card">
      <h2>{puesto}</h2>
      <p>{educacion}</p>
      <h4>Habilidades requeridas:</h4>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <p><strong>Experiencia requerida:</strong> {capacitacion}</p>
    </div>
  );
};

export default JobProfile;
