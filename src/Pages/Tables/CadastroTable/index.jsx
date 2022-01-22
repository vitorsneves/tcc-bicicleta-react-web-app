import styles from '../TablesUtilities/tables.module.css';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CadastroForm } from '../../../Components/CadastroForm';
import DeleteIcon from '@mui/icons-material/Delete';
import translation from '../TablesUtilities/TableTranslation';
import useWindowSize from '../TablesUtilities/WindowSizeHook';
import { GetPeople, DeletePerson } from '../../../API/Cadastro.js';

//---------------------------------------------> Table columns.

const getColumns = (width) => {
    const rows = [
        {
            field: 'id',
            headerName: 'id',
            hide: true
        },
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

const handleOnDelete = (selectedRows, setPeople, people) => {
    selectedRows.forEach((rowId) => DeletePerson(rowId));

    setPeople((prevState) => {
        return prevState.filter((row) => {
            return !selectedRows.some(
                (deletedRowId) => deletedRowId === row.id
            );
        });
    });
};

export const CadastroTable = () => {
    const [width] = useWindowSize();
    const [people, setPeople] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
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
                selectionModel={selectedRows}
                onSelectionModelChange={(selection) => {
                    setSelectedRows(selection);
                }}
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
                    onClick={() => {
                        handleOnDelete(selectedRows, setPeople);
                    }}
                >
                    <DeleteIcon />
                    <p>DELETAR</p>
                </button>
            </div>
        </div>
    );
};
