import { Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { ParceiroAutocomplete } from './ParceiroAutocomplete';
import { SubmitSection } from '../FormComponents/SubmitSection';
import { Movimentacao } from './Movimentacao';
import formStyles from '../FormComponents/form.module.css';
import documentFormStyles from './document-form.module.css';
import InputAdornment from '@mui/material/InputAdornment';
import { postDocumento } from '../../../API/Documentos';

//------------------------------------> Return document info fields.

const renderDocumentInfoSection = (register, errors) => {
    return (
        <>
            <TextField
                required
                label="Valor do documento"
                className={documentFormStyles.valor}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                    )
                }}
                error={errors.valor}
                helperText={errors.valor ? errors.valor.message : ''}
                {...register('valor', {
                    pattern: {
                        value: /^\d{1,3}(?:\.\d{3})*,\d{2}$/,
                        message: 'exemplo: 10.123,20'
                    }
                })}
            />

            <TextField
                required
                label="Observação"
                className="observacao"
                className={documentFormStyles.observacao}
                {...register('observacao')}
                multiline
                rows={3}
            />
        </>
    );
};

//------------------------------------//

export const DocumentForm = ({ className, buttonText }) => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    // Opens and closes modal.
    // It also cleans all the inputs on close.
    const toggleModal = () => {
        setIsOpen(!isOpen);
        reset({});
    };

    const onSubmit = (data) => {
        postDocumento(data);
        setIsOpen(false);
    };

    return (
        <>
            {/* Button used to open modal. Botão adicionar documento. */}
            <button className={className} onClick={toggleModal}>
                <AddIcon />
                {buttonText}
            </button>

            {/* Modal section */}
            <Modal
                className="modal"
                open={isOpen}
                onClose={toggleModal}
                aria-labelledby="form-title"
                className={formStyles.modal}
            >
                <form
                    className={formStyles.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h2 id={formStyles['form-title']}>ADICIONAR DOCUMENTO</h2>
                    <div className={documentFormStyles.formFields}>
                        <ParceiroAutocomplete
                            control={control}
                            className={documentFormStyles.parceiro}
                        />
                        {renderDocumentInfoSection(register, errors)}
                    </div>
                    <Movimentacao
                        control={control}
                        className={documentFormStyles.movimentacao}
                    />

                    <SubmitSection onCancel={toggleModal} />
                </form>
            </Modal>
            {/* End of modal section */}
        </>
    );
};
