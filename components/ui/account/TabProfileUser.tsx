import { useState, ChangeEvent, useContext, useEffect } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import { Grid, TextField, Typography, Button } from "@mui/material";
import { Update } from "@mui/icons-material";
import imageCompression from "browser-image-compression";
import { useForm } from "react-hook-form";

import { AuthContext } from "../../../context";
import { UserContext } from "../../../context/user/UserContext";
import { validations } from "../../../utils";
import { CardForm } from "../elements";

type FormData = {
  name: string;
  last_name: string;
  email: string;
  address: string;
  phone: string;
  image?: any;
};

export const TabProfileUser = () => {
  const [imgSrc, setImgSrc] = useState<string>("/images/profile/user.png");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const { updateUser } = useContext(UserContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (user?.name) {
      setUserName(user?.name);
    }
    if (user?.last_name) {
      setUserLastName(user?.last_name);
    }
  }, [user]);

  useEffect(() => {
    if (user?.image) {
      setImgSrc(`data:image/jpeg;base64,${user?.image}`);
      setValue("name", user?.name!);
      setValue("last_name", user?.last_name!);
      setValue("email", user?.email!);
      setValue("address", user?.address || "");
      setValue("phone", user?.phone || "");
    }
  }, [user, setValue]);

  const onChangeImage = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClearForm = () => {
    if (user?.image) {
      setImgSrc(`data:image/jpeg;base64,${user?.image}`);
      setValue("name", user?.name!);
      setValue("last_name", user?.last_name!);
      setValue("email", user?.email!);
      setValue("address", user?.address || "");
      setValue("phone", user?.phone || "");
    }
  };
  const handleUpdateUser = async ({ name, last_name, email, address, phone, image }: FormData) => {
    setIsLoading(true);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    if (image[0] != null) {
      const compressedImage = await imageCompression(image[0], options);
      const { isComplete } = await updateUser(name, last_name, email, address, phone, compressedImage);
      if (isComplete) {
        setIsLoading(false);
      }
    } else {
      const { isComplete } = await updateUser(name, last_name, email, address, phone, image[0]);
      if (isComplete) {
        setIsLoading(false);
      }
    }
  };

  if (user) {
    return (
      <CardForm
        title={`Información de ${userName} ${userLastName}`}
        router={() => router.back()}
        submit={handleSubmit(handleUpdateUser)}
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
                src={imgSrc}
                width="250rem"
                height="175rem"
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
                type="tel"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                label="Teléfono"
                {...register("phone", {
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
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
