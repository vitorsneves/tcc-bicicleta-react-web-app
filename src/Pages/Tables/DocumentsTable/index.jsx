import styles from '../TablesUtilities/tables.module.css';
import translation from '../TablesUtilities/TableTranslation';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { DocumentForm } from '../../../Components/Forms/DocumentForm';
import DeleteIcon from '@mui/icons-material/Delete';

//---------------------------------------------> Toggle document type Button.

// Renders the button used to toggle between paid and payable documents.
// There's also a "show all" mode.
const renderToggleButton = (selectedDocumentType, setSelectedDocumentType) => {
    const handleToggleOnChange = (event) => {
        setSelectedDocumentType(event.value);
    };

    return (
        <ToggleButtonGroup
            exclusive
            aria-label="Tipo de documento"
            title="Selecione o tipo de documento."
            value={selectedDocumentType}
            onChange={handleToggleOnChange}
            className={styles['toggle-button']}
        >
            <ToggleButton
                value="all"
                aria-label="todos"
                title="todos"
            ></ToggleButton>
            <ToggleButton
                value="paid"
                aria-label="pagos"
                title="pagos"
            ></ToggleButton>
            <ToggleButton
                value="payable"
                aria-label="a pagar"
                title="a pagar"
            ></ToggleButton>
        </ToggleButtonGroup>
    );
};

export const DocumentsTable = () => {
    // Posible states: paid, payable, all.
    const [selectedDocumentType, setSelectedDocumentType] = useState('all');

    return (
        <div className={styles['table-container']}>
            <DataGrid
                columns={[]}
                rows={[]}
                checkboxSelection
                localeText={translation}
            />
            <div className={styles['table-options-menu']}>
                <DocumentForm
                    className={styles.buttons}
                    buttonText={'ADICIONAR'}
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
