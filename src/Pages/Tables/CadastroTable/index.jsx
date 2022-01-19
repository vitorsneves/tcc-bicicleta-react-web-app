import styles from '../tables.module.css';
import { useState, useEffect } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BusinessIcon from '@mui/icons-material/Business';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import { CadastroForm } from '../../../Components/CadastroForm';

import {
    GetAllThePeople,
    DeletePerson,
    UpdatePerson,
    PostPerson
} from '../../../API/Cadastro.js';

//---------------------------------------------> Toggle person Button.

// Renders the button used to toggle between pessoa física and jurídica.
// The table shows different information based in which one is selected.
const renderToggleButton = (selectedPerson, togglePersonType) => {
    return (
        <ToggleButtonGroup
            className={styles['.toggle-button']}
            value={selectedPerson}
            exclusive
            onChange={togglePersonType}
            aria-label="text alignment"
            className={styles['toggle-button']}
        >
            <ToggleButton
                value="fisica"
                aria-label="Física"
                title="Pessoa física"
            >
                <AccountBoxIcon />
            </ToggleButton>
            <ToggleButton
                value="juridica"
                aria-label="Jurídica"
                title="Pessoa jurídica"
            >
                <BusinessIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

//---------------------------------------------> Table columns.

// Information presented in pessoa física table.
const colunasPessoaFisica = [
    {
        field: 'nome',
        headerName: 'Nome',
        width: 280
    },
    {
        field: 'cpf',
        headerName: 'CPF',
        width: 150
    },
    {
        field: 'nascimento',
        headerName: 'Nascimento',
        width: 150
    },
    {
        field: 'estado',
        headerName: 'UF',
        width: 150
    },
    {
        field: 'cidade',
        headerName: 'Cidade',
        width: 150
    },
    {
        field: 'bairro',
        headerName: 'Bairro',
        width: 150
    },
    {
        field: 'celular',
        headerName: 'celular',
        width: 150
    },
    {
        field: 'email',
        headerName: 'email',
        width: 150
    }
];

//---------------------------------------------//

export const CadastroTable = () => {
    const [selectedPerson, setSelectedPerson] = useState('fisica');
    const [people, setPeople] = useState({});

    // Fetch the data from database.
    useEffect(() => {
        const allData = GetAllThePeople();

        const pessoasFisicas = allData.filter(
            (person) => person.tipo === 'Física'
        );

        const pessoasJuridicas = allData.filter(
            (person) => person.tipo === 'Jurídica'
        );

        setPeople({ pessoasFisicas, pessoasJuridicas });
    }, []);

    // Switches between pessoa física and pessoa jurídica.
    const togglePersonType = () => {
        if (selectedPerson === 'fisica') setSelectedPerson('juridica');

        if (selectedPerson === 'juridica') setSelectedPerson('fisica');
    };

    return (
        <div className={styles['table-container']}>
            <DataGrid
                columns={colunasPessoaFisica}
                checkboxSelection
                disableSelectionOnClick
            />
            <div className={styles['table-options-menu']}>
                {renderToggleButton(selectedPerson, togglePersonType)}
                <button className={styles.buttons}>
                    Informações adicionais
                </button>
                <CadastroForm
                    className={styles.buttons}
                    buttonText="cadastrar"
                />
                <button
                    className={styles.buttons}
                    title="Remover linha selecionada"
                >
                    remover
                </button>
            </div>
        </div>
    );
};
