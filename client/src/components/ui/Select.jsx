import React from 'react';

export const Select = ({ roles, value, onChangeFxn }) => {
    const handleCafeChange = (e) => {
        const selectedId = e.target.value;
        onChangeFxn(selectedId);
    };

    return (
        <div className='flex flex-row items-center'>
            <select
                value={value || ""}
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
                <option value="" key="key" disabled>Select</option>
                {(roles || []).map(role => (
                    <option key={role._id} value={role._id}>
                        {role.name}
                    </option>
                ))}
            </select>
        </div>
    );
};