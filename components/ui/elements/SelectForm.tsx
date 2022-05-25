import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { FC, useState } from "react";
import { ISpecies,IBreed } from "../../../interfaces";

interface Props {
  label?: string;
  object?: any;
  select?: string
  handleSelect?: (event: SelectChangeEvent) => void;
}

export const SelectForm: FC<Props> = ({ label, object,select,handleSelect }) => {
 

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={select}
        label={label}
        onChange={handleSelect}
        required
      >
        {object?.map(({ id, name }: any, i: any) => (
          <MenuItem key={i} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
