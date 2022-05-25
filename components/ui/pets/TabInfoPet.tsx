import { useState, ChangeEvent, useContext, useEffect } from "react";

import Image from "next/image";

import Button, { ButtonProps } from "@mui/material/Button";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Grid,
  TextField,
  Typography,
  CardContent,
} from "@mui/material";

import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { BreedContext, SpeciesContext } from "../../../context";
import { ISpecies } from "../../../interfaces/species";
import { SelectForm } from "../elements/SelectForm";
import { IBreed } from "../../../interfaces";
import { colorPet } from "../../../data";
import { AutocompleteForm } from "../elements/AutocompleteForm";

export const TabInfoPet = () => {
  const [imgSrc, setImgSrc] = useState<string>("/images/pet/pet-profile.jpg");
  const [value, setValue] = useState<Date | null>(new Date());
  const [selectSpecies, setSelectSpecies] = useState("");
  const [selectBreed, setSelectBreed] = useState("");
  const [selectSex, setSelectSex] = useState("");
  const [selectColorPetPrincipal, setSelectColorPetPrincipal] = useState("");
  const [selectColorPetSecondary, setSelectColorPetSecondary] = useState("");

  const { getSpecies, species } = useContext(SpeciesContext);
  const { getBreed, breed } = useContext(BreedContext);
  const [val, setVal] = useState("");
  const [subtype, setSubtype] = useState(null);

  useEffect(() => {
    getSpecies();
  }, []);

  const handleSelectSpecies = (event: SelectChangeEvent) => {
    setSelectSpecies(event.target.value as string);
    getBreed(Number(event.target.value));

    if (event.target === null) {
      setVal("");
      setSubtype(null);
    } else {
      setVal(event.target.value as string);
      setSubtype(null);
    }
  };

  const handleSelectBreed = (event: SelectChangeEvent) => {
    setSelectBreed(event.target.value as string);
  };

  const handleSelectSex = (event: SelectChangeEvent) => {
    setSelectSex(event.target.value as string);
  };

  const handleSelectColorPetPrincipal = (event: SelectChangeEvent) => {
    setSelectColorPetPrincipal(event.target.value as string);
  };

  const handleSelectColorPetSecondary = (event: SelectChangeEvent) => {
    setSelectColorPetSecondary(event.target.value as string);
  };

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);

      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <CardContent>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid
              container
              item
              xs={12}
              sm={12}
              direction="column"
              alignItems="center"
            >
              <Typography color="primary" mb={1}>
                Imagen Mascota
              </Typography>
              <Image
                style={{ borderRadius: "10px" }}
                src={imgSrc}
                width={300}
                height={250}
                alt="Imagen Mascota"
              />

              <Button
                component="label"
                variant="contained"
                htmlFor="account-settings-upload-image"
                disableElevation
                sx={{ mt: 1 }}
              >
                Cambiar
                <input
                  hidden
                  type="file"
                  // {...register("image", { onChange: onChange })}
                  accept="image/*"
                  id="account-settings-upload-image"
                />
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField fullWidth label="Nombre" placeholder="Nombre" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha Nacimiento"
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                    maxDate={new Date()}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectSex}
                    label="Sexo"
                    onChange={handleSelectSex}
                  >
                    <MenuItem value={"Macho"}>Macho</MenuItem>
                    <MenuItem value={"Hembra"}>Hembra</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectForm
                  label="Color Pelaje Principal"
                  object={colorPet}
                  select={selectColorPetPrincipal}
                  handleSelect={handleSelectColorPetPrincipal}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectForm
                  label="Color Pelaje Secundario"
                  object={colorPet}
                  select={selectColorPetSecondary}
                  handleSelect={handleSelectColorPetSecondary}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type={"number"}
                  label="Peso"
                  placeholder="Peso"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGroup sx={{ alignItems: "center" }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Esteril"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectForm
                  label="Especie"
                  object={species as unknown as ISpecies[]}
                  select={selectSpecies}
                  handleSelect={handleSelectSpecies}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {val && breed ? (
                  <AutocompleteForm
                    label="Raza"
                    object={breed as unknown as IBreed[]}
                    subtype={subtype}
                    setSubtype={(e: any, attr: any) => setSubtype(attr)}
                  />
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" sx={{ marginRight: 3.5 }} type="submit">
              Cuardar
            </Button>
            <Button type="reset" variant="outlined" color="error">
              Resetear
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};
