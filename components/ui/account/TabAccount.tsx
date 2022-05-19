// ** React Imports
import {
  useState,
  ElementType,
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { Box, Grid, TextField, CardContent, Typography } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../../context";
import { UserContext } from "../../../context/user/UserContext";
import { validations } from "../../../utils";
import { useForm } from "react-hook-form";

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

type FormData = {
  name: string;
  last_name: string;
  email: string;
  address: string;
  phone: string;
  image?: any;
};

export const TabAccount = () => {
  const { user } = useContext(AuthContext);
  const { updateUser } = useContext(UserContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imgSrc, setImgSrc] = useState<string>("/images/profile/user.png");

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
  const onReset = () => {
    setImgSrc("/images/profile/user.png");
  };
  const onUpdateForm = async ({
    name,
    last_name,
    email,
    address,
    phone,
    image,
  }: FormData) => {
    setShowError(false);
    const { hasError, message } = await updateUser(
      name,
      last_name,
      email,
      address,
      phone,
      image[0]
    );

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
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
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ImgStyled src={imgSrc} alt="Imagen Perfil" />
                <Box>
                  <ButtonStyled
                    component="label"
                    variant="contained"
                    htmlFor="account-settings-upload-image"
                  >
                    Cambiar
                    <input
                      hidden
                      type="file"
                      {...register("image", { onChange: onChange })}
                      accept=".jpg, .jpeg, .png"
                      id="account-settings-upload-image"
                    />
                  </ButtonStyled>
                  {/* <ResetButtonStyled
                    color="error"
                    variant="outlined"
                    onClick={onReset}
                  >
                    Defecto
                  </ResetButtonStyled> */}
                </Box>
              </Box>
            </Grid>
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
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ marginRight: 3.5 }}
                type="submit"
              >
                Cuardar
              </Button>
              <Button type="reset" variant="outlined" color="secondary">
                Resetear
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    );
  } else {
    return <CardContent><Typography color={"primary"}>Cargando...</Typography></CardContent>;
  }
};
