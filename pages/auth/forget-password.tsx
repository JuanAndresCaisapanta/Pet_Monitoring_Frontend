import { MouseEvent, ReactElement, useContext, useState } from "react";

import Link from "next/link";

import { styled } from "@mui/material/styles";
import {
  FormHelperText,
  Box,
  TextField,
  InputLabel,
  Typography,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Grid,
  Button,
} from "@mui/material";
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  Login,
  Password,
  SendOutlined,
  Send,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";

import { validations } from "../../utils";
import { AuthLayout } from "../../components";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";

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

const ForgetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { forgetPassword } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const handleLoginUser = async ({ email }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await forgetPassword(email,router);
    if (isComplete) {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    router.replace("/auth/login");
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(handleLoginUser)}>
        <TextField
          autoFocus
          fullWidth
          id="email"
          type="email"
          label="Correo Electrónico"
          sx={{ marginBottom: 2 }}
          {...register("email", {
            required: "Este campo es requerido",
            validate: validations.isEmail,
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isLoading}
        />
        <Grid container>
          <Grid item xs={12} sm={6}>
            <LoadingButton
              variant="contained"
              color="primary"
              sx={{ marginBottom: 2 }}
              disableElevation
              type="submit"
              startIcon={<Send />}
              loading={isLoading}
              loadingPosition="start"
            >
              Solicitar
            </LoadingButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disableElevation
              color="secondary"
              variant="outlined"
              onClick={onCancel}
              disabled={isLoading}
              sx={{ marginBottom: 2 }}
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

ForgetPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout title="Olvido Contraseña" detail="Ingrese su Correo Electrónico">
      {page}
    </AuthLayout>
  );
};

export default ForgetPasswordPage;
