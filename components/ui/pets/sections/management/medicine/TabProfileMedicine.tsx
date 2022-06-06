import { ChangeEvent, useContext, useState } from "react";

import Image from "next/image";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import {
  Button,
  CardContent,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { SelectFormName } from "../../../../elements";
import {
  MedicineContext,
  TypeMedicineContext,
} from "../../../../../../context";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/router";
import { SelectFormId } from "../../../../elements/SelectFormId";

type FormData = {
  name: string;
  image: any;
  manufacturer: string;
  batch: number;
  applicator: string;
  description: string;
  production_date: string;
  expiration_date: string;
  application_date: string;
  typeMedicine: number;
  pet: number;
};

export const TabProfileMedicine = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [imgSrc, setImgSrc] = useState<string>("/images/medicine/medicine-profile.png");
  const { typeMedicine } = useContext(TypeMedicineContext);
  const { addMedicine } = useContext(MedicineContext);
  const [selectTypeMedicine, setSelectTypeMedicine] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleChangeDate = (newValue: Date | null) => {
    setDate(newValue);
  };

  const handleSelectTypeMedicine = (event: SelectChangeEvent) => {
    setSelectTypeMedicine(event.target.value as string);
  };

  const onChangeImage = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const onAddMedicine = async ({
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
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    //setShowError(false);
    if (image[0] != null) {
      const cImage = await imageCompression(image[0], options);
      const { hasError, message } = await addMedicine(
        name,
        cImage,
        manufacturer,
        batch,
        applicator,
        description,
        production_date,
        expiration_date,
        application_date,
        typeMedicine,
        Number(id),
      );
      if (hasError) {
        // setShowError(true);
        // setErrorMessage(message!);
        // setTimeout(() => setShowError(false), 3000);
        return;
      }
    } else {
      const { hasError, message } = await addMedicine(
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
        Number(id),
      );
      if (hasError) {
        // setShowError(true);
        // setErrorMessage(message!);
        // setTimeout(() => setShowError(false), 3000);
        return;
      }
    }
  };

  return (
    <CardContent>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onAddMedicine)}
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
              <Typography color="primary">Imagen Medicina</Typography>
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
                  {...register("image", { onChange: onChangeImage })}
                  accept="image/*"
                  id="account-settings-upload-image"
                />
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
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
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
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
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectFormId
                  label="Tipo"
                  name="typeMedicine"
                  object={typeMedicine}
                  value={selectTypeMedicine}
                  onChange={handleSelectTypeMedicine}
                  register={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha Aplicación"
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={handleChangeDate}
                    maxDate={new Date()}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        {...register("application_date", {
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha Producción"
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={handleChangeDate}
                    maxDate={new Date()}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        {...register("production_date", {
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha Expiración"
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={handleChangeDate}
                    maxDate={new Date()}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        {...register("expiration_date", {
                          required: "Este campo es requerido",
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
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
                  rows={4}
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
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              disableElevation
              sx={{ marginRight: 3.5 }}
              type="submit"
            >
              Cuardar
            </Button>
            <Button type="reset" variant="outlined" color="error">
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};
