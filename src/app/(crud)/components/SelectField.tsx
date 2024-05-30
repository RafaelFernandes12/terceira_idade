import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

interface selectFieldProps {
  inputLabel: string
  label: string
  value: string
  onChange: (newValue: string) => void
  itens: string[]
}

export default function SelectField({
  inputLabel,
  label,
  value,
  onChange,
  itens,
}: selectFieldProps) {
  return (
    <FormControl sx={{ minWidth: 120 }} className="w-full">
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        {itens.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
