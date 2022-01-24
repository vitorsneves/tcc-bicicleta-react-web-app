import styles from '../TablesUtilities/tables.module.css';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CadastroForm } from '../../../Components/Forms/CadastroForm';
import DeleteIcon from '@mui/icons-material/Delete';
import translation from '../TablesUtilities/TableTranslation';
import { GetPeople, DeletePerson } from '../../../API/Cadastro.js';
import { AditionalPersonInformation } from '../../../Components/AditionalPersonInformation';

//---------------------------------------------> Table columns.

const getColumns = (getPerson) => {
    const rows = [
        {
            field: 'id',
            headerName: 'INFO',
            sortable: false,
            disableColumnMenu: true,
            headerAlign: 'center',
            width: 80,
            renderCell: (params) => {
                return (
                    <AditionalPersonInformation
                        cpf_cnpj={getPerson(params.id).cpF_CNPJ}
                    />
                );
            }
        },
        {
            field: 'cpF_CNPJ',
            headerName: 'CPF / CNPJ',
            width: 190
        },
        {
            field: 'nomE_RAZAO',
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
            width: 80,
            type: 'number'
        },
        {
            field: 'bairro',
            headerName: 'Bairro',
            width: 190
        },
        {
            field: 'estado',
            headerName: 'UF',
            width: 80
        },
        {
            field: 'cidade',
            headerName: 'Cidade',
            width: 160
        }
    ];

    return rows;
};

//---------------------------------------------//

const handleOnDelete = (selectedRows, setPeople, people) => {
    selectedRows.forEach((rowId) =>
        DeletePerson(
            rowId,
            people.filter((person) => person.id === rowId)
        )
    );

    setPeople((prevState) => {
        return prevState.filter((row) => {
            return !selectedRows.some(
                (deletedRowId) => deletedRowId === row.id
            );
        });
    });
};

export const CadastroTable = () => {
    const [people, setPeople] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        GetPeople().then((response) => {
            setPeople(
                response.data.map((person) => ({
                    ...person,
                    id: person.parceiroId
                }))
            );
        });

        return () => {};
    }, []);

    const getPerson = (id) => {
        const rightPerson = people.filter((person) => person.id == id);
        return rightPerson[0];
    };

    return (
        <div className={styles['table-container']}>
            <DataGrid
                columns={getColumns(getPerson)}
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
                        handleOnDelete(selectedRows, setPeople, people);
                    }}
                >
                    <DeleteIcon />
                    <p>DELETAR</p>
                </button>
            </div>
        </div>
    );
};
