import React, { useState } from 'react';
import api from '../../config/axios.js'

export const Select = ({roles , onChangeFxn}) => {
    const [role , setRole] = useState("");
    const [data , setData] = useState([]);
    const [selectedCafeId, setSelectedCafeId] = useState(
        localStorage.getItem('selectedCafeId') || null
        );
    const handleCafeChange=(e)=>{
        const selectedId = e.target.value;
        setRole(selectedId);
        setSelectedCafeId(selectedId);
        localStorage.setItem('selectedCafeId', selectedId);
        onChangeFxn(selectedId);

    };
  return (
    <div className='flex flex-row items-center '>
        <select
            value={selectedCafeId || role}
            onChange={handleCafeChange}
            className="
            
            bg-white
            border-2 border-[#fe6a36]
            rounded-lg
            text-gray-700
            lg:text-xl
            text-xl
            cursor-pointer
            outline-none
            appearance-none
            focus:border-orange-600
            focus:ring-2 focus:ring-orange-300
            transition-all duration-200
            
            "
        >
            <option value="" disabled>Select </option>
            {roles.map(role => (
            <option key={role.id} value={role._id}>
                {role.name}
            </option>
            ))}
            {/* <option value="" >Student Center</option>
            <option  >Safal</option>
            <option  >NesCafe</option>
            <option  >Mother Dairy</option> */}
        </select>

    {/* custom dropdown arrow */}
        {/* <div className="absolute left-75 text-orange-500">
            ▼
        </div> */}
    </div>
  )
}
