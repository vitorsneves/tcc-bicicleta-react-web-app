import { Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { PostParceiro } from '../../../API/Cadastro';
import { SubmitSection } from '../FormComponents/SubmitSection';
import {
    FormControlLabel,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup
} from '@mui/material';

// The CSS used here was split though multiple files
import formStyles from '../FormComponents/form.module.css';
import './customer.css';
import './adress.css';
import './contact.css';

// Common props that are shared among the text fields.
const textFieldProps = {
    size: 'small',
    variant: 'outlined',
    required: true
};

// There are two kinds of customers. (pessoa fisica e pessoa jurídica).
// Each one has different input fields with different data.
// The right input section is rendered conditionally by the function bellow.

const renderRightPerson = (personType, register, errors) => {
    if (personType === 'PESSOA FISICA') {
        return renderPessoaFisicaSection(register, errors);
    }

    if (personType === 'PESSOA JURIDICA') {
        return renderPessoaJuridicaSection(register, errors);
    }
};

//------------------------------------> Returns pessoa section
// This includes the radio buttons and the right field.

const renderPersonSection = (
    personType,
    togglePersonType,
    register,
    errors
) => {
    return (
        <>
            {/* customer information section */}

            <div
                className={formStyles.section + ' pessoa-section ' + personType}
            >
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
                            value="PESSOA FISICA"
                            control={<Radio />}
                        />
                        <FormControlLabel
                            label="jurídica"
                            value="PESSOA JURIDICA"
                            control={<Radio />}
                        />
                    </RadioGroup>
                </FormControl>
                {renderRightPerson(personType, register, errors)}
            </div>

            {/* End of customer information */}
        </>
    );
};

//------------------------------------> Returns pessoaFisica section.
const renderPessoaFisicaSection = (register, errors) => {
    return (
        <div className="fisica-fields">
            <TextField
                label="Nome"
                className={'nome' + ' ' + formStyles['spawning-input']}
                inputProps={{ minLength: 3, maxLength: 40 }}
                {...register('nome')}
                {...textFieldProps}
            />
            <TextField
                label="CPF"
                className={'cpf' + ' ' + formStyles['spawning-input']}
                error={errors.cpf}
                helperText={errors.cpf ? errors.cpf.message : ''}
                {...register('cpf', {
                    pattern: {
                        value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                        message: '000.000.000-00'
                    }
                })}
                inputProps={{ maxLength: 14 }}
                {...register('cpf')}
                {...textFieldProps}
            />
        </div>
    );
};

//------------------------------------> Returns pessoaJuridica section.
const renderPessoaJuridicaSection = (register, errors) => {
    return (
        <Box className="juridica-fields">
            <TextField
                label="CNPJ"
                className={'cnpj' + ' ' + formStyles['spawning-input']}
                error={errors.cnpj}
                helperText={errors.cnpj ? errors.cnpj.message : ''}
                inputProps={{ maxLength: 18 }}
                {...register('cnpj', {
                    pattern: {
                        value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
                        message: '00.000.000/0000-00'
                    }
                })}
                {...register('cnpj')}
                {...textFieldProps}
            />
            <TextField
                label="Nome Fantasia"
                className={'nome-fantasia' + ' ' + formStyles['spawning-input']}
                inputProps={{ minLength: 3, maxLength: 40 }}
                {...register('nomeFantasia')}
                {...textFieldProps}
            />
            <TextField
                label="Razão social"
                className={'razao-social' + ' ' + formStyles['spawning-input']}
                inputProps={{ minLength: 3, maxLength: 40 }}
                {...register('razaoSocial')}
                {...textFieldProps}
            />
        </Box>
    );
};

//------------------------------------> Return adress section.

const renderUFdropdown = (register) => {
    const estados = [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO',
        'DF'
    ];

    return (
        <FormControl size="small" className="estado">
            <InputLabel required id="estado-label">
                UF
            </InputLabel>
            <Select
                labelId="estado-label"
                label="UF"
                {...register('estado')}
                defaultValue=""
                MenuProps={{ PaperProps: { sx: { maxHeight: 170 } } }}
                required
            >
                {estados.map((estado) => (
                    <MenuItem value={estado}>{estado}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const renderAdressSection = (register, errors) => {
    return (
        <>
            {/* Adress section */}

            <h3 className={formStyles['section-title']}>Endereço</h3>
            <div className={formStyles.section + ' adress-section'}>
                <TextField
                    label="CEP"
                    className="cep"
                    error={errors.cep}
                    helperText={errors.cep ? errors.cep.message : ''}
                    inputProps={{ maxLength: 9 }}
                    {...register('cep', {
                        pattern: {
                            value: /^\d{5}-\d{3}$/,
                            message: '00000-000'
                        }
                    })}
                    {...textFieldProps}
                />
                <TextField
                    label="Logradouro"
                    className="logradouro"
                    {...register('logradouro')}
                    inputProps={{ minLength: 5, maxLength: 40 }}
                    {...textFieldProps}
                />
                <TextField
                    label="Bairro"
                    className="bairro"
                    {...register('bairro')}
                    inputProps={{ minLength: 5, maxLength: 20 }}
                    {...textFieldProps}
                />
                <TextField
                    label="Complemento"
                    className="complemento"
                    {...register('complemento')}
                    inputProps={{ maxLength: 40 }}
                    {...textFieldProps}
                />
                <TextField
                    label="Número"
                    className="numero"
                    error={errors.numero}
                    helperText={errors.numero ? errors.numero.message : ''}
                    {...register('numero', {
                        pattern: {
                            value: /^[0-9\b]+$/,
                            message: 'somente números'
                        }
                    })}
                    inputProps={{ maxLength: 6 }}
                    {...textFieldProps}
                />
                {renderUFdropdown(register)}
                <TextField
                    label="Cidade"
                    className="cidade"
                    {...register('cidade')}
                    inputProps={{ minLength: 5, maxLength: 20 }}
                    {...textFieldProps}
                />
            </div>

            {/* End of the adress section */}
        </>
    );
};

//------------------------------------> Return contact section (phone number and email).

const renderContactSection = (register, errors) => {
    return (
        <>
            {/* Contact section */}

            <h3 className={formStyles['section-title']}>Contato</h3>
            <div className={formStyles.section + ' contact-section'}>
                <TextField
                    label="email"
                    className="email"
                    type="email"
                    inputProps={{ maxLength: 40 }}
                    {...register('email')}
                    {...textFieldProps}
                />
                <TextField
                    label="Telefone Celular"
                    className="telefone"
                    inputProps={{ maxLength: 15 }}
                    error={errors.telefoneCelular}
                    helperText={
                        errors.telefoneCelular
                            ? errors.telefoneCelular.message
                            : ''
                    }
                    {...register('telefoneCelular', {
                        pattern: {
                            value: /^\([0-9]{2}\) [0-9]{5}\-[0-9]{4}$/,
                            message: '(00) 00000-0000'
                        }
                    })}
                    {...textFieldProps}
                />
                <TextField
                    label="Telefone"
                    className="telefone"
                    inputProps={{ maxLength: 14 }}
                    error={errors.telefoneFixo}
                    helperText={
                        errors.telefoneFixo ? errors.telefoneFixo.message : ''
                    }
                    {...register('telefoneFixo', {
                        pattern: {
                            value: /^\([0-9]{2}\) [0-9]{4}\-[0-9]{4}$/,
                            message: '(00) 0000-0000'
                        }
                    })}
                    {...textFieldProps}
                />
            </div>

            {/* End of the contact section */}
        </>
    );
};

//-------------------------------------> Functions used to clean form cells.

// Set useForm to listen to the right fields (PessoaFisicaSection or PessoaJuridicaSection).
// It also cleans the text and unregister the wrong fields.
const registerRightField = (person, register, unregister, resetField) => {
    if (person === 'PESSOA FISICA') {
        unregister(['cnpj', 'nomeFantasia', 'razaoSocial']);

        register('nome');
        register('cpf');

        resetField('nome');
        resetField('cpf');
    }

    if (person === 'PESSOA JURIDICA') {
        unregister(['nome', 'cpf']);

        register('cnpj');
        register('nomeFantasia');
        register('razaoSocial');

        resetField('cnpj');
        resetField('nomeFantasia');
        resetField('razaoSocial');
    }
};

//-------------------------------------//

export const CadastroForm = ({ className, buttonText, addPersonToState }) => {
    const [isOpen, setIsOpen] = useState(false);

    // The person type can be física or jurídica.
    const [personType, setPersonType] = useState('PESSOA FISICA');

    const {
        register,
        unregister,
        handleSubmit,
        reset,
        resetField,
        formState: { errors }
    } = useForm();

    // Opens and closes modal.
    // It also cleans all the inputs on close.
    const toggleModal = () => {
        setIsOpen(!isOpen);
        reset({});
    };

    const togglePersonType = (event) => {
        setPersonType(event.target.value);
        registerRightField(
            event.target.value,
            register,
            unregister,
            resetField
        );
    };

    // Called when the user submits the form.
    // Use this to send info to API.
    const onSubmit = async (data) => {
        setIsOpen(false);
        await PostParceiro({ ...data, tipo: personType });
        addPersonToState();
    };

    return (
        <>
            {/* Button used to open modal. Botão adicionar cadastro. */}

            <button className={className} onClick={toggleModal}>
                <AddIcon />
                {buttonText}
            </button>

            {/* Modal section */}
            <Modal
                className={formStyles['modal']}
                open={isOpen}
                onClose={toggleModal}
                aria-labelledby="form-title"
            >
                <form
                    className={formStyles['form']}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h2 id={formStyles['form-title']}>CADASTRO</h2>

                    {renderPersonSection(
                        personType,
                        togglePersonType,
                        register,
                        errors
                    )}
                    {renderAdressSection(register, errors)}
                    {renderContactSection(register, errors)}

                    <SubmitSection onCancel={toggleModal} />
                </form>
            </Modal>

            {/* End of modal section */}
        </>
    );
};
