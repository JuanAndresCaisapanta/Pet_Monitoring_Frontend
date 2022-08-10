import { ChangeEvent, MouseEvent, ReactElement, useContext, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import {
  OutlinedInput,
  FormControl,
  IconButton,
  Typography,
  InputLabel,
  TextField,
  Button,
  Box,
  InputAdornment,
  FormHelperText,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { VisibilityOutlined, VisibilityOffOutlined, Save } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import imageCompression from "browser-image-compression";

import { AuthLayout } from "../../components";
import { AuthContext } from "../../context";
import { validations } from "../../utils";

interface State {
  password: string;
  showPassword: boolean;
}

const LinkStyled = styled("a")(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
}));

type FormData = {
  name: string;
  last_name: string;
  email: string;
  password: string;
  image: any;
};

const RegisterPage = () => {
  const [imgSrc, setImgSrc] = useState("/images/profile/user.png");
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  const { register:registerUser } = useContext(AuthContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleRegisterUser = async ({ name, last_name, email, password, image }: FormData) => {
    setIsLoading(true);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    if (image[0] != null) {
      const compressedImage = await imageCompression(image[0], options);
      const { isComplete } = await registerUser(name, last_name, email, password, compressedImage);
      if (isComplete) {
        router.replace("/auth/login");
        setIsLoading(false);
      }
    } else {
      const { isComplete } = await registerUser(name, last_name, email, password, image[0]);
      if (isComplete) {
        router.replace("/auth/login");
        setIsLoading(false);
      }
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const onCancel = () => {
    router.replace("/auth/login");
  };

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleRegisterUser)}
        encType={`multipart/form-data`}
      >
        <Box sx={{ alignItems: "center" }}>
          <ImgStyled src={imgSrc} alt="Imagen Perfil" />
        </Box>
        <Box sx={{ marginBottom: 2, alignItems: "center" }}>
          <Button
            component="label"
            variant="text"
            htmlFor="account-settings-upload-image"
            disableElevation
            disabled={isLoading}
          >
            Cargar Imagen
            <input
              hidden
              type="file"
              {...register("image", { onChange: onChange })}
              accept="image/*"
              id="account-settings-upload-image"
            />
          </Button>
        </Box>
        <TextField
          autoFocus
          fullWidth
          label="Nombre"
          sx={{ marginBottom: 1 }}
          {...register("name", {
            required: "Este campo es requerido",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={isLoading}
        />
        <TextField
          fullWidth
          label="Apellido"
          sx={{ marginBottom: 1 }}
          {...register("last_name", {
            required: "Este campo es requerido",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={isLoading}
        />
        <TextField
          fullWidth
          label="Correo Electrónico"
          sx={{ marginBottom: 1 }}
          {...register("email", {
            required: "Este campo es requerido",
            validate: validations.isEmail,
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isLoading}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="auth-register-password">Contraseña</InputLabel>
          <OutlinedInput
            label="Contraseña"
            type={values.showPassword ? "text" : "password"}
            {...register("password", {
              required: "Este campo es requerido",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
            error={!!errors.password}
            disabled={isLoading}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  aria-label="toggle password visibility"
                >
                  {values.showPassword ? (
                    <VisibilityOutlined fontSize="small" />
                  ) : (
                    <VisibilityOffOutlined fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {!!errors.password && (
            <FormHelperText error id="accountId-error">
              {errors.password?.message}
            </FormHelperText>
          )}
        </FormControl>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <LoadingButton
              variant="contained"
              color="primary"
              sx={{ marginBottom: 1 }}
              disableElevation
              type="submit"
              startIcon={<Save />}
              loading={isLoading}
              loadingPosition="start"
            >
              Registrarse
            </LoadingButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disableElevation
              color="secondary"
              variant="outlined"
              onClick={onCancel}
              disabled={isLoading}
              sx={{ marginBottom: 1 }}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" sx={{ marginRight: 2 }}>
          Ya tiene una cuenta?
        </Typography>
        <Typography variant="body2">
          <Link passHref href="/auth/login">
            <LinkStyled>Ingrese</LinkStyled>
          </Link>
        </Typography>
      </Box>
    </>
  );
};

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout title="Ingresar" detail=" Porfavor ingrese los datos necesarios">
      {page}
    </AuthLayout>
  );
};
export default RegisterPage;
