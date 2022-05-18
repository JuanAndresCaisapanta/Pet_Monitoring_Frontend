import { MouseEvent, ReactElement, useContext, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";
import {
  Chip,
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
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  ErrorOutline,
} from "@mui/icons-material";

import { useForm } from "react-hook-form";

import { AuthLayout } from "../../components/layout";
import { validations } from "../../utils";
import { AuthContext } from "../../context/auth";

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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  const { loginUser } = useContext(AuthContext);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    const isValidLogin = await loginUser(email, password);
    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    router.replace("/users");
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onLoginUser)}>
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
          type="email"
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
          <InputLabel htmlFor="auth-login-password">Contraseña</InputLabel>
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
                    <VisibilityOutlined />
                  ) : (
                    <VisibilityOffOutlined />
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
            <LinkStyled onClick={(e) => e.preventDefault()}>
              Olvido su contraseña?
            </LinkStyled>
          </Link>
        </Box>
        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{ marginBottom: 2 }}
          type="submit"
        >
          Ingresar
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
    <AuthLayout
      title="Ingresar"
      detail="Por favor ingrese con su correo y contraseña"
    >
      {page}
    </AuthLayout>
  );
};

export default LoginPage;
