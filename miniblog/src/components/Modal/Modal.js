import React, { useEffect, useRef } from 'react';

import styles from "./Modal.module.css"

export default function Modal ({ isOpen, onClose, children }) {

  const modalRef = useRef(null);

  useEffect(() => {
    function handleEscKey(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);


  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};
