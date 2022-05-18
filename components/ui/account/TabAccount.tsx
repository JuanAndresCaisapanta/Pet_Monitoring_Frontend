// ** React Imports
import { useState, ElementType, ChangeEvent, useContext, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button, { ButtonProps } from "@mui/material/Button";
import { AuthContext } from "../../../context";

const ImgStyled = styled("img")(({ theme }) => ({
  width: 142,
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

export const TabAccount = () => {
  const {user}=useContext(AuthContext);
  const [imgSrc, setImgSrc] = useState<string>("/images/profile/user.png");
 useEffect(() => {
   if(user?.image){
    setImgSrc(`data:image/jpeg;base64,${user?.image}`);
   }
 }, [setImgSrc,user])
 
  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);

      reader.readAsDataURL(files[0]);
    }
  };
  return (
    <CardContent>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
                    onChange={onChange}
                    accept="image/png, image/jpeg"
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
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              placeholder="Nombre"
              value={user?.name|| ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Apellido"
              placeholder="Apellido"
              value={user?.last_name|| ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="email"
              label="Correo Electrónico"
              placeholder="Correo Electrónico"
              value={user?.email|| ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Dirección"
              placeholder="Dirección"
              value={user?.address|| ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              label="Teléfono"
              placeholder="0999999999"
              value={user?.phone|| ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" sx={{ marginRight: 3.5 }}>
              Cuardar
            </Button>
            <Button type="reset" variant="outlined" color="secondary">
              Resetear
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};
