import {
    FormControlLabel,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup
} from '@mui/material';
import { Modal, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';

// The CSS used here was split though multiple files
import './form.css';
import './customer.css';
import './adress.css';
import './contact.css';

// Common props that are shared among the text fields.
const textFieldProps = {
    size: 'small',
    variant: 'outlined'
};

// There are two kinds of customers. (pessoa fisica e pessoa jurídica).
// Each one has different input fields with different data.
// The right input section is rendered conditionally by the function bellow.

const renderRightPerson = (personType, register) => {
    if (personType === 'fisica') {
        return renderPessoaFisicaSection(register);
    }

    if (personType === 'juridica') {
        return renderPessoaJuridicaSection(register);
    }
};

//------------------------------------> Returns pessoa section
// This includes the radio buttons and the right field.

const renderPersonSection = (personType, togglePersonType, register) => {
    return (
        <>
            {/* customer information section */}

            <div className={'pessoa-section ' + personType}>
                <FormControl>
                    <FormLabel id="customer-type">Pessoa</FormLabel>
                    <RadioGroup
                        aria-labelledby="customer-type"
                        onChange={togglePersonType}
                        value={personType}
                        row
                    >
                        <FormControlLabel
                            label="física"
                            value="fisica"
                            control={<Radio />}
                        />
                        <FormControlLabel
                            label="jurídica"
                            value="juridica"
                            control={<Radio />}
                        />
                    </RadioGroup>
                </FormControl>
                {renderRightPerson(personType, register)}
            </div>

            {/* End of customer information */}
        </>
    );
};

//------------------------------------> Returns pessoaFisica section.
const renderPessoaFisicaSection = (register) => {
    return (
        <div className="fisica-fields">
            <TextField
                label="Nome"
                className="nome spawning-input"
                {...register('nome')}
                {...textFieldProps}
            />
            <TextField
                label="CPF"
                className="cpf spawning-input"
                {...register('cpf')}
                {...textFieldProps}
            />
            <TextField
                label="Nascimento"
                className="nascimento spawning-input"
                {...register('nascimento')}
                {...textFieldProps}
            />
        </div>
    );
};

//------------------------------------> Returns pessoaJuridica section.
const renderPessoaJuridicaSection = (register) => {
    return (
        <Box className="juridica-fields">
            <TextField
                label="CNPJ"
                className="cnpj spawning-input"
                {...register('cnpj')}
                {...textFieldProps}
            />
            <TextField
                label="Nome Fantasia"
                className="nome-fantasia spawning-input"
                {...register('nomeFantasia')}
                {...textFieldProps}
            />
            <TextField
                label="Razão social"
                className="razao-social spawning-input"
                {...register('razaoSocial')}
                {...textFieldProps}
            />
            <TextField
                label="Data de abertura"
                className="data-abertura spawning-input"
                {...register('dataAbertura')}
                {...textFieldProps}
            />
            <TextField
                label="Inscrição estadual"
                className="inscricao-estadual spawning-input"
                {...register('inscricaoEstadual')}
                {...textFieldProps}
            />
        </Box>
    );
};

//------------------------------------> Return adress section.

const renderAdressSection = (register) => {
    return (
        <>
            {/* Adress section */}

            <h3 className="section-title">Endereço</h3>
            <grid className="adress-section">
                <TextField
                    label="CEP"
                    className="cep"
                    {...register('cep')}
                    {...textFieldProps}
                />
                <TextField
                    label="Logradouro"
                    className="logradouro"
                    {...register('logradouro')}
                    {...textFieldProps}
                />
                <TextField
                    label="Bairro"
                    className="bairro"
                    {...register('bairro')}
                    {...textFieldProps}
                />
                <TextField
                    label="Complemento"
                    className="complemento"
                    {...register('complemento')}
                    {...textFieldProps}
                />
                <TextField
                    label="Número"
                    className="numero"
                    {...register('numero')}
                    {...textFieldProps}
                />
                <TextField
                    label="UF"
                    className="estado"
                    {...register('estado')}
                    {...textFieldProps}
                />
                <TextField
                    label="Cidade"
                    className="cidade"
                    {...register('cidade')}
                    {...textFieldProps}
                />
            </grid>

            {/* End of the adress section */}
        </>
    );
};

//------------------------------------> Return contact section (phone number and email).

const renderContactSection = (register) => {
    return (
        <>
            {/* Contact section */}

            <h3 className="section-title">Contato</h3>
            <grid className="contact-section">
                <TextField
                    label="email"
                    className="email"
                    {...register('email')}
                    {...textFieldProps}
                />
                <TextField
                    label="Telefone Celular"
                    className="telefone Fixo"
                    {...register('celular')}
                    {...textFieldProps}
                />
                <TextField
                    label="Telefone Fixo"
                    className="telefone"
                    {...register('fixo')}
                    {...textFieldProps}
                />
            </grid>

            {/* End of the contact section */}
        </>
    );
};

//------------------------------------> Return submit button;

const renderSubmitSection = () => {
    return (
        <>
            {/* Submit and cancel buttons */}

            <div className="submit-section">
                <input
                    className="confirm-button"
                    type="submit"
                    value="CONFIRMAR"
                />
            </div>

            {/* End of submit and cancel buttons */}
        </>
    );
};

export const CadastroForm = ({ className, buttonText }) => {
    const [isOpen, setIsOpen] = useState(false);

    // The person type can be física or jurídica.
    const [personType, setPersonType] = useState('fisica');

    const { register, handleSubmit, reset } = useForm();

    // Opens and closes modal.
    // It also cleans all the inputs on close.
    const toggleModal = () => {
        setIsOpen(!isOpen);
        reset({});
    };

    const togglePersonType = (event) => {
        setPersonType(event.target.value);
    };

    // Called when the user submits the form.
    // Use this to send info to API.
    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
    };

    return (
        <>
            {/* Button used to open modal. Botão adicionar cadastro. */}

            <button className={className} onClick={toggleModal}>
                {buttonText}
            </button>

            {/* Modal section */}
            <Modal
                className="modal"
                open={isOpen}
                onClose={toggleModal}
                aria-labelledby="form-title"
            >
                <form className={'form '} onSubmit={handleSubmit(onSubmit)}>
                    <h2 id="form-title">CADASTRO</h2>

                    {renderPersonSection(
                        personType,
                        togglePersonType,
                        register
                    )}
                    {renderAdressSection(register)}
                    {renderContactSection(register)}

                    {renderSubmitSection()}
                </form>
            </Modal>

            {/* End of modal section */}
        </>
    );
};
