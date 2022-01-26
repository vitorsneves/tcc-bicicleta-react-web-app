import styles from '../TablesUtilities/tables.module.css';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridOverlay, ptBR } from '@mui/x-data-grid';
import { CadastroForm } from '../../../Components/Forms/CadastroForm';
import DeleteIcon from '@mui/icons-material/Delete';
import { GetPeople, DeletePerson, getParceiro } from '../../../API/Cadastro.js';
import { AditionalPersonInformation } from '../../../Components/AditionalPersonInformation';
import CircularProgress from '@mui/material/CircularProgress';
import { DeleteModal } from '../../../Components/DeleteModal';

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
            headerName: 'NOME / RAZÃO SOCIAL',
            width: 300
        },
        {
            field: 'logradouro',
            headerName: 'LOGRADOURO',
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
            headerName: 'BAIRRO',
            width: 190
        },
        {
            field: 'estado',
            headerName: 'UF',
            width: 80
        },
        {
            field: 'cidade',
            headerName: 'CIDADE',
            width: 120
        }
    ];

    return rows;
};

//---------------------------------------------> Loading

function CustomLoadingOverlay() {
    return (
        <GridOverlay
            style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                placeContent: 'center'
            }}
        >
            <CircularProgress />
        </GridOverlay>
    );
}

//---------------------------------------------//

export const CadastroTable = () => {
    const [people, setPeople] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        GetPeople().then((response) => {
            updateStateWithPeopleResponse(response);
        });

        return () => {};
    }, []);

    const updateStateWithPeopleResponse = (response) => {
        setPeople(
            response.data.map((person) => ({
                ...person,
                id: person.parceiroId
            }))
        );
    };

    const getPerson = (id) => {
        const rightPerson = people.filter((person) => person.id == id);
        return rightPerson[0];
    };

    const addPersonToState = async () => {
        const response = await GetPeople();

        updateStateWithPeopleResponse(response);
    };

    const handleOnDelete = () => {
        selectedRows.forEach((rowId) => DeletePerson(rowId));

        setPeople((prevState) => {
            return prevState.filter((row) => {
                return !selectedRows.some(
                    (deletedRowId) => deletedRowId === row.id
                );
            });
        });
    };

    const getMarkedToDeleteRows = () => {
        return selectedRows.map((id) => {
            const person = getPerson(id);
            if (person != null) {
                return person.nomE_RAZAO + ' (' + person.cpF_CNPJ + ')';
            }
        });
    };

    const theme = createTheme(ptBR);

    return (
        <div className={styles['table-container']}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    columns={getColumns(getPerson)}
                    rows={people}
                    checkboxSelection
                    components={{
                        NoRowsOverlay: CustomLoadingOverlay
                    }}
                    selectionModel={selectedRows}
                    onSelectionModelChange={(selection) => {
                        setSelectedRows(selection);
                    }}
                />
            </ThemeProvider>

            <div className={styles['table-options-menu']}>
                <CadastroForm
                    className={styles.buttons}
                    title="Adicionar novo cadastro."
                    buttonText="ADICIONAR"
                    addPersonToState={addPersonToState}
                />

                <DeleteModal
                    className={styles.buttons}
                    deleteFuncion={handleOnDelete}
                    getMarkedToDeleteRows={getMarkedToDeleteRows}
                    aditionalMessage={
                        'Ao apagar uma pessoa, todos os documentos associados a ela também serão deletados.'
                    }
                    selectedRowCount={selectedRows.length}
                >
                    <DeleteIcon />
                    <p>DELETAR</p>
                </DeleteModal>
            </div>
        </div>
    );
};
