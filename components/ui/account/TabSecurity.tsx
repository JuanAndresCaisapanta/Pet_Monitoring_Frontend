// ** React Imports
import { ChangeEvent, MouseEvent, useState } from "react";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icons Imports
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

interface State {
  newPassword: string;
  currentPassword: string;
  showNewPassword: boolean;
  confirmNewPassword: string;
  showCurrentPassword: boolean;
  showConfirmNewPassword: boolean;
}

export const TabSecurity = () => {
  // ** States
  const [values, setValues] = useState<State>({
    newPassword: "",
    currentPassword: "",
    showNewPassword: false,
    confirmNewPassword: "",
    showCurrentPassword: false,
    showConfirmNewPassword: false,
  });

  // Handle Current Password
  const handleCurrentPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };
  const handleMouseDownCurrentPassword = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Handle New Password
  const handleNewPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowConfirmNewPassword = () => {
    setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword,
    });
  };
  const handleMouseDownConfirmNewPassword = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-current-password">
                    Contraseña Actual
                  </InputLabel>
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

              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-new-password">
                    Contraseña Nueva
                  </InputLabel>
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
                          {values.showNewPassword ? (
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
                    onChange={handleConfirmNewPasswordChange(
                      "confirmNewPassword"
                    )}
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

          <Grid
            item
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              marginTop: [3.5, 2.5],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              width={200}
              alt="avatar"
              height={200}
              src="/images/profile/lock.png"
            />
          </Grid>
        </Grid>
      </CardContent>
    </form>
  );
};
