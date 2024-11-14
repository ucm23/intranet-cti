import { Tooltip } from '@chakra-ui/react';
import { Avatar } from 'antd';
import React from 'react';

const Chip = ({ charAt, label, color, onDelete, onClick, disabled = false }) => {
	return (
		/*<div onClick={onClick} className={`flex items-center px-1 py-1 bg-[#f2f5f8] border border-[#e7eaed] text-black rounded-full text-sm font-medium mr-1 mb-1 shadow-sm ${disabled && 'opacity-30'} ${(!disabled || charAt) && 'hover:bg-blue-200'}`}>
			<span className="flex items-center bg-[#e7eaed] justify-center w-5 h-5 text-black font-semibold rounded-full">{charAt || label.charAt(0)}</span>
			<span className="text-xs mr-1 ml-2">{label}</span>}
			{(!disabled) && <button onClick={onDelete} className="mr-1.5 transition-colors duration-200 focus:outline-none">⊗</button>}
		</div>*/
		<Tooltip title={`${label}`}>
			<Avatar style={{ background: color }}>{label.charAt(0)}{label.split(" ")[1][0]}</Avatar>
		</Tooltip>
	);
};

export default Chip;