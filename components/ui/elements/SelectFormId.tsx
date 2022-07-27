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

export const SelectFormId: FC<Props> = ({
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
        {object?.length > 0?(
          object?.sort((a: any, b: any) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          })
          .map(({ id, name }: any) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))) : (
            <MenuItem value="">No hay datos</MenuItem>
          )}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};
