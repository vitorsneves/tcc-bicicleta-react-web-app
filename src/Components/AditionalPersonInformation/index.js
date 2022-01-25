import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import styles from './styles.module.css';
import Box from '@mui/material/Box';
import { InfoSquare } from '@styled-icons/bootstrap/InfoSquare';
import { getParceiro } from '../../API/Cadastro'
import { Close } from '@styled-icons/zondicons/Close';

const getDataForScreen = (person) => {
    // This object contains the information that will be
    // rendered on screen.
    let data = {};
    
    if(person.tipo === "PESSOA FISICA") {
        data.Nome = person.nomE_RAZAO;
        data.CPF = person.cpF_CNPJ;
    }

    if(person.tipo === "PESSOA JURIDICA") {
        data['Razão social'] = person.nomE_RAZAO;
        data.CNPJ = person.cpF_CNPJ;
    }

    // Adress
    data.CEP = person.cep;
    data.Bairro = person.bairro;
    data.Logradouro = person.logradouro;
    data.Complemento = person.complemento;
    data['Número'] = person.numero;
    data.Estado = person.estado;
    data.Cidade = person.cidade;

    // Contact
    data.email = person.email;
    data["Telefone celular"] = person.telCelular;
    data["Telefone fixo"] = person.telFixo;

    return data;
}

const renderInformation = (person) => {
    let informationToRender = [];
    const dataForScreen = getDataForScreen(person)

    for (const key in dataForScreen) {
        informationToRender.push(
            <div key={key} className={styles.keyValueContainer}>
                <h2>{key}</h2>
                <p>{dataForScreen[key]}</p>
            </div>
        );
    }

    return informationToRender;
}

export const AditionalPersonInformation = ({ cpf_cnpj }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [informationToRender, setInformationToRender] = useState([]);    
    
    const openOrClose = (event) => {
        event.stopPropagation();
        setIsModalOpen((prevState) => {
            return !prevState;
        });
    }

    useEffect(() => {
    if(isModalOpen) {
        getParceiro(cpf_cnpj).then((person) => {setInformationToRender(renderInformation(person))})
    }}, [isModalOpen])


    return(
        <> 
            <div className={styles.buttonContainer}>
                <button className={styles.infoButton} onClick={openOrClose}>
                    <InfoSquare size={28} />
                </button>
            </div>
            <Modal
                onClose={openOrClose}
                open={isModalOpen}
                className={styles.modal}
            >
                <Box className={styles.modalPane}>
                    <h1>INFORMAÇÕES ADICIONAIS</h1>
                    <div className={styles.informationContainer}>
                        {informationToRender}
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