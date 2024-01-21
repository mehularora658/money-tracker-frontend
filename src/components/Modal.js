// Modal.js

import React, { useState } from 'react';
import './../Modal.css'; // You can create a separate CSS file for styling

const Modal = ({ isOpen, onClose, children }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
    };

    return (
        <>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-button" onClick={closeModal}>
                            &times;
                        </button>
                        <div className="modal-content">{children}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
