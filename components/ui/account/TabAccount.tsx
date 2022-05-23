import { useState, ChangeEvent, useContext, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import {
  Grid,
  TextField,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import imageCompression from "browser-image-compression";
import { useForm } from "react-hook-form";

import { AuthContext } from "../../../context";
import { UserContext } from "../../../context/user/UserContext";
import { validations } from "../../../utils";

type FormData = {
  name: string;
  last_name: string;
  email: string;
  address: string;
  phone: string;
  image?: any;
};

export const TabAccount = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imgSrc, setImgSrc] = useState<string>("/images/profile/user.png");
  const { user } = useContext(AuthContext);
  const { updateUser } = useContext(UserContext);

  const route = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (user?.image) {
      setImgSrc(`data:image/jpeg;base64,${user?.image}`);
      setValue("name", user?.name);
      setValue("last_name", user?.last_name);
      setValue("email", user?.email);
      setValue("address", user?.address || "");
      setValue("phone", user?.phone || "");
    }
  }, [user, setValue]);

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const onCancel = () => {
    route.reload();
  };
  const onUpdateForm = async ({
    name,
    last_name,
    email,
    address,
    phone,
    image,
  }: FormData) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    setShowError(false);
    if (image[0] != null) {
      const cImage = await imageCompression(image[0], options);
      const { hasError, message } = await updateUser(
        name,
        last_name,
        email,
        address,
        phone,
        cImage,
      );
      if (hasError) {
        setShowError(true);
        setErrorMessage(message!);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
    } else {
      const { hasError, message } = await updateUser(
        name,
        last_name,
        email,
        address,
        phone,
        image[0],
      );
      if (hasError) {
        setShowError(true);
        setErrorMessage(message!);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
    }
  };

  if (user) {
    return (
      <CardContent>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onUpdateForm)}
          encType={`multipart/form-data`}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid
                container
                item
                xs={12}
                sm={12}
                direction="column"
                alignItems="center"
              >
                <Typography color="primary" mb={1}>
                  Imagen Perfil
                </Typography>
                <Image
                  style={{ borderRadius: "10px" }}
                  src={imgSrc}
                  width={300}
                  height={250}
                  alt="Imagen Perfil"
                />
                <Button
                  component="label"
                  variant="contained"
                  htmlFor="account-settings-upload-image"
                  disableElevation
                  sx={{ mt: 1 }}
                >
                  Cambiar
                  <input
                    hidden
                    type="file"
                    {...register("image", { onChange: onChange })}
                    accept="image/*"
                    id="account-settings-upload-image"
                  />
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    {...register("name", {
                      required: "Este campo es requerido",
                      minLength: { value: 2, message: "Mínimo 2 caracteres" },
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    {...register("last_name", {
                      required: "Este campo es requerido",
                      minLength: { value: 2, message: "Mínimo 2 caracteres" },
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
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
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    {...register("address", {
                      minLength: { value: 2, message: "Mínimo 2 caracteres" },
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    type="text"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    label="Teléfono"
                    {...register("phone", {
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
                disableElevation
                variant="contained"
                sx={{ marginRight: 3.5 }}
                type="submit"
              >
                Actualizar
              </Button>
              <Button
                disableElevation
                variant="outlined"
                color="error"
                onClick={onCancel}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    );
  } else {
    return (
      <CardContent>
        <Typography color={"primary"}>Cargando...</Typography>
      </CardContent>
    );
  }
};
