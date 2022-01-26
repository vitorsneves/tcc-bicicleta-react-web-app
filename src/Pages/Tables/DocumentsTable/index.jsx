import styles from '../TablesUtilities/tables.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridOverlay, ptBR } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { OptionsMenu } from './OptionsMenu';
import { getDocumentos, DeleteDocument } from '../../../API/Documentos';
import { PrintDocument } from '../../../Components/PrintDocument';
import CircularProgress from '@mui/material/CircularProgress';

const getColumns = (getDocumento) => {
    const rows = [
        {
            field: 'id',
            headerName: 'Imprimir',
            sortable: false,
            disableColumnMenu: true,
            width: 110,
            headerAlign: 'center',
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                };

                return (
                    <div
                        className={styles.rowButtonContainer}
                        onClick={onClick}
                    >
                        <PrintDocument
                            getDocumento={getDocumento}
                            id={params.id}
                        />
                    </div>
                );
            }
        },
        {
            field: 'movimentacao',
            headerName: 'Tipo de Movimentação',
            width: 200
        },
        {
            field: 'nomE_RAZAO',
            headerName: 'Parceiro Comercial',
            width: 200
        },
        {
            field: 'cpF_CNPJ',
            headerName: 'CPF ou CNPJ do Parceiro',
            width: 205
        },
        {
            field: 'emP_Razao',
            headerName: 'Empresa',
            width: 90
        },
        {
            field: 'valor',
            headerName: 'Valor (R$)',
            type: 'number',
            width: 110
        },
        {
            field: 'observacao',
            headerName: 'Observação',
            width: 400
        }
    ];

    return rows;
};

// Used to filter documents (pago, a pagar, todos)
const getRows = (documentos, selectedDocumentType) => {
    if (selectedDocumentType === 'tudo') return documentos;

    return documentos.filter((documento) => {
        return documento.movimentacao === selectedDocumentType;
    });
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

export const DocumentsTable = () => {
    // Posible states: paid, payable, all.
    const [selectedDocumentType, setSelectedDocumentType] = useState('tudo');
    const [documentos, setDocumentos] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        getDocumentos().then(({ data }) => {
            setDocumentos(data);
        });
    }, []);

    const updateDocuments = async () => {
        const updatedDocuments = await getDocumentos();
        setDocumentos(updatedDocuments.data);
    };

    const handleToggleOnChange = (_, DocumentTypeValue) => {
        if (DocumentTypeValue !== null)
            setSelectedDocumentType(DocumentTypeValue);
    };

    const getDocumento = (id) => {
        const documento = documentos.filter(
            (documento) => documento.id === id
        )[0];
        return documento;
    };

    const getMarkedToDeleteRows = () => {
        return selectedRows.map((id) => {
            const document = getDocumento(id);
            if (document != null) {
                return document.nomE_RAZAO + ' ' + document.observacao;
            }
        });
    };

    const handleOnDelete = () => {
        selectedRows.forEach((rowId) => DeleteDocument(rowId));

        setDocumentos((prevState) => {
            return prevState.filter((row) => {
                return !selectedRows.some(
                    (deletedRowId) => deletedRowId === row.id
                );
            });
        });
    };

    const theme = createTheme(ptBR);

    return (
        <div className={styles['table-container']}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    columns={getColumns(getDocumento)}
                    rows={getRows(documentos, selectedDocumentType)}
                    checkboxSelection
                    selectionModel={selectedRows}
                    onSelectionModelChange={(selection) => {
                        setSelectedRows(selection);
                    }}
                    components={{
                        NoRowsOverlay: CustomLoadingOverlay
                    }}
                    theme={theme}
                />
            </ThemeProvider>
            <OptionsMenu
                selectedDocumentType={selectedDocumentType}
                handleToggleOnChange={handleToggleOnChange}
                updateDocuments={updateDocuments}
                getMarkedToDeleteRows={getMarkedToDeleteRows}
                selectedRowCount={selectedRows.length}
                deleteFuncion={handleOnDelete}
            />
        </div>
    );
};
