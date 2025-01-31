import TextField from "@mui/material/TextField";

interface TextFieldProps {
  label: string;
  value: string;
  length: number;
  type: string;
  onChange: (newValue: string) => void;
}

export default function InputField({
  label,
  value,
  length,
  type,
  onChange,
}: TextFieldProps) {
  return (
    <TextField
      className="w-full rounded-lg"
      label={label}
      type={type}
      inputProps={{ maxLength: length }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
