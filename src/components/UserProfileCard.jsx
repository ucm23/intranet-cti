import React from 'react';
import { Button } from 'antd';
import { HiArrowUpRight, HiDocumentText } from "react-icons/hi2";

const UserProfileCard = ({ color, name, puesto, urlPhoto, onClickCV, onClickProfile, min, className = '' }) => {
    const base = `p-2 cursor-default org-profile-card${min ? '' : ' org-profile-card--compact'}`;
    return (
        <div className={className ? `${base} ${className}` : base} onClick={onClickProfile} style={{ borderRadius: 4, borderLeft: `3px solid ${color}`, border: `0.8px solid ${color}`, backgroundColor: `${color}15`, }} /*style={{ maxWidth: 180, wordWrap: 'break-word', overflowWrap: 'break-word', flexWrap: 'wrap', whiteSpace: 'nowrap' }}*/>
            <h3 className="text-sm font-semibold mb-0.5 text-left drop-shadow-md org-profile-card__name" style={{ color }}>
                {name}
            </h3>
            {min && <>
                <p className="text-xxs text-gray-700 text-left org-profile-card__puesto">{puesto}</p>
                <div className='flex items-center justify-center'>
                    <img src={urlPhoto} alt="image-img-profile" className="image-img-profile" />
                </div>
                <div className='flex flex-col gap-1 pt-3'>
                    <Button type='link'>
                        Ver Curriculum
                        <HiArrowUpRight className='text-[25px] border border-gray-800 rounded-full p-1' />
                    </Button>
                </div>
            </>}
        </div>
    );
};

export default UserProfileCard;
