import styles from '../TablesUtilities/tables.module.css';
import translation from '../TablesUtilities/TableTranslation';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, createRef } from 'react';
import { OptionsMenu } from './OptionsMenu';
import { getDocumentos } from '../../../API/Documentos';
import { PrintDocument } from '../../../Components/PrintDocument';

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

export const DocumentsTable = () => {
    // Posible states: paid, payable, all.
    const [selectedDocumentType, setSelectedDocumentType] = useState('tudo');
    const [documentos, setDocumentos] = useState([]);

    useEffect(() => {
        getDocumentos().then(({ data }) => {
            setDocumentos(data);
        });
    }, []);

    const handleToggleOnChange = (_, DocumentTypeValue) => {
        if (DocumentTypeValue !== null)
            setSelectedDocumentType(DocumentTypeValue);
    };

    const getDocumento = (id) => {
        const documento = documentos.filter(
            (documento) => documento.id === id
        )[0];
        console.log(documento);
        return documento;
    };

    return (
        <div className={styles['table-container']}>
            <DataGrid
                columns={getColumns(getDocumento)}
                rows={getRows(documentos, selectedDocumentType)}
                checkboxSelection
                localeText={translation}
            />
            <OptionsMenu
                selectedDocumentType={selectedDocumentType}
                handleToggleOnChange={handleToggleOnChange}
            />
        </div>
    );
};
