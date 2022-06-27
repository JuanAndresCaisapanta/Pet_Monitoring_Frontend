import { MouseEvent, ReactElement, useContext, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";
import {
  FormHelperText,
  Box,
  Button,
  TextField,
  InputLabel,
  Typography,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined, Login } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { validations } from "../../utils";
import { AuthLayout } from "../../components";
import { AuthContext } from "../../context";
import { LoadingButton } from "@mui/lab";

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
  email: string;
  password: string;
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  const { loginUser } = useContext(AuthContext);

  const handleLoginUser = async ({ email, password }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await loginUser(email, password);
    if (isComplete) {

      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(handleLoginUser)}>
        <TextField
          autoFocus
          fullWidth
          type="email"
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
          <InputLabel htmlFor="auth-login-password">Contraseña</InputLabel>
          <OutlinedInput
            label="Contraseña"
            type={values.showPassword ? "text" : "password"}
            {...register("password", {
              required: "Este campo es requerido",
              minLength: { value: 3, message: "Mínimo 6 caracteres" },
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
                  {values.showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
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
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Link passHref href="/">
            <LinkStyled onClick={(e) => e.preventDefault()}>Olvido su contraseña?</LinkStyled>
          </Link>
        </Box>
        <LoadingButton
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          sx={{ marginBottom: 2 }}
          disableElevation
          type="submit"
          startIcon={<Login />}
          loading={isLoading}
          loadingPosition="start"
        >
          Iniciar Sesión
        </LoadingButton>
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
          Nuevo en la plataforma?
        </Typography>
        <Typography variant="body2">
          <Link passHref href="/auth/register">
            <LinkStyled>Registrate</LinkStyled>
          </Link>
        </Typography>
      </Box>
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout title="Ingresar" detail="Por favor ingrese con su correo y contraseña">
      {page}
    </AuthLayout>
  );
};

export default LoginPage;
