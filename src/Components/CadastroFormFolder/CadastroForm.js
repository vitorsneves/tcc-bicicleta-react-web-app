import { FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Modal, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { DatePicker } from '@mui/lab';

import "./adress-section.css";
import "./cadastro-form.css";
import "./contact-section.css";
import "./customer-info.css";

const CadastroForm = () => {

    const [isOpen, setIsOpen] = useState( false );
    const [personType, setPersonType] = useState("fisica");

    const {register, handleSubmit, reset} = useForm();

    // Opens and closes modal.
    // It also cleans all the inputs on close.
    const toggleModal = () => {
        setIsOpen(!isOpen);
        reset({});
    }

    const loadPersonField = () => {
        if(personType == "fisica") {
            return (
                <div className="fisica-fields">
                    <TextField
                        label="Nome"
                        className="nome fisica-input"
                        {...register("cep")}
                        {...textFieldProps}
                    />
                    <TextField
                        label="CPF"
                        className="cpf fisica-input"
                        {...register("cep")}
                        {...textFieldProps}
                    />
                    <TextField
                        label="Nascimento"
                        className="nascimento fisica-input"
                        {...register("cep")}
                        {...textFieldProps}
                    />
                </div>
            );
        }

        if(personType == "juridica") {
            return(
                <div className="juridica-fields">
                    <TextField
                        label="CNPJ"
                        className="cnpj spawning-input"
                        {...register("cep")}
                        {...textFieldProps}
                    />
                    <TextField
                        label="Nome Fantasia"
                        className="nome-fantasia spawning-input"
                        {...register("cep")}
                        {...textFieldProps}
                    />
                    <TextField
                        label="Razão social"
                        className="razao-social spawning-input"
                        {...register("cep")}
                        {...textFieldProps}
                    />
                    <TextField
                        label="Data de abertura"
                        className="data-abertura spawning-input"
                        {...register("cep")}
                        {...textFieldProps}
                    />
                    <TextField
                        label="Inscrição estadual"
                        className="inscricao-estadual spawning-input"
                        {...register("cep")}
                        {...textFieldProps}
                    />
                </div>
                
            );
        }
    }

    const togglePersonType = (event) => {
        setPersonType(event.target.value);
    }

    const textFieldProps = {
        size: "small",
        variant: "outlined",
        ...register("cep")
    }

    return(
        <>
            <button className="awesome-button" onClick={toggleModal}>css is awesome</button>
            <Modal className="modal"
            open={isOpen}
            onClose={toggleModal}
            aria-labelledby="title" >

                <form className={"form "}>
                    <h2 className="form-title">CADASTRO</h2>

                    {/* customer information section */}
                    <div className={"pessoa-section " + ((personType == "fisica")? "fisica" : "juridica")}>
                        <FormControl>
                            <FormLabel id="customer-type">
                                Pessoa
                            </FormLabel>
                            <RadioGroup 
                                aria-labelledby="customer-type"
                                value={personType}
                                onChange={togglePersonType}
                                row
                            >
                                <FormControlLabel
                                    value="fisica" 
                                    control={<Radio />} 
                                    label="física" />
                                <FormControlLabel 
                                    value="juridica" 
                                    control={<Radio />}
                                    label="jurídica" />
                            </RadioGroup>
                        </FormControl>
                        {loadPersonField()}
                    </div>
                    {/* End of customer information */}
        
                    {/* Adress section */}
                    <h3 className="section-title">Endereço</h3>
                    <grid className="adress-section">
                        <TextField
                            label="CEP"
                            className="cep"
                            {...register("cep")}
                            {...textFieldProps}
                        />
                        <TextField
                            label="Logradouro"
                            className="logradouro"
                            {...register("logradouro")}
                            {...textFieldProps}
                        />
                        <TextField
                            label="Bairro"
                            className="bairro"
                            {...register("bairro")}
                            {...textFieldProps}
                        />
                        <TextField
                            label="Complemento"
                            className="complemento"
                            {...register("complemento")}
                            {...textFieldProps}
                        />
                        <TextField
                            label="Número"
                            className="numero"
                            {...register("numero")}
                            {...textFieldProps}
                        />
                        <TextField
                            label="UF"
                            className="estado"
                            {...register("estado")}
                            {...textFieldProps}
                        />
                        <TextField
                            label="Cidade"
                            className="cidade"
                            {...register("cidade")}
                            {...textFieldProps}
                        />
                    </grid>
                    {/* End of the adress section */}

                    {/* Contact section */}
                    <h3 className="section-title">Contato</h3>
                    <grid className="contact-section">
                        <TextField
                                label="email"
                                className="email"
                                {...register("email")}
                                {...textFieldProps}
                        />
                        <TextField
                            label="Telefone Celular"
                            className="telefone Fixo"
                            {...register("celular")}
                            {...textFieldProps}
                        />
                        <TextField
                            label="Telefone Fixo"
                            className="telefone"
                            {...register("fixo")}
                            {...textFieldProps}
                        />
                    </grid>
                    {/* End of the contact section */}

                    {/* Submit and cancel buttons */}
                    <div className="submit-section">
                        <input className="confirm-button" type="submit" value="CONFIRMAR" />
                    </div>
                    {/* End of submit and cancel buttons */}
                </form>
            </Modal>
        </>
    );
}

export default CadastroForm;