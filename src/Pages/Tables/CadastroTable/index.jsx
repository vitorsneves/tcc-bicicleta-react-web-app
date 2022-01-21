import styles from '../TablesUtilities/tables.module.css';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CadastroForm } from '../../../Components/CadastroForm';
import DeleteIcon from '@mui/icons-material/Delete';
import translation from '../TablesUtilities/TableTranslation';
import useWindowSize from '../TablesUtilities/WindowSizeHook';
import { GetPeople, PostPerson, DeletePerson } from '../../../API/Cadastro.js';

//---------------------------------------------> Table columns.

const getColumns = (width) => {
    const rows = [
        {
            field: 'cpf_cnpj',
            headerName: 'CPF / CNPJ',
            width: 190
        },
        {
            field: 'nome_razao',
            headerName: 'Nome / Razão Social',
            width: 300
        },
        {
            field: 'logradouro',
            headerName: 'Logradouro',
            width: 250
        },
        {
            field: 'numero',
            headerName: 'Nº',
            width: 7
        },
        {
            field: 'bairro',
            headerName: 'Bairro',
            width: 150
        },
        {
            field: 'estado',
            headerName: 'UF',
            width: 10
        },
        {
            field: 'cidade',
            headerName: 'Cidade',
            width: 160
        }
    ];

    if (width < 1300) {
        rows[2] = {};
    }

    return rows;
};

//---------------------------------------------//

export const CadastroTable = () => {
    const [width, height] = useWindowSize();
    const [people, setPeople] = useState([]);

    useState(() => {
        GetPeople().then((response) => {
            setPeople(response);
        });

        return () => {};
    }, []);

    return (
        <div className={styles['table-container']}>
            <DataGrid
                columns={getColumns(width)}
                rows={people}
                checkboxSelection
                localeText={translation}
            />
            <div className={styles['table-options-menu']}>
                <CadastroForm
                    className={styles.buttons}
                    title="Adicionar novo cadastro."
                    buttonText="ADICIONAR"
                />
                <button
                    className={styles.buttons}
                    title="Apagar linhas selecionadas."
                >
                    <DeleteIcon />
                    <p>DELETAR</p>
                </button>
            </div>
        </div>
    );
};
