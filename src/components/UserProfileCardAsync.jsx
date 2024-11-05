import React, { useEffect } from 'react';
import { Button } from 'antd';
import { HiArrowUpRight, HiDocumentText } from "react-icons/hi2";

const UserProfileCardAsync = ({ id }) => {
    useEffect(() => {

    }, [])
    return (
        <div className="p-2" style={{ borderRadius: 4, borderLeft: `3px solid ${color}`, border: `0.8px solid ${color}`, backgroundColor: `${color}15`, }} /*style={{ maxWidth: 180, wordWrap: 'break-word', overflowWrap: 'break-word', flexWrap: 'wrap', whiteSpace: 'nowrap' }}*/>
            <h3 className="text-sm pt-3 font-semibold mb-0.5 text-left drop-shadow-md" style={{ color }}>
                {name}
            </h3>
            <p className="text-xxs text-gray-700 text-left" style={{ maxWidth: 150 }}>{puesto}</p>
            <div className='flex items-center justify-center'>
                <img src={urlPhoto} alt="image-img-profile" className="image-img-profile" />
            </div>
            <div className='flex flex-col gap-1 pt-3'>
                <Button
                    type='link'
                    className="flex justify-between w-full"
                    onClick={onClickProfile}
                >Ver Curriculum <HiArrowUpRight className='text-[25px] border border-gray-400 rounded-full p-1' />
                </Button>
                <Button
                    type='primary'
                    className="flex justify-between items-center w-full"
                    onClick={onClickCV}
                > Ver puesto <HiDocumentText className='text-[25px] p-1' />
                </Button>
            </div>
        </div>
    );
};

export default UserProfileCard;
