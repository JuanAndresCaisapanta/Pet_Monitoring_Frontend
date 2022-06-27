import { useState, ChangeEvent, useContext, useEffect } from "react";

import Image from "next/image";

import { useRouter } from "next/router";

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
  Button,
  FormHelperText,
} from "@mui/material";

import { Save } from "@mui/icons-material";

import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import imageCompression from "browser-image-compression";

import { useForm } from "react-hook-form";

import { AuthContext, BreedContext, SpeciesContext, PetContext } from "../../../context";
import { SelectFormName, SelectFormId } from "../elements";
import { ISpecies } from "../../../interfaces";
import { colorPet, sexPet } from "../../../data";
import { CardForm } from "../elements/CardForm";
import moment from "moment";

type FormData = {
  name: string;
  color_main: string | null;
  color_secondary: string | null;
  weight: number | null;
  sex: string | null;
  sterilization: boolean;
  image: any;
  birth_date: string | null;
  species: number | null;
  breed: number | null;
};

export const TabAddPet = () => {
  const [imgSrc, setImgSrc] = useState<string>("/images/pet/pet-profile.jpg");
  const [birthDate, setBirthDate] = useState<Date | null>(new Date());
  const [listSpecies, setListSpecies] = useState<string | null>("");
  const [listSex, setListSex] = useState<string>("");
  const [listColorPetMain, setListColorPetMain] = useState<string>("");
  const [listColorPetSecondary, setListColorPetSecondary] = useState<string>("");
  const [listBreed, setListBreed] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkSterilization, setCheckSterilization] = useState(false);

  const { getSpecies, species, clearSpecies } = useContext(SpeciesContext);
  const { getBreeds, breeds, clearBreeds } = useContext(BreedContext);
  const { addPet } = useContext(PetContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getSpecies();
    return () => {
      clearSpecies();
    };
  }, []);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onChangeSpecies = (event: SelectChangeEvent) => {
    setListSpecies(event.target.value);
    getBreeds(Number(event.target.value));
    setListBreed("");
  };

  const onChangeImage = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClearForm = () => {
    setListSex("");
    setValue("sex", null);
    setListColorPetMain("");
    setValue("color_main", null);
    setListColorPetSecondary("");
    setValue("color_secondary", null);
    setCheckSterilization(false);
    setValue("sterilization", false);
    setValue("name", "");
    setValue("weight", 1);
    setBirthDate(new Date());
    setValue("birth_date", null);
    setListSpecies("");
    setValue("species", null);
    clearBreeds();
    setListBreed("");
    setValue("breed", null);
    setImgSrc("/images/pet/pet-profile.jpg");
    setValue("image", 0);
  }; 

  const handleAddPet = async ({
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
        color_main!,
        color_secondary!,
        weight!,
        sex!,
        sterilization,
        compressedImage,
        moment(birth_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        breed!,
        user!.id,
        handleClearForm,
      );
      if (isComplete) {
        setIsLoading(false);
      }
    } else {
      const { isComplete } = await addPet(
        name,
        color_main!,
        color_secondary!,
        weight!,
        sex!,
        sterilization,
        image[0],
        moment(birth_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        breed!,
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
      <CardForm
        title={`Ingrese la información de su mascota`}
        router={() => router.back()}
        submit={handleSubmit(handleAddPet)}
        clearForm={handleClearForm}
        encType={`multipart/form-data`}
        textLoadingButton={"Guardar"}
        startIcon={<Save />}
        isLoading={isLoading}
        leftContent={
          <>
            <Grid container item xs={12} sm={12} direction="column" alignItems="center">
              <Image
                style={{ borderRadius: "15px" }}
                src={imgSrc}
                width="250rem"
                height="175rem"
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
                  {...register("image", { onChange: onChangeImage })}
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
          </>
        }
        rightContent={
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha Nacimiento"
                    inputFormat="dd/MM/yyyy"
                    disabled={isLoading}
                    value={birthDate}
                    onChange={(newValue: Date | null) => {
                      setBirthDate(newValue);
                      setValue("birth_date", moment(newValue, "DD/MM/YYYY").format("DD/MM/YYYY"));
                    }}
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
                  value={listSex}
                  onChange={(event: SelectChangeEvent) => {
                    setListSex(event.target.value);
                  }}
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
                  value={listColorPetMain}
                  onChange={(event: SelectChangeEvent) => {
                    setListColorPetMain(event.target.value);
                  }}
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
                  value={listColorPetSecondary}
                  onChange={(event: SelectChangeEvent) => {
                    setListColorPetSecondary(event.target.value);
                  }}
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
                    if (event?.key === "-" || event?.key === "+" || event?.key === "." || event?.key === "e") {
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
                <FormControl error={!!errors.sterilization} component="fieldset" variant="outlined">
                  <FormGroup>
                    <FormControlLabel
                      disabled={isLoading}
                      control={
                        <Checkbox
                          {...register("sterilization")}
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
                  <FormHelperText error>{errors.sterilization?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" error={!!errors.species}>
                    Especie
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    disabled={isLoading}
                    value={listSpecies}
                    label="Especie"
                    {...register("species", {
                      onChange: onChangeSpecies,
                      required: "Este campo es requerido",
                    })}
                    defaultValue={listSpecies}
                    error={!!errors.species}
                  >
                    {(species as unknown as ISpecies[])?.map(({ id, name }: any, i: any) => (
                      <MenuItem key={i} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={!!errors.species}>{errors.species?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                {breeds ? (
                  <SelectFormId
                    label="Raza"
                    name="breed"
                    object={breeds}
                    value={listBreed}
                    onChange={(event: SelectChangeEvent) => {
                      setListBreed(event.target.value);
                    }}
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
          </>
        }
      />
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
