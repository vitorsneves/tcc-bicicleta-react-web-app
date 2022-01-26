import { DocumentToggleButton } from './DocumentToggleButton';
import styles from '../TablesUtilities/tables.module.css';
import { DocumentForm } from '../../../Components/Forms/DocumentForm';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteModal } from '../../../Components/DeleteModal';

export const OptionsMenu = ({
    selectedDocumentType,
    handleToggleOnChange,
    updateDocuments,
    getMarkedToDeleteRows,
    selectedRowCount,
    deleteFuncion
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

            <DeleteModal
                className={styles.buttons}
                getMarkedToDeleteRows={getMarkedToDeleteRows}
                selectedRowCount={selectedRowCount}
                aditionalMessage={''}
                deleteFuncion={deleteFuncion}
            >
                <DeleteIcon />
                <p>DELETAR</p>
            </DeleteModal>
        </div>
    );
};
