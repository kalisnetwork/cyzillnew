import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './modal.css';

const ModalContext = React.createContext();

export function Modal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal-background" onClick={onClose} />
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        modalNode
    );
}

export function ModalProvider({ children }) {
    const modalRef = React.useRef();

    return (
        <>
            <ModalContext.Provider value={modalRef.current}>{children}</ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}
