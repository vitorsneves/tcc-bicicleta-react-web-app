import { Modal, TextField } from '@mui/material';
import { useState, createRef } from 'react';
import { Printer } from '@styled-icons/remix-line/Printer';
import { renderPdf } from './renderPdf';
import { Close } from '@styled-icons/zondicons/Close';
import pdfStyles from './pdfStyles.module.css';
import styles from '../Forms/FormComponents/SubmitSection/styles.module.css';

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
                    {isOpen && renderPdf(getDocumento, id)}
                    <div className={styles['submit-section']}>
                        <button
                            className={styles['cancel-button']}
                            onClick={toggleModal}
                        >
                            <Close size={36} />
                            <p>voltar</p>
                        </button>
                        <button
                            className={pdfStyles.gerarPdf}
                            onClick={onClick}
                        >
                            GERAR PDF
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
