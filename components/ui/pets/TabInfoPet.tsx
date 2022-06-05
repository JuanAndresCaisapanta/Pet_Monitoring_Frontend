import { useState, ChangeEvent, useContext, useEffect } from "react";

import Image from "next/image";

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
  Button,
} from "@mui/material";

import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import imageCompression from "browser-image-compression";

import { useForm } from "react-hook-form";

import {
  AuthContext,
  BreedContext,
  SpeciesContext,
  PetContext,
} from "../../../context";
import { SelectForm, AutocompleteFormState } from "../elements";
import { IBreed, ISpecies } from "../../../interfaces";
import { colorPet, sexPet } from "../../../data";

type FormData = {
  name: string;
  color_main: string;
  color_secondary: string;
  weight: number;
  sex: string;
  sterilization: boolean;
  image: any;
  birth_date: string;
  breed: number;
};

export const TabInfoPet = () => {
  const [imgSrc, setImgSrc] = useState<string>("/images/pet/pet-profile.jpg");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [selectSpecies, setSelectSpecies] = useState("");
  const [selectSex, setSelectSex] = useState("");
  const [selectColorPetMain, setSelectColorPetMain] = useState("");
  const [selectColorPetSecondary, setSelectColorPetSecondary] = useState("");
  const [val, setVal] = useState("");
  const [subtype, setSubtype] = useState<string[]>([]);

  const { getSpecies, species } = useContext(SpeciesContext);
  const { getBreed, breed } = useContext(BreedContext);
  const { addPet } = useContext(PetContext);
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getSpecies();
  }, []);

  const handleSelectSpecies = (event: SelectChangeEvent) => {
    setSelectSpecies(event.target.value as string);
    getBreed(Number(event.target.value));

    if (event.target === null) {
      setVal("");
      setSubtype([]);
    } else {
      setVal(event.target.value as string);
      setSubtype([]);
    }
  };

  const handleSelectSex = (event: SelectChangeEvent) => {
    setSelectSex(event.target.value as string);
  };

  const handleSelectColorPetMain = (event: SelectChangeEvent) => {
    setSelectColorPetMain(event.target.value as string);
  };

  const handleSelectColorPetSecondary = (event: SelectChangeEvent) => {
    setSelectColorPetSecondary(event.target.value as string);
  };

  const handleChangeDate = (newValue: Date | null) => {
    setDate(newValue);
  };

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const onAddPetForm = async ({
    name,
    color_main,
    color_secondary,
    weight,
    sex,
    sterilization,
    image,
    birth_date,
    breed,
  }: FormData) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    setShowError(false);
    const current = new Date();
    const date = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`;
    if (image[0] != null) {
      const cImage = await imageCompression(image[0], options);
      const { hasError, message } = await addPet(
        name,
        color_main,
        color_secondary,
        weight,
        sex,
        sterilization,
        cImage,
        birth_date,
        date,
        breed,
        user!.id,
      );
      if (hasError) {
        setShowError(true);
        setErrorMessage(message!);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
    } else {
      const { hasError, message } = await addPet(
        name,
        color_main,
        color_secondary,
        weight,
        sex,
        sterilization,
        image[0],
        birth_date,
        date,
        breed,
        user!.id,
      );
      if (hasError) {
        setShowError(true);
        setErrorMessage(message!);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
    }
  };

  return (
    <CardContent>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onAddPetForm)}
        encType={`multipart/form-data`}
      >
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
              <Typography color="primary">
                Imagen Mascota
              </Typography>
              <Image
                style={{ borderRadius: "15px" }}
                src={imgSrc}
                width="250rem"
                height="250rem"
                alt="Imagen Mascota"
              />

              <Button
                component="label"
                variant="text"
                htmlFor="account-settings-upload-image"
                disableElevation
                sx={{ mt: 1 }}
              >
                Cambiar
                <input
                  hidden
                  type="file"
                  {...register("image", { onChange: onChange })}
                  accept="image/*"
                  id="account-settings-upload-image"
                />
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  placeholder="Nombre"
                  {...register("name", {
                    required: "Este campo es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha Nacimiento"
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={handleChangeDate}
                    maxDate={new Date()}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        {...register("birth_date", {
                          required: "Este campo es requerido",
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectForm
                  label="Sexo"
                  name="sex"
                  object={sexPet}
                  value={selectSex}
                  onChange={handleSelectSex}
                  register={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectForm
                  label="Color Pelaje Principal"
                  name="color_main"
                  object={colorPet}
                  value={selectColorPetMain}
                  onChange={handleSelectColorPetMain}
                  register={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectForm
                  label="Color Pelaje Secundario"
                  name="color_secondary"
                  object={colorPet}
                  value={selectColorPetSecondary}
                  onChange={handleSelectColorPetSecondary}
                  register={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Peso"
                  placeholder="Peso"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  onKeyPress={(event) => {
                    if (
                      event?.key === "-" ||
                      event?.key === "+" ||
                      event?.key === "." ||
                      event?.key === "e"
                    ) {
                      event.preventDefault();
                    }
                  }}
                  {...register("weight", {
                    required: "Este campo es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Especie</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectSpecies}
                    label="Especie"
                    onChange={handleSelectSpecies}
                    required
                  >
                    {(species as unknown as ISpecies[])?.map(
                      ({ id, name }: any, i: any) => (
                        <MenuItem key={i} value={id}>
                          {name}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                {val && breed ? (
                  <AutocompleteFormState
                    label="Raza"
                    name="breed"
                    control={control}
                    object={breed as unknown as IBreed[]}
                    subtype={subtype}
                    setSubtype={setSubtype}
                  />
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" disableElevation sx={{ marginRight: 3.5 }} type="submit">
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
