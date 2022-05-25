import { FC } from "react";

import { Autocomplete, TextField } from "@mui/material";

interface Props {
  label: string;
  object?: any;
  subtype: any;
  setSubtype: any;
}

export const AutocompleteForm: FC<Props> = ({
  object,
  label,
  subtype,
  setSubtype,
}) => {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={object}
      fullWidth
      renderInput={(params) => <TextField {...params} label={label} />}
      getOptionLabel={(option) => (option as any).name}
      value={subtype}
      onChange={setSubtype}
      noOptionsText="No hay opciones"
    />
  );
};
