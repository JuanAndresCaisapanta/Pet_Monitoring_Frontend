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

type FormData = {
  name: string;
  last_name: string;
  email: string;
  password: string;
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


  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const onRegisterForm = async ({
    name,
    last_name,
    email,
    password,
  }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(
      name,
      last_name,
      email,
      password,
      date
    );

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    router.replace("/auth/login");
  };

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onRegisterForm)}
      >
        <Chip
          label="No reconocemos ese usuario / contraseña"
          color="error"
          icon={<ErrorOutline />}
          className="fadeIn"
          sx={{ display: showError ? "flex" : "none" }}
        />
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
