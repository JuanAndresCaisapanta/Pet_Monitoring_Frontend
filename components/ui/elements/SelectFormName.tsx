import { FC } from "react";

import { FormControl, MenuItem, InputLabel, Select, FormHelperText } from "@mui/material";

interface Props {
  object?: any;
  value: any;
  register: any;
  onChange: any;
  label: string;
  name: string;
  disabled?: boolean;
  error: any;
  helperText: any;
}

export const SelectFormName: FC<Props> = ({
  object,
  label,
  name,
  value,
  onChange,
  register,
  disabled,
  error,
  helperText,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel error={error} id="demo-simple-select-label">
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        disabled={disabled}
        value={value}
        label={label}
        error={error}
        {...register(name, {
          onChange: onChange,
          required: "Este campo es requerido",
        })}
      >
        {object
          ?.sort((a: any, b: any) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          })
          .map(({ id, name }: any) => (
            <MenuItem key={id} value={name}>
              {name}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};
