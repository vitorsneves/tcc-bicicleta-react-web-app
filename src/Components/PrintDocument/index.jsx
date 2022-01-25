import { Modal, TextField } from '@mui/material';
import { useState, createRef } from 'react';
import { Printer } from '@styled-icons/remix-line/Printer';
import pdfStyles from './pdfStyles.module.css';
import { renderPdf } from './renderPdf';

export const PrintDocument = ({ getDocumento, id }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen((prevState) => !prevState);
    };

    const onClick = () => {
        window.print();
        toggleModal();
    };

    return (
        <>
            <button className={pdfStyles.printerButton} onClick={toggleModal}>
                <Printer size={36} />
            </button>
            <Modal
                className={pdfStyles.modal}
                open={isOpen}
                onClose={toggleModal}
            >
                <div className={pdfStyles.pdfContainer}>
                    <button onClick={onClick}>GERAR PDF</button>
                    {isOpen && renderPdf(getDocumento, id)}
                </div>
            </Modal>
        </>
    );
};
