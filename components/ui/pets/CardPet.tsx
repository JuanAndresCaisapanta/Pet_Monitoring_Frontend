// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid, { GridProps } from "@mui/material/Grid";
import { useRouter } from "next/router";

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  [theme.breakpoints.up("md")]: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));
export const CardPet = () => {
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };
  return (
    <Card>
      <Grid container spacing={2}>
        <StyledGrid item md={6} xs={12}>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              width={"100%"}
              height={250}
              alt="Mascota"
              src="/images/pet/pet-profile.jpg"
            />
          </CardContent>
        </StyledGrid>
        <Grid
          item
          xs={12}
          md={6}
          // sx={{
          //   paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
          //   paddingLeft: ['1.5rem !important', '1.5rem !important', '0 !important']
          // }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Nombre: Lucas
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Especie: Perro
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Género: Macho
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Raza: Sharpei
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 0 }}>
              Peso: 7,6
            </Typography>
          </CardContent>
          <CardActions>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button variant="contained" onClick={() => navigateTo(`/pets/sections`)}>Monitorear</Button>
              <Button variant="contained">Editar</Button>
            </Box>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
