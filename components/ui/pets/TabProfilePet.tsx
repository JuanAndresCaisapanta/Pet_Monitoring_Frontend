import { ChangeEvent, useContext, useState, useEffect } from "react";

import Image from "next/image";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  DesktopDatePicker,
  LoadingButton,
  LocalizationProvider,
} from "@mui/lab";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/router";
import { CheckBox, Close, NavigateBefore, Update } from "@mui/icons-material";
import { AutocompleteFormState, SelectFormName } from "../elements";
import {
  AuthContext,
  BreedContext,
  PetContext,
  SpeciesContext,
} from "../../../context";
import { colorPet, sexPet } from "../../../data";
import { IBreed, ISpecies } from "../../../interfaces";
import { SelectFormId } from "../elements/SelectFormId";

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

export const TabProfilePet = () => {
  const [imgSrc, setImgSrc] = useState<string>("/images/pet/pet-profile.jpg");
  const [date, setDate] = useState<Date | null>(new Date());
  const [selectSpecies, setSelectSpecies] = useState("");
  const [selectSex, setSelectSex] = useState("");
  const [selectColorPetMain, setSelectColorPetMain] = useState("");
  const [selectColorPetSecondary, setSelectColorPetSecondary] = useState("");
  const [selectBreed, setSelectBreed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [petName, setPetName] = useState("");
  const { getSpecies, species, clearSpecies } = useContext(SpeciesContext);
  const { getBreeds, breeds, clearBreeds } = useContext(BreedContext);
  const { updatePet, pet, getPet, petChange } = useContext(PetContext);
  const { user } = useContext(AuthContext);

  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getPet(id);
    return () => {
      clearBreeds();
      clearSpecies();
      petChange();
    };
  }, [id]);

  useEffect(() => {
    getSpecies();
    return () => {
      clearSpecies();
    };
  });

  useEffect(() => {
    if (pet?.name) {
      setPetName(pet?.name);
    }
  }, [pet]);

  useEffect(() => {
    if (pet?.image) {
      setValue("name", pet?.name!);
      setValue("birth_date", pet?.birth_date!);
      setSelectSex(pet?.sex);
      setValue("sex", pet?.sex);
      setSelectColorPetMain(pet?.color_main);
      setValue("color_main", pet?.color_main);
      setSelectColorPetSecondary(pet?.color_secondary);
      setValue("color_secondary", pet?.color_secondary);
      setValue("weight", pet?.weight!);
      setImgSrc(`data:image/jpeg;base64,${pet?.image}`);
      setValue("image", pet?.image);
      setValue("breed", pet?.breed.id!);
      setSelectSpecies(pet?.breed.species.id.toString());
      getBreeds(pet?.breed.species.id);
      setSelectBreed(pet?.breed.id.toString());
    }
    return () => {
      clearBreeds();
    };
  }, [pet]);

  const handleSelectSpecies = (event: SelectChangeEvent) => {
    setSelectSpecies(event.target.value as string);
    getBreeds(Number(event.target.value));
    setSelectBreed("");
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

  const handleSelectBreed = (event: SelectChangeEvent) => {
    setSelectBreed(event.target.value as string);
  };

  const handleChangeDate = (newValue: Date | null) => {
    setDate(newValue);
  };

  const onChangeImage = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const onCancel = () => {
    setValue("name", pet?.name!);
    setValue("birth_date", pet?.birth_date!);
    setSelectSex(pet?.sex);
    setValue("sex", pet?.sex);
    setSelectColorPetMain(pet?.color_main);
    setValue("color_main", pet?.color_main);
    setSelectColorPetSecondary(pet?.color_secondary);
    setValue("color_secondary", pet?.color_secondary);
    setValue("weight", pet?.weight!);
    setImgSrc(`data:image/jpeg;base64,${pet?.image}`);
    setValue("image", pet?.image);
    setValue("breed", pet?.breed.id!);
    setSelectSpecies(pet?.breed.species.id.toString());
    getBreeds(pet?.breed.species.id);
    setSelectBreed(pet?.breed.id.toString());
  };

  const onUpdatePet = async ({
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
        Number(id),
        name,
        color_main,
        color_secondary,
        weight,
        sex,
        sterilization,
        compressed_image,
        birth_date,
        breed,
      );
      if (isComplete) {
        setIsLoading(false);
      }
    } else {
      const { isComplete } = await updatePet(
        Number(id),
        name,
        color_main,
        color_secondary,
        weight,
        sex,
        sterilization,
        image[0],
        birth_date,
        breed,
      );
      if (isComplete) {
        setIsLoading(false);
      }
    }
  };

  if (pet && breeds) {
    return (
      <Card>
        <CardHeader
          title={`Información de ${petName}`}
          titleTypographyProps={{ variant: "body1", color: "#3A3541DE" }}
          action={
            <IconButton
              aria-label="close"
              onClick={() => router.back()}
              style={{ color: "#9E69FD" }}
            >
              <NavigateBefore />
            </IconButton>
          }
        />
        <Divider sx={{ margin: 0 }} />
        <form
          noValidate
          autoComplete="off"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onUpdatePet)}
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Fecha Nacimiento"
                        inputFormat="MM/dd/yyyy"
                        disabled={isLoading}
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
                      label="Peso"
                      placeholder="Peso"
                      disabled={isLoading}
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
                        disabled={isLoading}
                        control={<Checkbox defaultChecked />}
                        label="Esteril"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Especie
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        disabled={isLoading}
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
                  startIcon={<Update />}
                  loading={isLoading}
                  loadingPosition="start"
                >
                  Actualizar
                </LoadingButton>
                <Button
                  disableElevation
                  variant="outlined"
                  color="secondary"
                  onClick={onCancel}
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
