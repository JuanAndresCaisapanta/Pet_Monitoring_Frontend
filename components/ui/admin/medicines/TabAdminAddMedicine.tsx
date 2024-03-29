import { ChangeEvent, useContext, useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import moment from "moment";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";

import { MedicineContext, MedicineTypeContext, PetContext, UserContext } from "../../../../context";
import { CardForm, SelectFormId } from "../../elements";

type FormData = {
  name: string;
  image: any;
  manufacturer: string;
  batch: number | null;
  applicator: string;
  description: string;
  production_date: string | null;
  expiration_date: string | null;
  application_date: string | null;
  medicineType: number | null;
  pet: number | null;
  user: number | null;
};

export const TabAdminAddMedicine = () => {
  const [imagePath, setImagePath] = useState<string>("/images/medicine/medicine-profile.png");
  const [medicinesType, setMedicinesType] = useState<string | null>("");
  const [productionDate, setProductionDate] = useState<Date | null>(new Date());
  const [applicationDate, setApplicationDate] = useState<Date | null>(new Date());
  const [expirationDate, setExpirationDate] = useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPet, setIsLoadingPet] = useState(false);
  const [listUsers, setListUsers] = useState<string>("");
  const [listPets, setListPets] = useState("");

  const { users, getUsers } = useContext(UserContext);
  const { pets, getPetsByUser, clearPets } = useContext(PetContext);
  const { medicineType, getMedicineTypes: getMedicineType } = useContext(MedicineTypeContext);
  const { addMedicine } = useContext(MedicineContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getUsers();
  }, [users]);

  useEffect(() => {
    if (pets) {
      setIsLoadingPet(false);
    }
  }, [pets]);

  useEffect(() => {
    getMedicineType();
  }, []);

  const onChangeUsers = (event: SelectChangeEvent) => {
    clearPets();
    setListPets("");
    setListUsers(event.target.value);
    getPetsByUser(Number(event.target.value));
    setIsLoadingPet(true);
  };

  const onChangePets = (event: SelectChangeEvent) => {
    setListPets(event.target.value);
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
    setImagePath("/images/medicine/medicine-profile.png");
    setValue("image", 0);
    setValue("name", "");
    setValue("manufacturer", "");
    setValue("batch", null);
    setValue("applicator", "");
    setMedicinesType("");
    setValue("medicineType", null);
    setApplicationDate(new Date());
    setValue("application_date", null);
    setProductionDate(new Date());
    setValue("production_date", null);
    setExpirationDate(new Date());
    setValue("expiration_date", null);
    setValue("description", "");
    setListUsers("");
    setValue("user", null);
    setListPets("");
    setValue("pet", null);
  };

  const handleAddMedicine = async ({
    name,
    image,
    manufacturer,
    batch,
    applicator,
    description,
    production_date,
    expiration_date,
    application_date,
    medicineType,
    pet,
  }: FormData) => {
    setIsLoading(true);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    if (image[0] != null) {
      const compressed_image = await imageCompression(image[0], options);
      const { isComplete } = await addMedicine(
        name,
        compressed_image,
        manufacturer,
        batch!,
        applicator,
        description,
        moment(production_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        moment(expiration_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        moment(application_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        medicineType!,
        pet!,
        handleClearForm,
      );
      if (isComplete) {
        setIsLoading(false);
      }
    } else {
      const { isComplete } = await addMedicine(
        name,
        image,
        manufacturer,
        batch!,
        applicator,
        description,
        moment(production_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        moment(expiration_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        moment(application_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        medicineType!,
        pet!,
        handleClearForm,
      );
      if (isComplete) {
        setIsLoading(false);
      }
    }
  };
  if (medicineType && users) {
    return (
      <CardForm
        title={`Ingrese la información de la Medicina Aplicada`}
        router={() => router.back()}
        submit={handleSubmit(handleAddMedicine)}
        clearForm={handleClearForm}
        encType={`multipart/form-data`}
        textLoadingButton={"Guardar"}
        startIcon={<Save />}
        isLoading={isLoading}
        leftContent={
          <>
            <Grid container item xs={12} md={12} direction="column" alignItems="center">
              <Grid item xs={12} md={12}>
                <Image
                  style={{ borderRadius: "15px" }}
                  src={imagePath}
                  width="187px"
                  height="177px"
                  alt="Imagen Medicina"
                  quality={100}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  component="label"
                  disabled={isLoading}
                  variant="text"
                  htmlFor="medicine-upload-image"
                  disableElevation
                >
                  Cambiar Imagen
                  <input
                    hidden
                    type="file"
                    {...register("image", { onChange: onChangeImage })}
                    accept="image/*"
                    id="medicine-upload-image"
                  />
                </Button>
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Nombre"
                  placeholder="Nombre"
                  {...register("name", {
                    required: "Este campo es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  })}
                  disabled={isLoading}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Fabricante"
                  placeholder="Farbricante"
                  {...register("manufacturer", {
                    required: "Este campo es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  })}
                  disabled={isLoading}
                  error={!!errors.manufacturer}
                  helperText={errors.manufacturer?.message}
                />
              </Grid>
            </Grid>
          </>
        }
        rightContent={
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" error={!!errors.user}>
                    Usuario
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    disabled={isLoading}
                    value={listUsers}
                    label="Usuario"
                    {...register("user", {
                      onChange: onChangeUsers,
                      required: "Este campo es requerido",
                    })}
                    defaultValue={listUsers}
                    error={!!errors.user}
                  >
                    {users?.map(({ id, email }: any, i: any) => (
                      <MenuItem key={i} value={id}>
                        {email}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={!!errors.user}>{errors.user?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                {pets ? (
                  <SelectFormId
                    label="Mascota"
                    name="pet"
                    object={pets}
                    value={listPets}
                    onChange={onChangePets}
                    register={register}
                    error={!!errors.pet}
                    helperText={errors.pet?.message}
                    disabled={isLoading}
                  />
                ) : (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {!isLoadingPet ? "Seleccione un usuario para ver sus mascotas" : "Cargando..."}
                    </InputLabel>
                    <Select
                      disabled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={""}
                    ></Select>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Lote"
                  placeholder="Lote"
                  {...register("batch", {
                    required: "Este campo es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  })}
                  onKeyPress={(event) => {
                    if (
                      event?.key === "-" ||
                      event?.key === "+" ||
                      event?.key === "." ||
                      event?.key === "e" ||
                      event?.key === ","
                    ) {
                      event.preventDefault();
                    }
                  }}
                  disabled={isLoading}
                  error={!!errors.batch}
                  helperText={errors.batch?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Aplicador"
                  placeholder="Aplicador"
                  {...register("applicator", {
                    required: "Este campo es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  })}
                  disabled={isLoading}
                  error={!!errors.applicator}
                  helperText={errors.applicator?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectFormId
                  label="Tipo"
                  name="medicineType"
                  value={medicinesType}
                  onChange={(event: SelectChangeEvent) => setMedicinesType(event.target.value)}
                  object={medicineType}
                  register={register}
                  disabled={isLoading}
                  error={!!errors.medicineType}
                  helperText={errors.medicineType?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha Aplicación"
                    inputFormat="dd/MM/yyyy"
                    value={applicationDate}
                    onChange={(newValue: Date | null) => {
                      setApplicationDate(newValue);
                      setValue("application_date", moment(newValue, "DD/MM/YYYY").format("DD/MM/YYYY"));
                    }}
                    maxDate={new Date()}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        {...register("application_date", {
                          required: "Este campo es requerido",
                        })}
                        disabled={isLoading}
                        error={!!errors.application_date}
                        helperText={errors.application_date?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha Producción"
                    inputFormat="dd/MM/yyyy"
                    value={productionDate}
                    onChange={(newValue: Date | null) => {
                      setProductionDate(newValue);
                      setValue("production_date", moment(newValue, "DD/MM/YYYY").format("DD/MM/YYYY"));
                    }}
                    maxDate={new Date()}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        {...register("production_date", {
                          required: "Este campo es requerido",
                        })}
                        disabled={isLoading}
                        error={!!errors.production_date}
                        helperText={errors.production_date?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha Expiración"
                    inputFormat="dd/MM/yyyy"
                    value={expirationDate}
                    onChange={(newValue: Date | null) => {
                      setExpirationDate(newValue);
                      setValue("expiration_date", moment(newValue, "DD/MM/YYYY").format("DD/MM/YYYY"));
                    }}
                    maxDate={new Date()}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        {...register("expiration_date", {
                          required: "Este campo es requerido",
                        })}
                        disabled={isLoading}
                        error={!!errors.expiration_date}
                        helperText={errors.expiration_date?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  type="text"
                  multiline
                  rows={2}
                  label="Descripción"
                  placeholder="Descripción"
                  {...register("description", {
                    required: "Este campo es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  })}
                  disabled={isLoading}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
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
