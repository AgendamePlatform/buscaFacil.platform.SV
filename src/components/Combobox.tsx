import React from 'react';

interface ComboboxProps {
    options: string[];
    label?: string;
    onChange: (selected: string) => void;
}

const Combobox: React.FC<ComboboxProps> = ({ options, label, onChange }) => {
    return (
        <div className="relative inline-block w-full">
            {label && (
                <label htmlFor="combobox" className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <select
                id="combobox"
                onChange={(e) => onChange(e.target.value)}
                className="block w-full px-4 py-2 bg-white text-gray-700 rounded-md  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition ease-in-out duration-150 cursor-pointer"
            >
                {options.map((option, index) => (
                    <option key={index} value={option} className="bg-white text-gray-700  hover:bg-azulito hover:">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Combobox;
