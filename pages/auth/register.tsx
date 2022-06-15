import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useContext,
  useState,
} from "react";

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
  Chip,
  FormHelperText,
  Grid,
  CircularProgress,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  ErrorOutline,
} from "@mui/icons-material";

import { useForm } from "react-hook-form";

import { AuthLayout } from "../../components";
import { AuthContext } from "../../context";
import { validations } from "../../utils";
import imageCompression from "browser-image-compression";

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
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imgSrc, setImgSrc] = useState("/images/profile/user.png");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  const { registerUser } = useContext(AuthContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const onRegisterForm = async ({
    name,
    last_name,
    email,
    password,
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
      const { hasError, message } = await registerUser(
        name,
        last_name,
        email,
        password,
        date,
        cImage,
      );
      if (hasError) {
        setShowError(true);
        setLoading(false);
        setErrorMessage(message!);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
    } else {
      const { hasError, message } = await registerUser(
        name,
        last_name,
        email,
        password,
        date,
        image[0],
      );
      if (hasError) {
        setShowError(true);
        setLoading(false);
        setErrorMessage(message!);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
    }
    setLoading(true);

    router.replace("/auth/login");
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
    setImgSrc("/images/profile/user.png");
    router.reload();
  };

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onRegisterForm)}
        encType={`multipart/form-data`}
      >
        <Chip
          label="Existen problemas con el ingreso de datos"
          color="error"
          icon={<ErrorOutline />}
          className="fadeIn"
          sx={{ display: showError ? "flex" : "none", marginBottom: "1rem" }}
        />
        {loading && (
          <Stack alignItems="center">
            <CircularProgress sx={{ position: "fixed" }} />
          </Stack>
        )}
        <Box sx={{ alignItems: "center" }}>
          <ImgStyled src={imgSrc} alt="Imagen Perfil" />
        </Box>
        <Box sx={{ marginBottom: 2, alignItems: "center" }}>
          <Button
            component="label"
            variant="text"
            htmlFor="account-settings-upload-image"
            disableElevation
            disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
        />
        <TextField
          disabled={loading}
          fullWidth
          label="Correo Electrónico"
          sx={{ marginBottom: 1 }}
          {...register("email", {
            required: "Este campo es requerido",
            validate: validations.isEmail,
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="auth-register-password">Contraseña</InputLabel>
          <OutlinedInput
            disabled={loading}
            label="Contraseña"
            type={values.showPassword ? "text" : "password"}
            {...register("password", {
              required: "Este campo es requerido",
              minLength: { value: 3, message: "Mínimo 6 caracteres" },
            })}
            error={!!errors.password}
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
            <Button
              disableElevation
              type="submit"
              variant="contained"
              sx={{ marginBottom: 1 }}
              disabled={loading}
            >
              Registrarse
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disableElevation
              color="secondary"
              variant="outlined"
              onClick={onCancel}
              disabled={loading}
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
    <AuthLayout
      title="Ingresar"
      detail=" Porfavor ingrese los datos necesarios"
    >
      {page}
    </AuthLayout>
  );
};
export default RegisterPage;
