import React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Controller } from 'react-hook-form';

export const Movimentacao = ({ control, className }) => {
    return (
        <Controller
            rules={{ required: true }}
            control={control}
            name="movimentacao"
            defaultValue={'pagamento'}
            render={({ field }) => {
                return (
                    <div className={className}>
                        <h3>Tipo de movimentação financeira:</h3>
                        <RadioGroup {...field}>
                            <FormControlLabel
                                value="pagamento"
                                control={<Radio />}
                                label="Pagamento"
                            />
                            <FormControlLabel
                                value="recebimento"
                                control={<Radio />}
                                label="Recebimento"
                            />
                        </RadioGroup>
                    </div>
                );
            }}
        />
    );
};
