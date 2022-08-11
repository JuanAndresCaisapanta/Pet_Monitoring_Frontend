import { ChangeEvent, useContext, useState, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Update } from "@mui/icons-material";
import moment from "moment";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";

import { CardForm, SelectFormName } from "../elements";
import { BreedContext, PetContext, SpeciesContext } from "../../../context";
import { colorPet, sexPet } from "../../../data";
import { ISpecies } from "../../../interfaces";
import { SelectFormId } from "../elements/SelectFormId";

type FormData = {
  name: string;
  color_main: string;
  color_secondary: string;
  weight: number;
  sex: string;
  sterilization: boolean;
  image: any;
  birth_date: string | null;
  species: number;
  breed: number;
};

export const TabProfilePet = () => {
  const [imagePath, setImagePath] = useState<string>("/images/pet/pet-profile.jpg");
  const [listSpecies, setListSpecies] = useState<string | null>("");
  const [listSex, setListSex] = useState<string | null>("");
  const [listColorPetMain, setListColorPetMain] = useState<string | null>("");
  const [listColorPetSecondary, setListColorPetSecondary] = useState<string | null>("");
  const [listBreed, setListBreed] = useState<string | null>("");
  const [petName, setPetName] = useState<string | null>("");
  const [checkSterilization, setCheckSterilization] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const { getSpecies, species, clearSpecies } = useContext(SpeciesContext);
  const { getBreedsBySpecies, breeds, clearBreeds } = useContext(BreedContext);
  const { updatePet, pet, getPet, petChange } = useContext(PetContext);

  const router = useRouter();

  const { id: pet_id } = router.query;

  useEffect(() => {
    if (pet_id !== undefined) {
      getPet(Number(pet_id));
    }
    return () => {
      clearBreeds();
      clearSpecies();
      petChange();
    };
  }, [pet_id]);

  useEffect(() => {
    if (pet?.name) {
      setPetName(pet?.name);
    }
  }, [pet]);

  useEffect(() => {
    if (pet?.image) {
      setValue("name", pet?.name!);
      setBirthDate(moment(pet?.birth_date, "DD/MM/YYYY").toDate());
      setValue("birth_date", pet?.birth_date);
      setListSex(pet?.sex);
      setValue("sex", pet?.sex);
      setListColorPetMain(pet?.color_main);
      setValue("color_main", pet?.color_main);
      setListColorPetSecondary(pet?.color_secondary);
      setValue("color_secondary", pet?.color_secondary);
      setValue("weight", pet?.weight!);
      setImagePath(`data:image/jpeg;base64,${pet?.image}`);
      getSpecies();
      setListSpecies(pet?.breed.species.id.toString());
      setValue("species", pet?.breed.species.id);
      getBreedsBySpecies(pet?.breed.species.id);
      setListBreed(pet?.breed.id.toString());
      setValue("breed", pet?.breed.id);
      setCheckSterilization(pet?.sterilization);
      setValue("sterilization", pet?.sterilization);
    }
    return () => {
      clearSpecies();
      clearBreeds();
    };
  }, [pet]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onChangeSpecies = (event: SelectChangeEvent) => {
    setListSpecies(event.target.value as string);
    getBreedsBySpecies(Number(event.target.value));
    setListBreed("");
  };

  const onChangeImage = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImagePath(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClearForm = () => {
    clearBreeds();
    clearSpecies();
    setValue("name", pet?.name!);
    setBirthDate(moment(pet?.birth_date, "DD/MM/YYYY").toDate());
    setValue("birth_date", pet?.birth_date!);
    setListSex(pet?.sex!);
    setValue("sex", pet?.sex!);
    setListColorPetMain(pet?.color_main!);
    setValue("color_main", pet?.color_main!);
    setListColorPetSecondary(pet?.color_secondary!);
    setValue("color_secondary", pet?.color_secondary!);
    setValue("weight", pet?.weight!);
    setImagePath(`data:image/jpeg;base64,${pet?.image}`);
    getSpecies();
    setListSpecies(pet?.breed.species.id.toString()!);
    setValue("species", pet?.breed.species.id!);
    getBreedsBySpecies(pet?.breed.species.id!);
    setListBreed(pet?.breed.id.toString()!);
    setValue("breed", pet?.breed.id!);
    setCheckSterilization(pet?.sterilization!);
    setValue("sterilization", pet?.sterilization!);
  };

  const handleUpdatePet = async ({
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
      const compressed_image = await imageCompression(image[0], options);
      const { isComplete } = await updatePet(
        Number(pet_id),
        name,
        color_main,
        color_secondary,
        weight,
        sex,
        sterilization,
        compressed_image,
        moment(birth_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        breed,
      );
      if (isComplete) {
        setIsLoading(false);
      }
    } else {
      const { isComplete } = await updatePet(
        Number(pet_id),
        name,
        color_main,
        color_secondary,
        weight,
        sex,
        sterilization,
        image[0],
        moment(birth_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        breed,
      );
      if (isComplete) {
        setIsLoading(false);
      }
    }
  };

  if (pet && breeds && species) {
    return (
      <CardForm
        title={`Información de ${petName}`}
        router={() => router.back()}
        submit={handleSubmit(handleUpdatePet)}
        clearForm={handleClearForm}
        encType={`multipart/form-data`}
        textLoadingButton={"Actualizar"}
        startIcon={<Update />}
        isLoading={isLoading}
        leftContent={
          <>
            <Grid container item xs={12} sm={12} direction="column" alignItems="center">
              <Image
                style={{ borderRadius: "15px" }}
                src={imagePath}
                width="190px"
                height="180px"
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
                  label="Peso"
                  placeholder="Peso"
                  disabled={isLoading}
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  onKeyPress={(event) => {
                    if (event?.key === "-" || event?.key === "+" || event?.key === "." || event?.key === "e") {
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
                          checked={checkSterilization!}
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
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            <CircularProgress color="secondary" />
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
