// ** React Imports
import { ChangeEvent, MouseEvent, ReactElement, useState } from "react";

// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
// ** Configs
import { AuthLayout } from "../../components/layout";

interface State {
  password: string;
  showPassword: boolean;
}

// ** Styled Components
const LinkStyled = styled("a")(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));
const RegisterPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  // ** Hook
  const router = useRouter();

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
      <form noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <TextField
          autoFocus
          fullWidth
          id="name"
          label="Nombre"
          sx={{ marginBottom: 1 }}
        />
        <TextField
          fullWidth
          id="lastName"
          label="Apellido"
          sx={{ marginBottom: 1 }}
        />
        <TextField
          fullWidth
          type="email"
          label="Correo Electrónico"
          sx={{ marginBottom: 1 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="auth-register-password">Contraseña</InputLabel>
          <OutlinedInput
            label="Contraseña"
            value={values.password}
            id="auth-register-password"
            onChange={handleChange("password")}
            type={values.showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  aria-label="toggle password visibility"
                >
                  {values.showPassword ? (
                    <VisibilityOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOffOutlinedIcon fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
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
