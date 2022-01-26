import { useState } from 'react';
import styles from './styles.module.css';
import formStyles from '../Forms/FormComponents/form.module.css';
import submitStyles from '../Forms/FormComponents/SubmitSection/styles.module.css';
import { Close } from '@styled-icons/zondicons/Close';
import { Modal } from '@mui/material';

const renderContent = (getMarkedToDeleteRows, aditionalMessage) => {
    const rows = getMarkedToDeleteRows().map((row) => <p>{row}</p>);

    const mainMessage =
        rows.length === 1 ? (
            <div>
                <div className={styles.messageContainer}>
                    <p>Tem certeza de que quer deletar esse cadastro? {rows}</p>
                </div>
                <p className={styles.messageContainer}>{aditionalMessage}</p>
            </div>
        ) : (
            <div>
                <div className={styles.messageContainer}>
                    <p>
                        Tem certeza de que quer deletar essas {rows.length}{' '}
                        linhas?
                    </p>
                    {rows}
                </div>
                <p className={styles.messageContainer}>{aditionalMessage}</p>
            </div>
        );

    return mainMessage;
};

export const DeleteModal = ({
    className,
    deleteFuncion,
    getMarkedToDeleteRows,
    children,
    aditionalMessage,
    selectedRowCount
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen((prevState) => {
            return !prevState;
        });
    };

    return (
        <>
            <button
                className={className}
                onClick={() => {
                    if (selectedRowCount >= 1) toggleModal();
                }}
                title="Apagar linhas selecionadas."
            >
                {children}
            </button>
            <Modal
                className={formStyles.modal}
                open={isOpen}
                onClose={toggleModal}
            >
                <div className={formStyles.form}>
                    {isOpen &&
                        renderContent(getMarkedToDeleteRows, aditionalMessage)}
                    <div className={submitStyles['submit-section']}>
                        <button
                            className={submitStyles['cancel-button']}
                            onClick={toggleModal}
                        >
                            <Close size={36} />
                            <p>CANCELAR</p>
                        </button>
                        <button
                            className={submitStyles['confirm-button']}
                            aditionalMessage
                            onClick={() => {
                                toggleModal();
                                deleteFuncion();
                            }}
                        >
                            <p>CONFIRMAR</p>
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
