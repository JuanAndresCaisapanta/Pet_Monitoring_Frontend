import { useState, ChangeEvent, useContext, useEffect } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import { Grid, TextField, Typography, Button, CircularProgress } from "@mui/material";
import { Save, Update } from "@mui/icons-material";
import imageCompression from "browser-image-compression";
import { useForm } from "react-hook-form";

import { UserContext } from "../../../../context";
import { CardForm } from "../../elements";
import { validations } from "../../../../utils";

type FormData = {
  name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  image?: any;
};

export const TabAdminAddUser = () => {
  const [imgSrc, setImgSrc] = useState<string>("/images/profile/user.png");
  const [isLoading, setIsLoading] = useState(false);

  const { addUser, getUsers } = useContext(UserContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onChangeImage = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClearForm = () => {
    setImgSrc("/images/profile/user.png");
    setValue("name", "");
    setValue("last_name", "");
    setValue("email", "");
    setValue("password", "");
    setValue("address", "");
    setValue("phone", "");
  };
  const handleAddUser = async ({ name, last_name, email, password, address, phone, image }: FormData) => {
    setIsLoading(true);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    if (image[0] != null) {
      const compressed_image = await imageCompression(image[0], options);
      const { isComplete } = await addUser(
        name,
        last_name,
        email,
        password,
        address,
        phone,
        compressed_image,
        handleClearForm,
      );
      if (isComplete) {
        setIsLoading(false);
        getUsers();
      }
    } else {
      const { isComplete } = await addUser(
        name,
        last_name,
        email,
        password,
        address,
        phone,
        image[0],
        handleClearForm,
      );
      if (isComplete) {
        setIsLoading(false);
        getUsers();
      }
    }
  };
  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z]+$/;

  return (
    <CardForm
      title={`Ingrese la información del usuario`}
      router={() => router.back()}
      submit={handleSubmit(handleAddUser)}
      clearForm={handleClearForm}
      encType={`multipart/form-data`}
      textLoadingButton={"Agregar"}
      startIcon={<Save />}
      isLoading={isLoading}
      leftContent={
        <>
          <Grid container item xs={12} sm={12} direction="column" alignItems="center">
            <Image
              style={{ borderRadius: "15px" }}
              src={imgSrc}
              width="187px"
              height="177px"
              alt="Imagen Perfil"
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
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                {...register("last_name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                disabled={isLoading}
              />
            </Grid>
          </Grid>
        </>
      }
      rightContent={
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              type="email"
              label="Correo Electrónico"
              {...register("email", {
                required: "Este campo es requerido",
                validate: validations.isEmail,
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              type="password"
              label="Contraseña"
              {...register("password", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              type="tel"
              inputProps={{ maxLength: 10 }}
              label="Celular"
              {...register("phone", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Solo se permiten numeros",
                },
              })}
              onKeyPress={(event) => {
                if (
                  event?.key === "-" ||
                  event?.key === "+" ||
                  event?.key === "." ||
                  event?.key === "e" ||
                  event?.key === "," ||
                  ALPHA_NUMERIC_DASH_REGEX.test(event.key)
                ) {
                  event.preventDefault();
                }
              }}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Dirección"
              {...register("address", {
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
              disabled={isLoading}
            />
          </Grid>
        </Grid>
      }
    />
  );
};
