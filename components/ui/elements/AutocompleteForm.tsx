import { Autocomplete, TextField } from "@mui/material";
import { FC, useState } from "react";
import { Controller } from "react-hook-form";

interface Props {
  label: string;
  object?: any;
  name: string;
  control: any;
}

export const AutocompleteForm: FC<Props> = ({
  object,
  label,
  name,
  control,
}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          disableClearable={true}
          options={object}
          getOptionLabel={(option: any) => option.name || ""}
          renderInput={(params) => (
            <TextField {...params} label={label} variant="outlined" />
          )}
          onChange={(event: any, newValue: any) => {
            onChange(newValue.id);
          }}
          isOptionEqualToValue={(option, values) =>
            option.value === values.value
          }
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
          }}
        />
      )}
      name={name}
      control={control}
    />
  );
};
