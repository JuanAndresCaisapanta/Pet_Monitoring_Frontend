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
  Divider,
  CardActions,
  Card,
  CardHeader,
  FormHelperText,
} from "@mui/material";
import {
  DesktopDatePicker,
  LoadingButton,
  LocalizationProvider,
} from "@mui/lab";
import { Save } from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import imageCompression from "browser-image-compression";
import { useForm } from "react-hook-form";

import {
  AuthContext,
  BreedContext,
  SpeciesContext,
  PetContext,
} from "../../../context";
import { SelectFormName, SelectFormId } from "../elements";
import { ISpecies } from "../../../interfaces";
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
  species: number;
};

export const TabAddPet = () => {
  const [imgSrc, setImgSrc] = useState<string>("/images/pet/pet-profile.jpg");
  const [birthDate, setBirthDate] = useState<Date | null>(new Date());
  const [selectSpecies, setSelectSpecies] = useState<string | null>("");
  const [selectSex, setSelectSex] = useState<string>("");
  const [selectColorPetMain, setSelectColorPetMain] = useState<string>("");
  const [selectColorPetSecondary, setSelectColorPetSecondary] =
    useState<string>("");
  const [selectBreed, setSelectBreed] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkSterilization, setCheckSterilization] = useState(false);
  const { getSpecies, species, clearSpecies } = useContext(SpeciesContext);
  const { getBreeds, breeds, clearBreeds } = useContext(BreedContext);
  const { addPet } = useContext(PetContext);
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getSpecies();
    return () => {
      clearSpecies();
    };
  });

  const handleSelectSpecies = (event: SelectChangeEvent) => {
    setSelectSpecies(event.target.value);
    getBreeds(Number(event.target.value));
    setSelectBreed("");
  };

  const handleSelectBreed = (event: SelectChangeEvent) => {
    setSelectBreed(event.target.value as string);
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
    setBirthDate(newValue);
  };

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClearForm = () => {
    setSelectSex("");
    setValue("sex", null);
    setSelectColorPetMain("");
    setValue("color_main", null);
    setSelectColorPetSecondary("");
    setValue("color_secondary", null);
    setCheckSterilization(false);
    setValue("sterilization", false);
    setValue("name", "");
    setValue("weight", 1);
    setBirthDate(new Date());
    setValue("birth_date", birthDate!.toString());
    setSelectSpecies("");
    setValue("species", null);
    clearBreeds();
    setSelectBreed("");
    setValue("breed", null);
    setImgSrc("/images/pet/pet-profile.jpg");
    setValue("image", 0);
  };

  const onAddPet = async ({
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
    setIsLoading(true);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    if (image[0] != null) {
      const compressedImage = await imageCompression(image[0], options);
      const { isComplete } = await addPet(
        name,
        color_main,
        color_secondary,
        weight,
        sex,
        sterilization,
        compressedImage,
        birth_date,
        breed,
        user!.id,
        handleClearForm,
      );
      if (isComplete) {
        setIsLoading(false);
      }
    } else {
      const { isComplete } = await addPet(
        name,
        color_main,
        color_secondary,
        weight,
        sex,
        sterilization,
        image[0],
        birth_date,
        breed,
        user!.id,
        handleClearForm,
      );
      if (isComplete) {
        setIsLoading(false);
      }
    }
  };

  if (species) {
    return (
      <Card>
        <CardHeader
          title={`Información de su Mascota`}
          titleTypographyProps={{ variant: "body1", color: "#3A3541DE" }}
        />
        <Divider sx={{ margin: 0 }} />
        <form
          noValidate
          autoComplete="off"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onAddPet)}
        >
          <CardContent>
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
                  <Image
                    style={{ borderRadius: "15px" }}
                    src={imgSrc}
                    width="250rem"
                    height="177rem"
                    alt="Imagen Mascota"
                    quality={100}
                  />

                  <Button
                    component="label"
                    variant="text"
                    htmlFor="account-settings-upload-image"
                    disableElevation
                    disabled={isLoading}
                  >
                    Cambiar Imagen
                    <input
                      hidden
                      type="file"
                      {...register("image", { onChange: onChange })}
                      accept="image/*"
                      id="account-settings-upload-image"
                    />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} sx={{ mt: 1 }}>
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
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Fecha Nacimiento"
                        inputFormat="MM/dd/yyyy"
                        disabled={isLoading}
                        value={birthDate}
                        onChange={handleChangeDate}
                        maxDate={new Date()}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            {...register("birth_date", {
                              required: "Este campo es requerido",
                            })}
                            error={!!errors.birth_date}
                            helperText={errors.birth_date?.message}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SelectFormName
                      label="Sexo"
                      name="sex"
                      object={sexPet}
                      value={selectSex}
                      onChange={handleSelectSex}
                      register={register}
                      disabled={isLoading}
                      error={!!errors.sex}
                      helperText={errors.sex?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SelectFormName
                      label="Color Pelaje Principal"
                      name="color_main"
                      object={colorPet}
                      value={selectColorPetMain}
                      onChange={handleSelectColorPetMain}
                      register={register}
                      disabled={isLoading}
                      error={!!errors.color_main}
                      helperText={errors.color_main?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SelectFormName
                      label="Color Pelaje Secundario"
                      name="color_secondary"
                      object={colorPet}
                      value={selectColorPetSecondary}
                      onChange={handleSelectColorPetSecondary}
                      register={register}
                      disabled={isLoading}
                      error={!!errors.color_secondary}
                      helperText={errors.color_secondary?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Peso Kg"
                      placeholder="Peso Kg"
                      disabled={isLoading}
                      InputProps={{
                        inputProps: { min: 1 },
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
                        minLength: { value: 1, message: "Mínimo 1 caracter" },
                      })}
                      error={!!errors.weight}
                      helperText={errors.weight?.message}
                      defaultValue={1}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} textAlign="center">
                    <FormControl
                      error={!!errors.sterilization}
                      component="fieldset"
                      variant="outlined"
                    >
                      <FormGroup>
                        <FormControlLabel
                          disabled={isLoading}
                          control={
                            <Checkbox
                              {...register("sterilization", {})}
                              value={checkSterilization}
                              onChange={(e) => {
                                setCheckSterilization(e.target.checked);
                              }}
                              checked={checkSterilization}
                            />
                          }
                          label="Esterilizado/a"
                        />
                      </FormGroup>
                      <FormHelperText error>
                        {errors.sterilization?.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        error={!!errors.species}
                      >
                        Especie
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        disabled={isLoading}
                        value={selectSpecies}
                        label="Especie"
                        {...register("species", {
                          onChange: handleSelectSpecies,
                          required: "Este campo es requerido",
                        })}
                        defaultValue={selectSpecies}
                        error={!!errors.species}
                      >
                        {(species as unknown as ISpecies[])?.map(
                          ({ id, name }: any, i: any) => (
                            <MenuItem key={i} value={id}>
                              {name}
                            </MenuItem>
                          ),
                        )}
                      </Select>
                      <FormHelperText error={!!errors.species}>
                        {errors.species?.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {breeds ? (
                      <SelectFormId
                        label="Raza"
                        name="breed"
                        object={breeds}
                        value={selectBreed}
                        onChange={handleSelectBreed}
                        register={register}
                        disabled={isLoading}
                        error={!!errors.breed}
                        helperText={errors.breed?.message}
                      />
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions sx={{ padding: "16px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: 2 }}
                  disableElevation
                  type="submit"
                  startIcon={<Save />}
                  loading={isLoading}
                  loadingPosition="start"
                >
                  Guardar
                </LoadingButton>
                <Button
                  disableElevation
                  variant="outlined"
                  color="secondary"
                  onClick={handleClearForm}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </form>
      </Card>
    );
  } else {
    return (
      <Grid container direction="column" alignItems={"center"}>
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            Cargando...
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
