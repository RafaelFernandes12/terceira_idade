'use client'

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface selectFieldProps {
    inputLabel: string,
    label: string
    value:any,
    onChange: (newValue: any) => void,
    itens: string[],
    isMultiple: boolean
}

export default function SelectField({inputLabel, label,value,onChange,itens,isMultiple} : selectFieldProps){
    if(isMultiple){
        return(
            <FormControl sx={{ minWidth: 120}} size="medium">
                <InputLabel>{inputLabel}</InputLabel>
                    <Select
                        multiple
                        value={value}
                        label={label}
                        onChange={e => onChange(e)}
                    >
                    {itens.map(item => {
                        return <MenuItem key={item} value={item}>{item}</MenuItem>
                    })}
                    </Select>
             </FormControl>
        )
    } else {
        return(
            <FormControl  sx={{ minWidth: 120,marginX: 5 }} size="medium">
                <InputLabel>{inputLabel}</InputLabel>
                    <Select
                        value={value}
                        label={label}
                        onChange={e => onChange(e)}
                    >
                    {itens.map(item => {
                        return <MenuItem key={item} value={item}>{item}</MenuItem>
                    })}
                    </Select>
             </FormControl>
        )
    }

}
