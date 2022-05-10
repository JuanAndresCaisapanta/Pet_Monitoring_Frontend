// ** React Imports
import { useState, ElementType, ChangeEvent } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button, { ButtonProps } from "@mui/material/Button";

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
export const TabInfoPet = () => {
    const [imgSrc, setImgSrc] = useState<string>("/images/pet/pet-profile.jpg");

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
            <ImgStyled src={imgSrc} alt="Profile Pic" />
            <Box>
              <ButtonStyled
                component="label"
                variant="contained"
                htmlFor="account-settings-upload-image"
              >
                Cargar Imagen
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
                onClick={() => setImgSrc("/images/pet/pet-profile.jpg")}
              >
                Resetear
              </ResetButtonStyled>
              <Typography variant="body2" sx={{ marginTop: 5 }}>
                Allowed PNG or JPEG. Max size of 800K.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre"
            placeholder="johnDoe"
            defaultValue="johnDoe"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Apellido"
            placeholder="John Doe"
            defaultValue="John Doe"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="email"
            label="Correo Electrónico"
            placeholder="johnDoe@example.com"
            defaultValue="johnDoe@example.com"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Dirección"
            placeholder="ABC Pvt. Ltd."
            defaultValue="ABC Pvt. Ltd."
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            label="Teléfono"
            placeholder="0999999999"
            defaultValue="0999999999"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            label="Teléfono"
            placeholder="0999999999"
            defaultValue="0999999999"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            label="Teléfono"
            placeholder="0999999999"
            defaultValue="0999999999"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            label="Teléfono"
            placeholder="0999999999"
            defaultValue="0999999999"
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
  )
}
