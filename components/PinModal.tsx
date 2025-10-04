
import React from "react";


const PinModal = () => {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full p-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black"
                >
                    ✖
                </button>
                <img src={pin.image} alt={pin.title} className="w-full rounded" />
                <div className="mt-2">
                    <h2 className="text-xl font-semibold">{pin.title}</h2>
                    <p className="text-sm text-gray-600">by {pin.author}</p>
                </div>
            </div>
        </div>
    )
}

export default PinModal;
