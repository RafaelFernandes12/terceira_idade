"use client";

import TextField from "@mui/material/TextField";

interface TextFieldProps {
    label: string,
    value: any,
    onChange: (newValue: string) => void,
}

export default function InputField({label,value,onChange} : TextFieldProps){

  return(
    <TextField 
      className='w-full rounded-lg my-4' 
      label={label} 
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
