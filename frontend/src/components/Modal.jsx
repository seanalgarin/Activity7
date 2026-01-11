import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, onConfirm, title, message, type = 'alert' }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title || 'Message'}</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          {type === 'confirm' ? (
            <>
              <button className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={() => {
                  if (onConfirm && typeof onConfirm === 'function') {
                    onConfirm();
                  }
                }}
              >
                OK
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={onClose}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
