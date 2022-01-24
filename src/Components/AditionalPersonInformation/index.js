import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import styles from './styles.module.css';
import Box from '@mui/material/Box';
import { InfoSquare } from '@styled-icons/bootstrap/InfoSquare';
import { getPessoa } from '../../API/Cadastro'
import { Close } from '@styled-icons/zondicons/Close';


const renderInformation = (data) => {
    let information = [];

    for (const key in data) {
        information.push(
            <div key={key} className={styles.keyValueContainer}>
                <h2>{key}</h2>
                <p>{data[key]}</p>
            </div>
        );
    }

    return information;
}

export const AditionalPersonInformation = ({id, tipo}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [information, setInformation] = useState([]);    
    
    const openOrClose = (event) => {
        event.stopPropagation();
        setIsModalOpen((prevState) => {
            return !prevState;
        });
    }

    useEffect(() => {
    if(isModalOpen) {
        getPessoa(id, tipo).then(({ data }) => {setInformation(renderInformation(data))})
    }}, [isModalOpen])


    return(
        <>
            <button className={styles.infoButton} onClick={openOrClose}>
                <InfoSquare size={28} />
            </button>
            <Modal
                onClose={openOrClose}
                open={isModalOpen}
                className={styles.modal}
            >
                <Box className={styles.modalPane}>
                    <h1>INFORMAÇÕES ADICIONAIS</h1>
                    <div className={styles.informationContainer}>
                        {information}
                    </div>        
                    <button className={styles.cancelButton} onClick={openOrClose}>
                    <Close size={36} />
                    <p>voltar</p>   
                </button>            
                </Box>
            </Modal>
        </>
    );
}