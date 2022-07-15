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
} from "@mui/material";
import { Update } from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { AuthContext } from "../../../context";

interface State {
  newPassword: string;
  currentPassword: string;
  showNewPassword: boolean;
  confirmNewPassword: string;
  showCurrentPassword: boolean;
  showConfirmNewPassword: boolean;
}

export const TabSecurity = () => {
  const { user } = useContext(AuthContext);
  // ** States
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [values, setValues] = useState<State>({
    newPassword: "",
    currentPassword: "",
    showNewPassword: false,
    confirmNewPassword: "",
    showCurrentPassword: false,
    showConfirmNewPassword: false,
  });

  useEffect(() => {
    if (user?.name) {
      setUserName(user?.name);
    }
    if (user?.last_name) {
      setUserLastName(user?.last_name);
    }
  }, [user]);

  // Handle Current Password
  const handleCurrentPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };
  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Handle New Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
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
        //onSubmit={handleSubmit(onUpdateForm)}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="account-settings-current-password">Contraseña Actual</InputLabel>
                    <OutlinedInput
                      label="Contraseña Actual"
                      value={values.currentPassword}
                      id="account-settings-current-password"
                      type={values.showCurrentPassword ? "text" : "password"}
                      onChange={handleCurrentPasswordChange("currentPassword")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowCurrentPassword}
                            onMouseDown={handleMouseDownCurrentPassword}
                          >
                            {values.showCurrentPassword ? (
                              <VisibilityOutlinedIcon />
                            ) : (
                              <VisibilityOffOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="account-settings-new-password">Contraseña Nueva</InputLabel>
                    <OutlinedInput
                      label="Contraseña Nueva"
                      value={values.newPassword}
                      id="account-settings-new-password"
                      onChange={handleNewPasswordChange("newPassword")}
                      type={values.showNewPassword ? "text" : "password"}
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
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="account-settings-confirm-new-password">
                      Confirmar Nueva Contraseña
                    </InputLabel>
                    <OutlinedInput
                      label="Confirmar Nueva Contraseña"
                      value={values.confirmNewPassword}
                      id="account-settings-confirm-new-password"
                      type={values.showConfirmNewPassword ? "text" : "password"}
                      onChange={handleConfirmNewPasswordChange("confirmNewPassword")}
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
              <Button
                disableElevation
                variant="contained"
                sx={{ marginRight: 2 }}
                type="submit"
                startIcon={<Update />}
              >
                Actualizar
              </Button>
              <Button disableElevation variant="outlined" color="secondary">
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </form>
    </Card>
  );
};
