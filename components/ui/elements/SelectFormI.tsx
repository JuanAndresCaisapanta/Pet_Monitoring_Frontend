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

export const SelectFormI: FC<Props> = ({
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
        labelId={`select-label-${name}`}
        id={`select-${name}`}
        value={value}
        disabled={disabled}
        label={label}
        {...register(name, {
          onChange: onChange,
          required: "Este campo es requerido",
        })}
        defaultValue={""}
        error={error}
      >
        {object
          ?.sort((a: any, b: any) => {
            if (a.fullName < b.fullName) {
              return -1;
            }
            if (a.fullName < b.fullName) {
              return 1;
            }
            return 0;
          })
          .map(({ full_name }: any, i: any) => (
            <MenuItem key={i} value={full_name}>
              {full_name}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};
