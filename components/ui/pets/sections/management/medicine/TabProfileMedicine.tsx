import { ChangeEvent, useContext, useState, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Update } from "@mui/icons-material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { Button, Grid, SelectChangeEvent, TextField, Typography } from "@mui/material";

import { useForm } from "react-hook-form";

import moment from "moment";

import imageCompression from "browser-image-compression";

import { CardForm } from "../../../../elements";
import { MedicineContext, TypeMedicineContext } from "../../../../../../context";
import { SelectFormId } from "../../../../elements/SelectFormId";

type FormData = {
  name: string;
  image: any;
  manufacturer: string;
  batch: number;
  applicator: string;
  description: string;
  production_date: string | undefined;
  expiration_date: string | undefined;
  application_date: string | undefined;
  typeMedicine: number;
};

export const TabProfileMedicine = () => {
  const [imagePath, setImagePath] = useState<string>("/images/medicine/medicine-profile.png");
  const [listTypeMedicine, setListTypeMedicine] = useState<string>("");
  const [productionDate, setProductionDate] = useState<Date | null>(null);
  const [applicationDate, setApplicationDate] = useState<Date | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [medicineName, setMedicineName] = useState<string | null>("");

  const { typeMedicine, getTypeMedicine } = useContext(TypeMedicineContext);
  const { updateMedicine, getMedicine, loaded, medicine, clearMedicine } = useContext(MedicineContext);

  const router = useRouter();
  const { id: medicine_id } = router.query;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getTypeMedicine();
  }, []);

  useEffect(() => {
    if (medicine?.name) {
      setMedicineName(medicine?.name);
    }
  }, [medicine]);

  useEffect(() => {
    getMedicine(medicine_id);
    return () => {
      clearMedicine();
    };
  }, [medicine_id]);

  function padTo2Digits(num: any) {
    return num?.toString().padStart(2, "0");
  }

  function formatDate(date: any) {
    return [padTo2Digits(date?.getMonth() + 1), padTo2Digits(date?.getDate()), date?.getFullYear()].join("/");
  }

  useEffect(() => {
    if (medicine?.image) {
      setListTypeMedicine(medicine.typeMedicine.id.toString());
      setValue("typeMedicine", medicine.typeMedicine.id);
      setImagePath(`data:image/jpeg;base64,${medicine?.image}`);
      setApplicationDate(moment(medicine.application_date, "DD/MM/YYYY").toDate());
      setValue("application_date", medicine.application_date);
      setProductionDate(moment(medicine.production_date, "DD/MM/YYYY").toDate());
      setValue("production_date", medicine.production_date);
      setExpirationDate(moment(medicine.expiration_date, "DD/MM/YYYY").toDate());
      setValue("expiration_date", medicine.expiration_date);
      setValue("name", medicine?.name);
      setValue("manufacturer", medicine?.manufacturer);
      setValue("batch", medicine?.batch);
      setValue("applicator", medicine?.applicator);
      setValue("description", medicine?.description);
    }
  }, [medicine]);

  const onChangeImage = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImagePath(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClearForm = () => {
    setListTypeMedicine(medicine?.typeMedicine.id.toString()!);
    setValue("typeMedicine", medicine?.typeMedicine.id!);
    setImagePath(`data:image/jpeg;base64,${medicine?.image}`);
    setApplicationDate(moment(medicine?.application_date, "DD/MM/YYYY").toDate());
    setValue("application_date", medicine?.application_date);
    setProductionDate(moment(medicine?.production_date, "DD/MM/YYYY").toDate());
    setValue("production_date", medicine?.production_date);
    setExpirationDate(moment(medicine?.expiration_date, "DD/MM/YYYY").toDate());
    setValue("expiration_date", medicine?.expiration_date);
    setValue("name", medicine?.name!);
    setValue("manufacturer", medicine?.manufacturer!);
    setValue("batch", medicine?.batch!);
    setValue("applicator", medicine?.applicator!);
    setValue("description", medicine?.description!);
  };

  const handleUpdateMedicine = async ({
    name,
    image,
    manufacturer,
    batch,
    applicator,
    description,
    production_date,
    expiration_date,
    application_date,
    typeMedicine,
  }: FormData) => {
    setIsLoading(true);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    if (image[0] != null) {
      const compressed_image = await imageCompression(image[0], options);
      const { isComplete } = await updateMedicine(
        medicine_id,
        name,
        compressed_image,
        manufacturer,
        batch,
        applicator,
        description,
        moment(production_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        moment(expiration_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        moment(application_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        typeMedicine,
      );
      if (isComplete) {
        setIsLoading(false);
      }
    } else {
      const { isComplete } = await updateMedicine(
        medicine_id,
        name,
        image[0],
        manufacturer,
        batch,
        applicator,
        description,
        moment(production_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        moment(expiration_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        moment(application_date!, "DD/MM/YYYY").format("MM/DD/YYYY"),
        typeMedicine,
      );
      console.log(formatDate(new Date(production_date!)));
      if (isComplete) {
        setIsLoading(false);
      }
    }
  };

  if (medicine) {
    return (
      <CardForm
        title={`Información de medicamento ${medicineName}`}
        router={() => router.back()}
        submit={handleSubmit(handleUpdateMedicine)}
        clearForm={handleClearForm}
        encType={`multipart/form-data`}
        startIcon={<Update />}
        isLoading={isLoading}
        leftContent={
          <>
            <Grid container item xs={12} sm={12} direction="column" alignItems="center">
              <Grid item xs={12} md={12}>
                <Image
                  style={{ borderRadius: "15px" }}
                  src={imagePath}
                  width="250rem"
                  height="175rem"
                  alt="Imagen Mascota"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  component="label"
                  disabled={isLoading}
                  variant="text"
                  htmlFor="account-settings-upload-image"
                  disableElevation
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
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
            </Grid>
          </>
        }
        rightContent={
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectFormId
                  label="Tipo"
                  name="typeMedicine"
                  value={listTypeMedicine}
                  onChange={(event: SelectChangeEvent) => setListTypeMedicine(event.target.value)}
                  object={typeMedicine}
                  register={register}
                  disabled={isLoading}
                  error={!!errors.typeMedicine}
                  helperText={errors.typeMedicine?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha Aplicación"
                    inputFormat="dd/MM/yyyy"
                    disabled={isLoading}
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
                        error={!!errors.application_date}
                        helperText={errors.application_date?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha Producción"
                    inputFormat="dd/MM/yyyy"
                    disabled={isLoading}
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
                        error={!!errors.production_date}
                        helperText={errors.production_date?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha Expiración"
                    inputFormat="dd/MM/yyyy"
                    disabled={isLoading}
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
                        error={!!errors.expiration_date}
                        helperText={errors.expiration_date?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  type="text"
                  multiline
                  rows={2}
                  disabled={isLoading}
                  label="Descripción"
                  placeholder="Descripción"
                  {...register("description", {
                    required: "Este campo es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
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
      </Grid>
    );
  }
};
