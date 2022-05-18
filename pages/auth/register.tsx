// @ts-ignore: Object is possibly 'null'.
import {
  ChangeEvent,
  ElementType,
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
  ButtonProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  ErrorOutline,
} from "@mui/icons-material";

import { AuthLayout } from "../../components/layout";
import { useForm } from "react-hook-form";
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
  password: string;
  image: any;
};

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  const { registerUser } = useContext(AuthContext);
  const [imgSrc, setImgSrc] = useState<string>("/images/profile/user.png");
  
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

  const onRegisterForm = async ({
    name,
    last_name,
    email,
    password,
    image
  }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(
      name,
      last_name,
      email,
      password,
      date,
      image[0]
    );

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

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

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onRegisterForm)}
        encType={`multipart/form-data`}
      >
        <Chip
          label="No reconocemos ese usuario / contraseña"
          color="error"
          icon={<ErrorOutline />}
          className="fadeIn"
          sx={{ display: showError ? "flex" : "none" }}
        />
        <Typography color={"primary"} textAlign={"left"} sx={{ ml: "15px" }}>
          Imagen Perfil
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ImgStyled src={imgSrc} alt="Imagen Perfil" />
          <Box>
            <ButtonStyled
              component="label"
              variant="contained"
              htmlFor="account-settings-upload-image"
            >
              Cargar
              <input
                hidden
                type="file"
                {...register("image", {onChange:onChange})}
                accept=".jpg, .jpeg, .png"
                id="account-settings-upload-image"
              />
            </ButtonStyled>
            <ResetButtonStyled
              color="error"
              variant="outlined"
              onClick={() => setImgSrc("/images/profile/user.png")}
            >
              Resetear
            </ResetButtonStyled>
            <Typography variant="body2" sx={{ marginTop: 5 }}>
              Allowed PNG or JPEG. Max size of 800K.
            </Typography>
          </Box>
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
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="auth-register-password">Contraseña</InputLabel>
          <OutlinedInput
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
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{ marginBottom: 2 }}
        >
          Registrarse
        </Button>
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
