import { FC } from "react";

import { FormControl, MenuItem, InputLabel, Select, FormHelperText, TextField } from "@mui/material";

interface Props {
  object?: any;
  register: any;
  label: string;
  name: string;
  error:any;
  helperText:any;
}

export const SelectFormId: FC<Props> = ({
  object,
  label,
  name,
  register,
  error,
  helperText
}) => {
  return (
    <TextField
    select
    fullWidth
    label={label}
    defaultValue=''
    inputProps={register(name, {
      required: 'Este campo es requerido',
    })}
    error={error}
    helperText={helperText}
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
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
     </TextField>
  );
};
