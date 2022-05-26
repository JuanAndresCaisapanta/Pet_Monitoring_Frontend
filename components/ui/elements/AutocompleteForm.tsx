import { FC, useState } from "react";

import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  // label: string;
  object?: any;
  subtype: any;
  setSubtype: any;
  name: string;
  control: any;
}

export const AutocompleteForm: FC<Props> = ({
  object,
  // label,
    subtype,
  setSubtype,
  name,control
}) => {

  const [inputValue, setInputValue] = useState('')
const [search, setSearch] = useState("");
  return (


<Controller
      render={({field: { onChange, value }}) => (
        <Autocomplete
        disableClearable={true}
          options={object}
          getOptionLabel={(option:any) => option.name||""}
          // renderOption={(option) => (
          //   <span>
          //     {countryToFlag(option.code)}
          //     {option.label}
          //   </span>
          // )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              variant="outlined"
            />
          )}
          onChange={(event:any, newValue:any) => {
            onChange(newValue.id);
            setSubtype(newValue);
          }}
           value={subtype}
          isOptionEqualToValue={(option, values) => option.value === values.value}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue)
          }}
        />
      )}
      name={name}
      control={control}
    />
  );
};
