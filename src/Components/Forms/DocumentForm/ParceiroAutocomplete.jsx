import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { GetPeople } from '../../../API/Cadastro';
import { Controller } from 'react-hook-form';

//------------------------------------> Return parceiro autocomplete field.

export const ParceiroAutocomplete = ({ control, className }) => {
    const [parceiros, setParceiros] = useState([]);

    useEffect(() => {
        GetPeople().then((response) => {
            setParceiros(response.data);
        });
    }, []);

    return (
        <div className={className}>
            <Controller
                name="parceiro"
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        options={parceiros}
                        getOptionLabel={(option) =>
                            option.nomE_RAZAO + ' - ' + option.cpF_CNPJ
                        }
                        renderInput={(params) => {
                            return (
                                <TextField
                                    required
                                    {...params}
                                    label="Parceiro Comercial"
                                    variant="outlined"
                                    onChange={onChange}
                                />
                            );
                        }}
                        onChange={(_, values) => onChange(values)}
                        value={value}
                    />
                )}
            />
        </div>
    );
};
