import { DocumentToggleButton } from './DocumentToggleButton';
import styles from '../TablesUtilities/tables.module.css';
import { DocumentForm } from '../../../Components/Forms/DocumentForm';
import DeleteIcon from '@mui/icons-material/Delete';

export const OptionsMenu = ({
    selectedDocumentType,
    handleToggleOnChange,
    updateDocuments
}) => {
    return (
        <div className={styles['table-options-menu']}>
            <DocumentToggleButton
                selectedDocumentType={selectedDocumentType}
                handleToggleOnChange={handleToggleOnChange}
            />

            <DocumentForm
                className={styles.buttons}
                buttonText={'ADICIONAR'}
                updateDocuments={updateDocuments}
            />

            <button
                className={styles.buttons}
                title="Apagar linhas selecionadas."
            >
                <DeleteIcon />
                <p>DELETAR</p>
            </button>
        </div>
    );
};
