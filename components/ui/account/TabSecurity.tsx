import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from "react";

import {
  Grid,
  InputLabel,
  IconButton,
  CardContent,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  FormHelperText,
} from "@mui/material";
import { Update } from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context";
import { UserContext } from "../../../context/user/UserContext";
import { LoadingButton } from "@mui/lab";

interface State {
  newPassword: string;
  showNewPassword: boolean;
  confirmNewPassword: string;
  showConfirmNewPassword: boolean;
}

type FormData = {
  new_password: string | undefined;
  confirm_new_password: string | undefined;
};

export const TabSecurity = () => {
  const { user } = useContext(AuthContext);
  const { updatePassword } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<State>({
    newPassword: "",
    showNewPassword: false,
    confirmNewPassword: "",
    showConfirmNewPassword: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (user?.name) {
      setUserName(user?.name);
    }
    if (user?.last_name) {
      setUserLastName(user?.last_name);
    }
  }, [user]);

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowConfirmNewPassword = () => {
    setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword,
    });
  };
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleUpdatePassword = async ({ new_password, confirm_new_password }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await updatePassword(user?.id!, new_password!, confirm_new_password!, handleClearForm);
    if (isComplete) {
      setIsLoading(false);
    }
  };

  const handleClearForm = () => {
    setValue("new_password", undefined);
    setValue("confirm_new_password", undefined);
  };

  return (
    <Card>
      <CardHeader
        title={`Seguridad de ${userName} ${userLastName}`}
        titleTypographyProps={{ variant: "body1", color: "#3A3541DE" }}
      />
      <Divider sx={{ margin: 0 }} />
      <form
        noValidate
        autoComplete="off"
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleUpdatePassword)}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="account-settings-new-password">Contraseña Nueva</InputLabel>
                    <OutlinedInput
                      label="Contraseña Nueva"
                      id="account-settings-new-password"
                      type={values.showNewPassword ? "text" : "password"}
                      {...register("new_password", {
                        required: "Este campo es requerido",
                        minLength: { value: 6, message: "Mínimo 6 caracteres" },
                      })}
                      error={!!errors.new_password}
                      disabled={isLoading}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowNewPassword}
                            aria-label="toggle password visibility"
                            onMouseDown={handleMouseDownNewPassword}
                          >
                            {values.showNewPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {!!errors.confirm_new_password && (
                      <FormHelperText error id="accountId-error">
                        {errors.new_password?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="account-settings-confirm-new-password">
                      Confirmar Nueva Contraseña
                    </InputLabel>
                    <OutlinedInput
                      label="Confirmar Nueva Contraseña"
                      id="account-settings-confirm-new-password"
                      type={values.showConfirmNewPassword ? "text" : "password"}
                      {...register("confirm_new_password", {
                        required: "Este campo es requerido",
                        minLength: { value: 6, message: "Mínimo 6 caracteres" },
                      })}
                      error={!!errors.confirm_new_password}
                      disabled={isLoading}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmNewPassword}
                            onMouseDown={handleMouseDownConfirmNewPassword}
                          >
                            {values.showConfirmNewPassword ? (
                              <VisibilityOutlinedIcon />
                            ) : (
                              <VisibilityOffOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText error id="accountId-error">
                      {errors.confirm_new_password?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions sx={{ padding: "16px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <LoadingButton
                variant="contained"
                color="primary"
                sx={{ marginRight: 2 }}
                disableElevation
                type="submit"
                startIcon={<Update />}
                loading={isLoading}
                loadingPosition="start"
              >
                Actualizar
              </LoadingButton>
              <Button
                disableElevation
                variant="outlined"
                color="secondary"
                onClick={handleClearForm}
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </form>
    </Card>
  );
};
