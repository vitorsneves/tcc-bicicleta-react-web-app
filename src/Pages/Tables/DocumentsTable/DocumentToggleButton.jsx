import styles from '../TablesUtilities/tables.module.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

//---------------------------------------------> Toggle document type Button.

// Renders the button used to toggle between paid and payable documents.
// There's also a "show all" mode.
export const DocumentToggleButton = ({
    selectedDocumentType,
    handleToggleOnChange
}) => {
    return (
        <ToggleButtonGroup
            exclusive
            aria-label="Tipo de documento"
            value={selectedDocumentType}
            onChange={handleToggleOnChange}
            className={styles['toggle-button']}
        >
            <ToggleButton value="tudo" aria-label="tudo">
                <p>tudo</p>
            </ToggleButton>
            <ToggleButton value="Pagamento" aria-label="pagamento">
                <p>pagamento</p>
            </ToggleButton>
            <ToggleButton value="Recebimento" aria-label="recebimento">
                <p>recebimento</p>
            </ToggleButton>
        </ToggleButtonGroup>
    );
};
