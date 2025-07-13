// components/SizeModal.jsx
import React from "react";
import { LiaTimesSolid } from "react-icons/lia";

const SizeModal = ({ isOpen, sizes, onClose, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-80 sm:w-full">
                <button
                    onClick={onClose}
                    className="text-sm p-0 text-black hover:text-red-500 float-right"
                >
                    <LiaTimesSolid size={20} />
                </button>
                <h3 className="text-lg font-medium mb-6 text-red-500 uppercase">Select Size</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => onSelect(size)}
                            className="px-4 py-2 border rounded-sm text-sm hover:bg-red-500 hover:text-white transition"
                        >
                            {size}
                        </button>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    className="text-sm text-red-500 hover:text-red-600 px-0 py-2 float-right"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default SizeModal;
