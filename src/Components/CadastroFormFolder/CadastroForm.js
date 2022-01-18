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
            <button onClick={toggleModal}>aaaaaaa</button>
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
                        <div className="pessoa-fields">
                            <TextField
                                label="CPF"
                                className="cep input"
                                {...register("cep")}
                                {...textFieldProps}
                            />
                            <TextField
                                label="Nascimento"
                                className="cep input"
                                {...register("cep")}
                                {...textFieldProps}
                            />
                        </div>
                    </div>
                    {/* End of customer information */}
        
                    {/* Adress section */}
                    <h3 className="section-title">Endereço</h3>
                    <grid className="adress-section">
                        <TextField
                            label="CEP"
                            className="cep input"
                            {...register("cep")}
                            {...textFieldProps}
                        />
                        <TextField
                            label="Logradouro"
                            className="logradouro input"
                            {...register("logradouro")}
                            {...textFieldProps}
                        />
                        <TextField
                            label="Bairro"
                            className="bairro input"
                            {...register("bairro")}
                            {...textFieldProps}
                        />
                        <TextField
                            label="Complemento"
                            className="complemento input"
                            {...register("complemento")}
                            {...textFieldProps}
                        />
                        <TextField
                            label="Número"
                            className="numero input"
                            {...register("numero")}
                            {...textFieldProps}
                        />
                        <TextField
                            label="UF"
                            className="estado input"
                            {...register("estado")}
                            {...textFieldProps}
                        />
                        <TextField
                            label="Cidade"
                            className="cidade input"
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
                                className="email input"
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
                            className="telefone input"
                            {...register("fixo")}
                            {...textFieldProps}
                        />
                    </grid>
                    {/* End of the contact section */}

                </form>
            </Modal>
        </>
    );
}

export default CadastroForm;