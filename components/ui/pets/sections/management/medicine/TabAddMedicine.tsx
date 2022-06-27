import { ChangeEvent, useContext, useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { Button, Grid, SelectChangeEvent, TextField } from "@mui/material";
import { Save } from "@mui/icons-material";
import moment from "moment";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";

import { MedicineContext, TypeMedicineContext } from "../../../../../../context";
import { CardForm, SelectFormId } from "../../../../elements";

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
  typeMedicine: number | null;
  pet: number | null;
};

export const TabAddMedicine = () => {
  const [imagePath, setImagePath] = useState<string>("/images/medicine/medicine-profile.png");
  const [typeMedicines, setTypeMedicines] = useState<string | null>("");
  const [productionDate, setProductionDate] = useState<Date | null>(new Date());
  const [applicationDate, setApplicationDate] = useState<Date | null>(new Date());
  const [expirationDate, setExpirationDate] = useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { typeMedicine, getTypeMedicine } = useContext(TypeMedicineContext);
  const { addMedicine } = useContext(MedicineContext);

  const router = useRouter();

  const { id: user_id } = router.query;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getTypeMedicine();
  }, []);

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
    setTypeMedicines("");
    setValue("typeMedicine", null);
    setApplicationDate(new Date());
    setValue("application_date", null);
    setProductionDate(new Date());
    setValue("production_date", null);
    setExpirationDate(new Date());
    setValue("expiration_date", null);
    setValue("description", "");
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
        typeMedicine!,
        Number(user_id),
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
        typeMedicine!,
        Number(user_id),
        handleClearForm,
      );
      if (isComplete) {
        setIsLoading(false);
      }
    }
  };

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
                width="250rem"
                height="175rem"
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
                name="typeMedicine"
                value={typeMedicines}
                onChange={(event: SelectChangeEvent) => setTypeMedicines(event.target.value)}
                object={typeMedicine}
                register={register}
                disabled={isLoading}
                error={!!errors.typeMedicine}
                helperText={errors.typeMedicine?.message}
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
};
